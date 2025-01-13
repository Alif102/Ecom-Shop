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
        className={`swiper-button-prev-custom absolute top-1/2 left-4 transform -translate-y-1/2 z-10 ${isBeginning ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        disabled={isBeginning}
      >
        <FaArrowLeft className="text-3xl border border-gray-300 p-2 rounded-full bg-[#C43882] text-white" />
      </button>
      <button
        className={`swiper-button-next-custom absolute top-1/2 right-4 transform -translate-y-1/2 z-10 ${isEnd ? 'opacity-50 cursor-not-allowed' : ''
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
        spaceBetween={0}
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
          <div className="bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 md:px-12 lg:pt-20 pt-28">
            <div className="grid  grid-flow-col grid-cols-2 md:gap-3 items-center justify-center w-full lg:w-11/12 mx-auto">
              <div data-aos="fade-left">
                <img src={bs6} className="w-auto h-[300px] lg:h-[500px]" alt="Product" />
              </div>
              <div data-aos="fade-right" className='pr-2 pb-10 lg:pb-0'>
                <h1 className="text-[20px] pollinator md:text-3xl lg:text-4xl font-bold">
                  The Fabric of Prince Coat and pants <br /> is Tropical Suiting.
                </h1>
                <h1 className="text-sm md:text-[18px] font-normal my-4 belleza">
                  The Ultimate Classic For Every Occasion. Actual product color may vary slightly from the image.</h1>
                <button className="bg-gradient-to-r from-[#C43882] to-[#F06191] hover:from-[#F06191] hover:to-[#C43882] text-white roboto-mono sm:mt-4 md:p-4 p-2 px-4 rounded-xl transition-all duration-300 text-sm">
                  View Collections
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 md:px-12 lg:pt-20 pt-28">
            <div className="grid grid-flow-col grid-cols-2 md:gap-3 items-center justify-center w-full lg:w-11/12 mx-auto">
              <div data-aos="fade-left" className='pl-2 pb-10 lg:pb-0'>
                <h1 className="text-[20px] pollinator md:text-3xl lg:text-4xl font-bold">
                  The Fabric of Prince Coat and pants <br /> is Tropical Suiting.
                </h1>
                <h1 className="text-sm md:text-[18px] font-normal my-4 belleza">
                  The Ultimate Classic For Every Occasion. Actual product color may vary slightly from the image.</h1>
                <button className="bg-gradient-to-r from-[#C43882] to-[#F06191] hover:from-[#F06191] hover:to-[#C43882] text-white roboto-mono sm:mt-4 md:p-4 p-2 px-4 rounded-xl transition-all duration-300 text-sm">
                  View Collections
                </button>
              </div>
              <div data-aos="fade-right" className='flex justify-end'>
                <img src={bs2} className="w-auto h-[300px] lg:h-[500px]" alt="Product" />
              </div>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
}
