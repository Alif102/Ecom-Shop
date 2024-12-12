import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Import required modules
import { Navigation } from 'swiper/modules';

// Custom assets
import bs2 from '../../../assets/bs2.png';
import bs6 from '../../../assets/bs6.png';
import bs3 from '../../../assets/bs3.jpg';

// Custom icons
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function SwiperBanner() {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Customize the duration and other options as needed
  }, []);


  return (
    <div className="relative">
      {/* Custom navigation buttons */}
      <button
        className={`swiper-button-prev-custom absolute top-1/2 left-4 transform -translate-y-1/2 z-10 ${
          isBeginning ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isBeginning}
      >
        <FaArrowLeft className="text-3xl border border-gray-300 p-2 rounded-full bg-[#C43882] text-white" />
      </button>
      <button
        className={`swiper-button-next-custom absolute top-1/2 right-4 transform -translate-y-1/2 z-10 ${
          isEnd ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isEnd}
      >
        <FaArrowRight className="text-3xl border border-gray-300 p-2 rounded-full bg-[#C43882] text-white" />
      </button>

      <Swiper
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        modules={[Navigation]}
        className="mySwiper"
        onInit={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        <SwiperSlide>
        <div className="bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 px-8 md:px-12 flex gap-3 md:gap-0 justify-evenly">
        <div  data-aos="fade-right">
              <img src={bs6} className="w-full object-cover lg:mt-28  mt-32 h-96" alt="Product" />
            </div>
            <div data-aos="fade-left" className="md:mt-60 lg:mt-48 mt-40 pb-3">
              <h1  className="text-[18px] pollinator md:text-3xl lg:text-4xl font-bold">
                The Fabric of Prince Coat and pants <br/> is Tropical Suiting.
              </h1>
              <h1 className="text-sm md:text-[18px] font-sans my-4 delius">
              The Ultimate Classic For Every Occasion. <br /> Actual product color may vary slightly from the image.            </h1>
              <button className="bg-gradient-to-r from-[#C43882] to-[#F06191] hover:from-[#F06191] hover:to-[#C43882] text-white roboto-mono text-lg mt-4 md:p-4 p-2 rounded-xl transition-all duration-300">
  View Collection
</button>

            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
        <div className="bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 px-8 md:px-12 flex gap-3 md:gap-0 justify-evenly">
            
            <div data-aos="fade-left" className="md:mt-60 lg:mt-48 mt-40 pb-3">
              <h1  className="text-[18px] md:text-3xl pollinator font-bold">
              Make your little star shine in plum <br/> hued embroidered cotton straight kurta.
              </h1>
              <h1 className="text-sm md:text-[18px] font-sans my-4 delius">
                The Ultimate Classic For Every Occasion. <br /> Actual product color may vary slightly from the image.
              </h1>
              <button className="bg-gradient-to-r  from-[#C43882] to-[#F06191] hover:from-[#F06191] hover:to-[#C43882] text-white text-lg roboto-mono mt-4 md:p-4 p-2 rounded-xl transition-all duration-300">
  View Collection
</button>

            </div>
            <div  data-aos="fade-right">
              <img src={bs2} className="w-full object-cover md:mt-40 mt-32 h-96" alt="Product" />
            </div>
          </div>
        </SwiperSlide>
      
      </Swiper>
    </div>
  );
}
