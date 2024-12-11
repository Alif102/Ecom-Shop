import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
import { Navigation } from 'swiper/modules';
import bs1 from '../../../assets/bs1.png'
import bs2 from '../../../assets/bs2.png'
export default function SwiperBanner() {
  return (
    <>
   <div className=''>
   <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <div className=' bg-gray-200 px-8 md:px-4 flex items-center justify-evenly'>
   
          <div>
          <img src={bs1} className=' w-72 mt-40 h-full' alt="dfd" srcset="" />
          </div>
       

           <div className=' mt-28 pb-3 '>
           <h1 className=' text-[18px] md:text-3xl pollinator font-bold  '> The Fabric of Prince Coat and pants is Tropical Suiting.</h1>
           <h1 className=' text-sm md:text-[18px] font-sans my-4'>The Ultimate Classic For Every Occasion . <br/> Actual product color may vary slightly from the image.</h1>
           <button className=' bg-[#C43882] text-white text-sm md:text-normal mt-4 md:p-4 p-2 rounded-xl'>View Collection</button>
           </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=' bg-gray-200 px-8 md:px-4 flex items-center justify-evenly'>
   
          <div>
          <img src={bs2} className=' w-72 mt-40 h-full' alt="dfd" srcset="" />
          </div>
       

           <div className='mt-28 pb-3 '>
           <h1 className=' text-[18px] md:text-3xl pollinator font-bold  '> The Fabric of Prince Coat and pants is Tropical Suiting.</h1>
           <h1 className=' text-sm md:text-[18px] font-sans my-4'>The Ultimate Classic For Every Occasion . <br/> Actual product color may vary slightly from the image.</h1>
           <button className=' bg-[#C43882] text-white text-sm md:text-normal mt-4 md:p-4 p-2 rounded-xl'>View Collection</button>
           </div>
          </div>
        </SwiperSlide>
       
      </Swiper>
   </div>
    </>
  );
}
