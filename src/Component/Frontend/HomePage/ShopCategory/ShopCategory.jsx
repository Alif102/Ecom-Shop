import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ShopCategory() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024, // For devices <= 1024px
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768, // For devices <= 768px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480, // For devices <= 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Array of image paths
  const images = [
    "/src/assets/s3.jpg",
    "/src/assets/s2.jpg",
    "/src/assets/s4.jpg",
    "/src/assets/s5.jpg",
    "/src/assets/s6.jpg",
    "/src/assets/s7.jpg",
    "/src/assets/s8.jpg",
    "/src/assets/s9.jpg",
  ];

  return (
    <div>
      <div className="p-2 mx-auto w-2/3 mb-9 md:mt-40 relative">
        <h2 className="text-center text-2xl  md:text-3xl font-semibold pollinator mb-8"> <span className=" border border-pink-500 border-l-4 mr-3"></span> Shop By Categories</h2>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="w-full h-full">
              <img
                src={image}
                alt={`Category ${index + 1}`}
                className="h-auto object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default ShopCategory;
