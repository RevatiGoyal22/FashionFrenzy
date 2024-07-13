import { Route, Routes } from "react-router-dom";
import { Fulladdresspage } from "./addresspagecomponents/Fulladdresspage/Fulladdresspage";
import { Fullbagpage } from "./components/Fullbagpage/fullbagpage";
import { Fullpaymentpage } from "./paymentcomponents/Fullpaymentpage";
import { Moodboard } from "./Components/Moodboard";

export const Routesfinal = () => {
   return (
     <Routes>
       <Route path={"/bag"} element={<Fullbagpage />}></Route>
       <Route path={"/address"} element={<Fulladdresspage />}></Route>
       <Route path={"/payment"} element={<Fullpaymentpage />}></Route>
       <Route path={"/moodboard"} element={<Moodboard />}></Route>
     </Routes>
   );
};
