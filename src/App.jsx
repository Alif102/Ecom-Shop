import React from "react";

import Banner from "./Component/Frontend/HomePage/Banner/Banner";
import ShopCategory from "./Component/Frontend/HomePage/ShopCategory/ShopCategory";
import ShopCollection from "./Component/Frontend/ShopCollection/ShopCollection";
import BestSellers from "./Component/Frontend/HomePage/BestSellers/BestSellers";
import Trends from "./Component/Frontend/HomePage/Trends/Trends";
import FeatureProducts from "./Component/Frontend/HomePage/FeatureProducts/FeatureProducts";

const App = () => {
 

  return (
    <div className="bg-gray-100">
    <div>
    <Banner/>
    </div>

    <div className=" mt-24">
      <ShopCategory/>
    </div>
    <div className=" mt-24">
      <ShopCollection/>
    </div>
    <div className=" mt-24">
      <BestSellers/>
    </div>
    <div className=" ">
      <Trends/>
    </div>
    <div className=" ">
      <FeatureProducts/>
    </div>
    </div>
  );
};

export default App;
