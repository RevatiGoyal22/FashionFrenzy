// Recommendations.js
import React, { useState } from 'react';
import axios from 'axios';
import { Card, Chip, Typography, Divider, Button, Box, Input } from '@mui/joy';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const Recommendations = () => {
    const [userId, setUserId] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const fetchRecommendations = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/recommend', { user_id: userId });
            setRecommendations(response.data.recommendations);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            setError('Error fetching recommendations');
        }
    };

    // console.log(recommendations);

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ display: "flex", justifyContent: "center" }}>Get Recommendations</h1>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '20vh' }}>
                <Input
                    type="text"
                    variant="outlined"
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                // style={{ marginRight: '10px', padding: '5px' }}
                />
                <Button variant="soft" color="neutral" onClick={fetchRecommendations}>
                    Fetch Recommendations
                </Button>
            </div>


            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Box display="flex" justifyContent="center">
                <Box display="flex" flexWrap="wrap" justifyContent="center" width="75%">
                    {recommendations.map((recommendation) => (
                        <Card
                            key={recommendation.Product_id}
                            variant="soft"
                            sx={{
                                maxWidth: '400px',
                                margin: '10px',
                                padding: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography variant="h5" gutterBottom>
                                <strong>{recommendation.BrandName} - {recommendation.Description}</strong>
                            </Typography>
                            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                <Chip variant="outlined" color="primary" style={{ margin: '5px' }} >{recommendation.Category}</Chip>
                                <Chip variant="outlined" color="success" style={{ margin: '5px' }} >{recommendation.Individual_category}</Chip>
                            </div>
                            <Typography variant="body2" color="textSecondary">
                                Price: ₹{recommendation["DiscountPrice (in Rs)"]} (Original: ₹{recommendation["OriginalPrice (in Rs)"]}, {recommendation.DiscountOffer})
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Rating: {recommendation.Ratings} ({recommendation.Reviews} reviews)
                            </Typography>
                            <Divider style={{ margin: '10px 0' }} />
                            <Button
                                // size="small"
                                variant="solid"
                                color="primary"
                                endIcon={<KeyboardArrowRight />}
                                onClick={() => window.location.href = recommendation.URL}
                            >
                                View Product
                            </Button>
                        </Card>
                    ))}
                </Box>
            </Box>
        </div >
    );
};

export default Recommendations;
