import React from 'react';
const Trends = () => {
  const images = [
    // Add your image URLs here
    '../../../../../src/assets/t1.jpg',
    '../../../../../src/assets/t2.jpg',
    '../../../../../src/assets/t3.jpg',
    '../../../../../src/assets/t4.jpg',
    '../../../../../src/assets/t5.jpg',
    '../../../../../src/assets/t5.jpg',
    '../../../../../src/assets/t6.jpg',
    '../../../../../src/assets/t7.jpg',
  ];

  return (
   <div className=' w-[80%] mx-auto' >
                    <h2 className="text-center text-2xl  md:text-3xl font-semibold pollinator mb-8"> <span className=" border border-pink-500 border-l-4 mr-3"></span> EXPLORE MORE IN TRENDS</h2>

     <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div key={index} className="md:w-full w-2/3 mx-auto">
          <img src={image} alt={`image-${index}`} className="w-full h-auto rounded-lg shadow-md" />
        </div>
      ))}
    </div>
   </div>
  );
};

export default Trends;
