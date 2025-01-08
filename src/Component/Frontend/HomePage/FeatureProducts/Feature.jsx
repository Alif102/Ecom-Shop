import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const Feature = ({ products }) => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        if (products.length > 0) {
            const firstCategory = products[0].category.name;
            setSelectedCategory(firstCategory);
            setLoading(false); // Set loading to false once data is available
        }
    }, [products]);

    const uniqueCategories = [...new Set(products.map((product) => product.category.name))];

    const filteredProducts = products.filter(
        (product) => product.category.name === selectedCategory
    );

    return (
        <div className="w-full mx-auto">
            <h2 className="text-center text-2xl md:text-3xl font-semibold pollinator mb-8">
                <span className="border border-pink-500 border-l-4 mr-3"></span> Shop By <span className=" text-pink-500">Categories</span>
            </h2>

            {/* Category Buttons */}
            <div className="mb-4 pb-2 sm:pb-0 md:px-0 overflow-x-auto flex justify-start gap-2 text-[16px] font-bold scrollbar">
                {uniqueCategories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedCategory(category)}
                        className={` whitespace-nowrap px-2 md:px-3 py-1 mb-1 rounded-md lg:rounded-full  ${selectedCategory === category
                            ? "bg-pink-700 text-white"
                            : "bg-pink-200 text-pink-700"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Display Loading if Data is Still Being Fetched */}
            {loading ? (
                <div className="flex sm:flex-row flex-col gap-12 border-gray-300 mx-auto px-4 py-5 sm:py-[100px] border rounded animate-pulse">
                    <div className="bg-slate-200 p-4 rounded sm:w-1/2 hidden sm:block"></div>
                    <div className="flex-1 space-y-6 py-1 sm:w-1/2">
                        <div className="bg-slate-200 rounded h-40"></div>
                        <div className="space-y-3">
                            <div className="gap-4 grid grid-cols-3">
                                <div className="col-span-2 bg-slate-200 rounded h-40"></div>
                                <div className="col-span-1 bg-slate-200 rounded h-40"></div>
                            </div>
                            <div className="bg-slate-200 rounded h-40"></div>
                            <div className="bg-slate-200 rounded h-40"></div>
                            <div className="bg-slate-200 rounded h-40"></div>
                            <div className="bg-slate-200 rounded h-40"></div>
                        </div>
                    </div>
                </div>
            ) : (
                // Feature Products
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:gap-4 gap-2">
                    {filteredProducts.map((product, index) => {
                        // Extract the highest and lowest prices from variation_combinations
                        const prices = product.variation_combinations.length
                            ? product.variation_combinations.map((comb) => comb.price)
                            : [product.price]; // Default to the product price if variation_combinations is empty
                        const highPrice = Math.max(...prices);
                        const lowPrice = Math.min(...prices);

                        return (
                            <div key={index} className="w-full h-full group">
                                <Link to={`/singleproduct/${product.name}-${product.id}`}>
                                    <div className="relative bg-white shadow-md rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                                        {/* Product Image */}
                                        <div className="relative">
                                            <div className="group relative overflow-hidden">
                                                <img
                                                    src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/15/image/${product.image}`}
                                                    alt={product.name}
                                                    className="sm:h-[380px] h-[300px] w-full object-cover group-hover:scale-125 transition-transform duration-500"
                                                />
                                            </div>

                                            {/* Discount Badge */}
                                            {product.discount && (
                                                <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
                                                    {product.discount}% Off
                                                </span>
                                            )}
                                            {/* Eye Icon on Hover */}
                                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <FaEye
                                                    size={26}
                                                    className="bg-white text-black p-1 rounded-full shadow-md hover:shadow-lg"
                                                />
                                            </div>
                                        </div>

                                        {/* Product Details */}
                                        <div className="p-2 sm:p-4">
                                            {/* Product Name */}
                                            <h2 className="font-semibold shippori text-gray-800 truncate mb-1 group-hover:text-pink-500 transition-colors duration-300">
                                                {product.name}
                                            </h2>
                                            {/* Category Name */}
                                            <h2 className="font-semibold text-gray-800 truncate mb-1 group-hover:text-pink-500 transition-colors duration-300">
                                                {product.category.name}
                                            </h2>

                                            {/* Pricing */}
                                            <div className="flex items-center justify-between">
                                                {product.variation_combinations.length > 0 ? (
                                                    <div className="text-gray-700">
                                                        {lowPrice === highPrice ? (
                                                            <span className="text-pink-500 font-bold">
                                                                <span className="text-xl">৳&nbsp;</span>{highPrice}
                                                            </span>
                                                        ) : (
                                                            <>
                                                                <span className="text-pink-500 font-bold">
                                                                    <span className="text-xl">৳&nbsp;</span>{lowPrice} {" "}
                                                                </span>
                                                                -{" "}
                                                                <span className="text-pink-500 font-bold">
                                                                    <span className="text-xl">৳&nbsp;</span>{highPrice} {" "}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>

                                                ) : (
                                                    <div className="text-pink-500 font-bold">
                                                        <span className="text-xl">৳&nbsp;</span>{product.price}
                                                    </div>
                                                )}

                                                <button className="bg-pink-500 text-white text-sm py-1 md:px-4 px-2 whitespace-nowrap rounded-full hover:bg-pink-600 transition duration-300">
                                                    QUICK VIEW
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Feature;
