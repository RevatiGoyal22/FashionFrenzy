import React, { useEffect, useRef, useState } from 'react';
import vision from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3';

const LipstickTryOn = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [faceLandmarker, setFaceLandmarker] = useState(null);
    const [runningMode, setRunningMode] = useState('VIDEO');
    const [selectedColor, setSelectedColor] = useState('rgba(133, 45, 62, 0.6)');
    const [isLoading, setIsLoading] = useState(false);

    const colorOptions = [
        { name: 'Red', color: 'rgba(255, 0, 0, 0.2)' },
        { name: 'Maroon', color: 'rgba(133, 38, 76,0.5)' },
        // { name: 'Nude', color: 'rgba(164, 88, 104, 0.2)' },
        { name: 'Pink', color: 'rgba(178, 43, 104, 0.40)' },
        { name: 'Nude', color: 'rgba(81, 37, 32, 0.45)' }
    ];

    useEffect(() => {
        const initFaceLandmarker = async () => {
            const { FaceLandmarker, FilesetResolver } = vision;
            const filesetResolver = await FilesetResolver.forVisionTasks(
                'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
            );

            const faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
                baseOptions: {
                    modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
                    delegate: 'GPU'
                },
                outputFaceBlendshapes: true,
                runningMode,
                numFaces: 1
            });

            setFaceLandmarker(faceLandmarker);
        };

        initFaceLandmarker();
    }, [runningMode]);

    const enableCam = async () => {
        const video = videoRef.current;
        if (!video) return;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            video.addEventListener('loadeddata', predictWebcam);
        } catch (error) {
            console.error('Error accessing webcam:', error);
        }
    };

    const predictWebcam = async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || !faceLandmarker) return;

        const canvasCtx = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        let lastVideoTime = -1;

        const detectFaces = async () => {
            if (video.currentTime !== lastVideoTime) {
                lastVideoTime = video.currentTime;
                const results = await faceLandmarker.detectForVideo(video, performance.now());
                if (results.faceLandmarks) {
                    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
                    canvasCtx.save();
                    canvasCtx.scale(-1, 1); // Flip horizontally
                    canvasCtx.translate(-canvas.width, 0);

                    for (const landmarks of results.faceLandmarks) {
                        const outerLipsIndices = [
                            61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291,
                            375, 321, 405, 314, 17, 84, 181, 91, 146, 61
                        ];
                        const innerLipsIndices = [
                            78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308,
                            324, 318, 402, 317, 14, 87, 178, 88, 95, 78
                        ];

                        const outerLips = outerLipsIndices.map(index => ({
                            x: landmarks[index].x * canvas.width,
                            y: landmarks[index].y * canvas.height
                        }));

                        const innerLips = innerLipsIndices.map(index => ({
                            x: landmarks[index].x * canvas.width,
                            y: landmarks[index].y * canvas.height
                        }));

                        // Draw and fill the outer lips with overlay mode
                        canvasCtx.globalCompositeOperation = 'overlay'; // Set to overlay mode
                        canvasCtx.fillStyle = selectedColor; // Use selected color
                        canvasCtx.beginPath();
                        for (let i = 0; i < outerLips.length; i++) {
                            const { x, y } = outerLips[i];
                            if (i === 0) {
                                canvasCtx.moveTo(x, y);
                            } else {
                                canvasCtx.lineTo(x, y);
                            }
                        }
                        canvasCtx.closePath();
                        canvasCtx.fill();

                        // Clear the inner lips area
                        canvasCtx.globalCompositeOperation = 'destination-out';
                        canvasCtx.beginPath();
                        for (let i = 0; i < innerLips.length; i++) {
                            const { x, y } = innerLips[i];
                            if (i === 0) {
                                canvasCtx.moveTo(x, y);
                            } else {
                                canvasCtx.lineTo(x, y);
                            }
                        }
                        canvasCtx.closePath();
                        canvasCtx.fill();

                        // Reset the composite operation to default
                        canvasCtx.globalCompositeOperation = 'source-over';
                    }

                    canvasCtx.restore();
                }
            }
            requestAnimationFrame(detectFaces);
        };

        detectFaces();
    };

    const handleColorChange = (color) => {
        setIsLoading(true);
        setSelectedColor(color);
        const video = videoRef.current;
        if (video) {
            video.pause();
            setTimeout(() => {
                enableCam();
                setIsLoading(false);
            }, 1000); // Simulate loading time
        }
    };

    return (
        <div>
            <h1>Face landmark detection using MediaPipe FaceLandmarker</h1>
            <div id="liveView">
                <button onClick={enableCam} className="mdc-button mdc-button--raised">
                    <span className="mdc-button__ripple"></span>
                    <span className="mdc-button__label">ENABLE WEBCAM</span>
                </button>
                <div style={{ position: 'relative' }}>
                    {isLoading && (
                        <div style={{
                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '10px', borderRadius: '5px'
                        }}>
                            Loading...
                        </div>
                    )}
                    <video ref={videoRef} autoPlay playsInline style={{ transform: 'scaleX(-1)' }}></video>
                    <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }}></canvas>
                </div>
            </div>
            <div>
                <h3>Select Lip Color:</h3>
                {colorOptions.map(option => (
                    <button
                        key={option.name}
                        onClick={() => handleColorChange(option.color)}
                        style={{
                            backgroundColor: option.color,
                            // color: 'white',
                            margin: '5px',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        {option.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LipstickTryOn;
