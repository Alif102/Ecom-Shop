import React, { useEffect, useState } from "react";
import Banner from "../../../Component/Frontend/HomePage/Banner/Banner";
import ShopCategory from "../../../Component/Frontend/HomePage/ShopCategory/ShopCategory";
import ShopCollection from "../../../Component/Frontend/ShopCollection/ShopCollection";
import BestSellers from "../../../Component/Frontend/HomePage/BestSellers/BestSellers";
import Trends from "../../../Component/Frontend/HomePage/Trends/Trends";
import FeatureProducts from "../../../Component/Frontend/HomePage/FeatureProducts/FeatureProducts";
import axios from "axios";



const LandingPage = () => {
    const [products, setProducts] = useState([]);

    const fetchApiData = async () => {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiM2EyNmU4ZDE2ODI1NjlkZjI4NjQyYjE5ZDE5ZTMwMzQxMmU4MGY3ODU0ZGI5ZTBiMTI4ZDUwMWM0MGNjOGM4YjU3NzUyZWQ3MjFiYzEwNzUiLCJpYXQiOjE3MzMyOTU2MTAuNTExNzM1OTE2MTM3Njk1MzEyNSwibmJmIjoxNzMzMjk1NjEwLjUxMTczOTAxNTU3OTIyMzYzMjgxMjUsImV4cCI6MTc2NDgzMTYxMC41MDcxNjIwOTQxMTYyMTA5Mzc1LCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.Jr2pwTJ9fCQlA3gi_KMfr6t5WjMM7zm5Ya9ksiOQaWEfwxbAQlf9vhPVXcuL3wBNMvHmBNXHSwrQrKBXTEiTolSJSlpKKfiJtyQ8vt5OPBaskWs9LwKR2LseX4c4zKtC8ITywIpAnM8kr5lAAYnYEGW05e1Di69vdqLRdjyswZTsQvZdCxNkJ1uONnNkBX9S447flQvegpI-V8iMxSevNvcEWAiRgySZ3A9J8pWYCkaus9nFg-_5UvCZFiNY06ZkTgXLlt7hbU-SH77V89lDokpSJ25ispEhFb9ROvBQDLuvxKovyZV3Xs7oAVo55uu4XMXE7laJOFFsngow_G0LyAUKa0-tJQZcM52qDoBJSzac7pE6aeUFSfgCBjU5Pn_ZZaLkWZnVRokq-qrZlATJpGGzFsMqIIdcQqm2MDf82kbJKjKDGzAkVp26fGGUE0Y3PCwk45UprR24XPvLm6wnlXN0thUR3hUvm-CZZokYYnvq5jCKpf4c_M-0b2XzgRIK-mURhQCgVmuq3mPlJE6pSqW9413z-MB0RWK_DTgQCMvn9BpA2x8zY6Q9fX9ZL3rSkZAgpkMa2hEHWALnqmeTs45z2aQHTVqN-vFXlJKd_hccKrfOYKXQ5q8XfLgotlRceTjOShq155DvvA1GujnIAxYYdPlT0wNl0PTDedRMBrk';

        try {
        //   const cacheKey = 'allProducts';
        //   const cacheTimeKey = 'allProducts_timestamp';
        //   const cacheValidityDuration = 60 * 60 * 1000; // 1 hour
      
        //   const cachedData = localStorage.getItem(cacheKey);
        //   const cachedTimestamp = localStorage.getItem(cacheTimeKey);
        //   const now = Date.now();
      
        //   if (cachedData && cachedTimestamp && (now - parseInt(cachedTimestamp) < cacheValidityDuration)) {
        //     // Use cached data if it's still valid
        //     setProducts(JSON.parse(cachedData));
        //     return;
        //   }
      
          // Fetch data if cache is not valid
          const response = await axios.get("https://admin.ezicalc.com/api/product/get/15" ,{
            headers: {
                'Authorization': `Bearer ${token}`,
              },
          });
      
          if (response.data.status) {
            const fetchedProducts = response.data.data.data;
      
            // Cache fetched data and timestamp
            // localStorage.setItem(cacheKey, JSON.stringify(fetchedProducts));
            // localStorage.setItem(cacheTimeKey, now.toString());
      
            setProducts(fetchedProducts);
          }
        } catch (error) {
          console.error("Error fetching API data:", error);
        }
      };
      
      useEffect(() => {
        fetchApiData();
      }, []);
    
      console.log(products);
    
 

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
      <BestSellers products={products}/>
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

export default LandingPage;
