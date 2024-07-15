import img1 from "./Home_images/offerImages/o1.webp";
import img2 from "./Home_images/offerImages/o2.webp";
import img3 from "./Home_images/offerImages/o3.webp";
import img4 from "./Home_images/offerImages/o4.webp";

import offerimg from "./Home_images/top1.jpeg";
import dealimg from "./Home_images/top2.jpeg";

import recc from "./Home_images/reccomendations.png";
import lipstick from "./Home_images/lipstick.png";

import "./HomeOffer.css";
import { Carousel1 } from "./HomeSlide";

export const HomeOffer = () => {
   return (
      <div>
         <Carousel1></Carousel1>


         <div className="offer1" style={{ margin: 20 }}>
            <a href='/reccomendations' target="/reccomendations" rel="noopener noreferrer">
               <img src={recc} alt="Recommendation Image" style={{ width: '48vw', margin: 5 }} />
            </a>
            <a href='virtualtryon' target="virtualtryon" rel="noopener noreferrer">
               <img src={lipstick} alt="Lipstick Image" style={{ width: '48vw', margin: 5 }} />
            </a>
         </div>

         <div className="offerdiv">
            <img src={offerimg} alt="" className="offerimg"></img>
         </div>


         <div className="offerdiv">
            <img src={dealimg} alt="" className="dealimg"></img>
         </div>

         <div className="offer1">
            <img src={img1}></img>
            <img src={img2}></img>
         </div>

         <div className="offer1">
            <img src={img3}></img>
            <img src={img4}></img>
         </div>
      </div>
   );
};
