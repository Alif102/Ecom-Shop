import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const KidsProduct = ({ products }) => {

    const [filterProducts, setFilterProducts] = useState(null);
    useEffect(() => {
        const productsCopy = products.filter(
            item => item.category?.name?.toLowerCase().includes('kids')
        );
        setFilterProducts(productsCopy.slice(0, 9));
    }, [products])
    console.log(filterProducts)
    return (
        <div className='relative'>
            {filterProducts?.length > 0 ?
                <div>
                    <h2 className="text-center text-2xl  md:text-3xl font-semibold pollinator mb-5 sm:mb-8"> <span className=" border border-pink-500 border-l-4 mr-3"></span> Shop Our <span className=" text-pink-500">Kids Zone</span></h2>
                    <div className="grid grid-cols-2 lg:grid-cols-6 grid-rows-2 gap-2 sm:gap-4">
                        {filterProducts ?
                            filterProducts.map((product, index) => {
                                const prices = product?.variation_combinations?.length
                                    ? product.variation_combinations.map((comb) => comb.price)
                                    : [product.price]; // Default to the product price if variation_combinations is empty
                                const highPrice = Math.max(...prices);
                                const lowPrice = Math.min(...prices);
                                return (
                                    <Link to={`/singleproduct/${product.name}-${product.id}`} className={`bg-white shadow relative overflow-hidden rounded ${index == 0 && 'col-span-2 row-span-2'}`} key={index}>
                                        <img src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/7/image/${product.image}`} className='h-full object-cover w-full duration-500 hover:scale-110' />
                                        <div className="absolute bottom-0 right-0 left-0 text-center bg-gray-50/50 shadow justify-center">
                                            <div className="font-serif text-center py-2">
                                                <h4 className='text-xl font-bold'>{product.name}</h4>
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
                    </div>
                </div>
                : <></>
            }
        </div>
    )
}

export default KidsProduct