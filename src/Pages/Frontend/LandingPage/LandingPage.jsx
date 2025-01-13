import React from "react";
import Banner from "../../../Component/Frontend/HomePage/Banner/Banner";
import ShopCategory from "../../../Component/Frontend/HomePage/ShopCategory/ShopCategory";
import ShopCollection from "../../../Component/Frontend/ShopCollection/ShopCollection";
import BestSellers from "../../../Component/Frontend/HomePage/BestSellers/BestSellers";
import Trends from "../../../Component/Frontend/HomePage/Trends/Trends";
import FeatureProducts from "../../../Component/Frontend/HomePage/FeatureProducts/FeatureProducts";
import Feature from "../../../Component/Frontend/HomePage/FeatureProducts/Feature";
import LatestProducts from "../../../Component/Frontend/HomePage/LatestProducts/LatestProducts";
import KidsProduct from "../../../Component/Frontend/HomePage/KidsProduct/KidsProduct";
import DiscountProduct from "../../../Component/Frontend/HomePage/DiscountProduct/DiscountProduct";



const LandingPage = ({ products }) => {

  return (
    <div className="bg-gray-100">

      <div>
        <Banner />
      </div>

      <div className='container mx-auto overflow-hidden sm:px-0 px-1'>
        {/* <div className=" mt-24">
      <ShopCategory/>
    </div> */}
        <div className=" mt-6 sm:mt-16">
          <LatestProducts products={products} />
        </div>



        <div className="mt-6 sm:mt-16">
          <DiscountProduct products={products} />
        </div>

        <div className=" mt-6 sm:mt-16">
          <Feature products={products} />
        </div>

        <div className="mt-6 sm:mt-16">
          <KidsProduct products={products} />
        </div>

        {/* <div className=" mt-24">
      <ShopCollection/>
    </div> */}
        <div className="mt-6 sm:mt-16">
          <BestSellers products={products} />
        </div>
        {/* <div className=" ">
      <Trends/>
    </div> */}
      </div>
    </div>
  );
};

export default LandingPage;
