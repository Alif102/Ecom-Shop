import React, { useEffect, useState } from 'react'
import { FaAngleRight, FaEye, FaHeart, FaStar } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import Countdown from 'react-countdown';

const LatestProducts = ({ products }) => {

    const [winterProducts, setWinterProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const filteredProducts = products.filter(
                (product) => product.category.name.toLowerCase() == "mens jacket" || product.category.name.toLowerCase() == "winter" || product.category.name.toLowerCase() === "mens prince coat"
            );
            setWinterProducts(filteredProducts.slice(0, 10));
            setLatestProducts(products.slice(0, 30));
        }
    }, [products]);

    // Count Component
    const Completionist = () => <span></span>;

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            return <div className='flex justify-between sm:justify-start sm:gap-5 font-mono border-t-[1px] border-gray-200 pt-3 pb-3 sm:mr-4'>
                <div className='text-center'><span className='w-10 h-10 flex items-center justify-center border-[1px] border-gray-300 rounded-full text-white bg-pink-500'>{days}</span><span className='block mt-1 text-sm'>Days</span></div>
                <div className='text-center'><span className='w-10 h-10 flex items-center justify-center border-[1px] border-gray-300 rounded-full text-white bg-pink-500'>{hours}</span><span className='block mt-1 text-sm'>Hrs</span></div>


                <div className='text-center'><span className='w-10 h-10 flex items-center justify-center border-[1px] border-gray-300 rounded-full text-white bg-pink-500'>{minutes}</span><span className='block mt-1 text-sm'>Mins</span></div>

                <div className='text-center'><span className='w-10 h-10 flex items-center justify-center border-[1px] border-gray-300 rounded-full  text-white bg-pink-500'>{seconds}</span><span className='block mt-1 text-sm'>Secs</span></div>
            </div>;
        }
    };


    return (
        <div className="flex justify-between flex-col lg:grid lg:grid-cols-2 gap-5 sm:gap-10">
            {/* Left Side Products */}
            <div className="l-item-left w-full">
                <Swiper
                    effect={'fade'}
                    pagination={true}
                    modules={[Pagination]}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 0,
                        },
                    }}
                >
                    {winterProducts ?
                        winterProducts.map((product, index) => {
                            const prices = product?.variation_combinations?.length
                                ? product.variation_combinations.map((comb) => comb.price)
                                : [product.price];

                            const discounts = product?.variation_combinations?.length
                                ? product.variation_combinations.map((comb) => comb.discount)
                                : [product.discount_amount || 0];

                            const discountDates = product?.variation_combinations?.length
                                ? product.variation_combinations.map((comb) =>
                                    new Date(comb.discount_date)) // Get the discount date as a timestamp
                                : (product.discount_date ? [new Date(product.discount_date)] : []); // Use product discount date if available

                            const highPrice = Math.max(...prices);
                            const lowPrice = Math.min(...prices);
                            const discountPrice = Math.max(...discounts);
                            const discountDate = discountDates.length ? new Date(Math.max(...discountDates)) : null;

                            return (
                                <SwiperSlide key={index} className='bg-white shadow rounded text-left h-auto group w-full'>
                                    {/* Header */}
                                    <div className="flex justify-between items-center bg-pink-100">
                                        <div className="bg-[#C43882] sm:w-1/2 rounded-br-3xl text-xl px-4 py-3 font-semibold text-white text-left whitespace-normal">
                                            Best Deals of Winter
                                        </div>
                                        <Link to={`collection/${product.category.name.toLowerCase()}`} className="flex pr-4 items-center gap-2">
                                            <span>View more</span>
                                            <FaAngleRight />
                                        </Link>
                                    </div>
                                    <Link to={`/singleproduct/${product.name}-${product.id}`}>
                                        <div className="grid sm:grid-cols-3 grid-cols-2 justify-between items-center p-4 py-4 gap-2 sm:gap-0 w-full">
                                            <div className="sm:col-span-2 space-y-2 sm:space-y-3 font-serif text-left">
                                                <h4 className='font-bold text-xl'>{product.name}</h4>
                                                <div className='flex sm:items-center gap-2 sm:gap-5 flex-col sm:flex-row justify-start items-start'>
                                                    <span className='text-[#FF9900] flex'>
                                                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span> ({Math.floor(Math.random() * 100)} reviews)
                                                </div>
                                                <div>
                                                    {product.variation_combinations.length > 0 ? (
                                                        <div className="text-gray-700">
                                                            {lowPrice < highPrice ? (
                                                                <span className="text-lg font-bold text-pink-500">
                                                                    ৳&nbsp;{lowPrice} {discountPrice && <s className='text-red-500'>৳&nbsp;{Number(lowPrice) + Number(discountPrice)}</s>}
                                                                </span>
                                                            ) : (
                                                                <span className="text-lg font-bold text-pink-500">
                                                                    ৳&nbsp;{lowPrice} {discountPrice ? <s className='text-red-500'>৳&nbsp;{Number(lowPrice) + Number(discountPrice)}</s> : ''}
                                                                </span>
                                                            )}
                                                        </div>

                                                    ) : (
                                                        <div className="font-bold text-pink-500">
                                                            <span className="sm:text-3xl font-bold text-pink-500">
                                                                ৳&nbsp;{product.discount_amount ? (product.price - product.discount_amount) : product.price} <s className='text-red-500'>{product.price}</s>
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className='flex gap-2 sm:gap-5 items-center'>
                                                    <span className='bg-pink-700 rounded text-white py-2 px-5'>SALE</span>
                                                    {discountPrice ? <span className='text-xl sm:text-5xl text-red-500 font-bold'>-{discountPrice && (discountPrice * 100 / highPrice)}% OFF</span> : ''}
                                                </div>
                                                <div className='flex pt-3 items-center gap-2 xl:gap-5'>
                                                    <span className='bg-gray-200 sm:px-10 py-2 w-full rounded-full hover:bg-[#C43882] duration-1000 hover:text-white text-nowrap block sm:w-auto text-center'>Quick View</span>
                                                    <span className='bg-gray-200 p-3 rounded-full hidden xl:block'><FaEye /></span>
                                                    <span className='bg-gray-200 p-3 rounded-full hidden xl:block'><FaHeart /></span>
                                                </div>
                                                <Countdown
                                                    date={discountDate}
                                                    renderer={renderer}
                                                />
                                            </div>
                                            <div className="">
                                                <img src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/7/image/${product.image}`}
                                                    alt={product.name} className='object-contain' />
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )
                        }) : (
                            <SwiperSlide className="flex sm:flex-row flex-col gap-12 border-gray-300 mx-auto px-4 py-5 border rounded animate-pulse h-60">
                                <div className="bg-slate-200 p-4 rounded sm:w-1/2 hidden sm:block"></div>
                                <div className="flex-1 space-y-6 py-1 sm:w-1/2">
                                    <div className="bg-slate-200 rounded h-40"></div>
                                    <div className="space-y-3">
                                        <div className="gap-4 grid grid-cols-3">
                                            <div className="col-span-2 bg-slate-200 rounded h-20"></div>
                                            <div className="col-span-1 bg-slate-200 rounded h-20"></div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )}
                </Swiper>
            </div>

            <div className='l-item-right w-full'>
                {/* header  */}
                <div className="flex justify-between items-center bg-pink-100">
                    <div className='bg-[#00C8FF] sm:w-1/2 rounded-br-3xl text-xl px-4 py-3 font-semibold text-white text-left whitespace-normal'>New Arrivals</div>
                    <Link to="/collection" className='flex pr-4 items-center gap-2'>
                        <span>View more </span><FaAngleRight />
                    </Link>
                </div>
                <Swiper
                    spaceBetween={5}
                    effect={'fade'}
                    pagination={true}
                    autoPlay
                    modules={[Pagination]}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 5,
                        },
                    }}
                >
                    {latestProducts ?
                        latestProducts.map((product, index) => {
                            const prices = product?.variation_combinations?.length
                                ? product.variation_combinations.map((comb) => comb.price)
                                : [product.price]; // Default to the product price if variation_combinations is empty
                            const highPrice = Math.max(...prices);
                            const lowPrice = Math.min(...prices);
                            return (
                                <SwiperSlide className='bg-white shadow rounded text-left' key={index}>

                                    <Link to={`/singleproduct/${product.name}-${product.id}`}>
                                        <div className="">
                                            <img src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/7/image/${product.image}`} className='h-60 w-full' />
                                        </div>
                                        <div className="py-5 px-3">
                                            <div className="sm:col-span-2 font-serif text-left space-y-2">
                                                <h4 className='text-xl'>Winter Dress</h4>
                                                <span className='text-[#FF9900] flex text-sm'>
                                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span>
                                                {/* <div className=''><span className='text-lg font-bold text-pink-500'>$250</span> <s className='text-gray-700 text-sm'>$400</s></div> */}
                                                {product.variation_combinations.length > 0 ? (
                                                    <div className="text-gray-700">
                                                        {lowPrice === highPrice ? (
                                                            <span className="text-lg font-bold text-pink-500">
                                                                <span className="text-2xl">৳&nbsp;</span>{highPrice}
                                                            </span>
                                                        ) : (
                                                            <>
                                                                <span className="text-lg font-bold text-pink-500">
                                                                    <span className="text-2xl">৳&nbsp;</span>{lowPrice} {" "}
                                                                </span>
                                                                -{" "}
                                                                <span className="text-pink-500 font-bold">
                                                                    <span className="text-2xl">৳&nbsp;</span>{highPrice} {" "}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="text-lg font-bold text-pink-500">
                                                        <span className="text-2xl">৳&nbsp;</span>{product.price}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )
                        }) : (
                            <div className="flex sm:flex-row flex-col gap-12 border-gray-300 mx-auto px-4 py-5 border rounded animate-pulse">
                                <div className="bg-slate-200 p-4 rounded sm:w-1/2 hidden sm:block"></div>
                                <div className="flex-1 space-y-6 py-1 sm:w-1/2">
                                    <div className="bg-slate-200 rounded h-40"></div>
                                    <div className="space-y-3">
                                        <div className="gap-4 grid grid-cols-3">
                                            <div className="col-span-2 bg-slate-200 rounded h-20"></div>
                                            <div className="col-span-1 bg-slate-200 rounded h-20"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                </Swiper>
            </div>
        </div>
    )
}

export default LatestProducts