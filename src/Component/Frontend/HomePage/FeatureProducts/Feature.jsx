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
        <div className="md:w-[80%] w-full mx-auto">
            <h2 className="text-center text-2xl md:text-3xl font-semibold pollinator mb-8">
                <span className="border border-pink-500 border-l-4 mr-3"></span> Shop By <span className=" text-pink-500">Categories</span>
            </h2>

            {/* Category Buttons */}
            <div className="mb-4 overflow-x-auto flex justify-start lg:justify-center gap-2 text-[16px] font-bold scrollbar-hide">
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
                <div className="text-center text-xl font-semibold">Loading Categories...</div>
            ) : (
                // Feature Products
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.map((product, index) => {
                        // Extract the highest and lowest prices from variation_combinations
                        const prices = product.variation_combinations.length
                            ? product.variation_combinations.map((comb) => comb.price)
                            : [product.price]; // Default to the product price if variation_combinations is empty

                        const highPrice = Math.max(...prices);
                        const lowPrice = Math.min(...prices);

                        return (
                            <div key={index} className="w-full gap-2 py-4 px-2 h-full group">
                                <Link to={`/singleproduct/${product.name}-${product.id}`}>
                                    <div className="relative bg-white shadow-md rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                                        {/* Product Image */}
                                        <div className="relative">
                                            <div className="group relative overflow-hidden">
                                                <img
                                                    src={`https://admin.ezicalc.com/public/storage/product/${product.image}`}
                                                    alt={product.name}
                                                    className="h-full w-full object-cover group-hover:scale-125 transition-transform duration-500"
                                                />
                                            </div>

                                            {/* Discount Badge */}
                                            {product.discount && (
                                                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold py-1 px-3 rounded-full">
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
                                        <div className="p-4">
                                            {/* Product Name */}
                                            <h2 className="font-semibold shippori text-gray-800 truncate mb-1 group-hover:text-pink-500 transition-colors duration-300">
                                                {product.name}
                                            </h2>
                                            {/* Category Name */}
                                            <h2 className="font-semibold text-gray-800 truncate mb-1 group-hover:text-pink-500 transition-colors duration-300">
                                                {product.category.name}
                                            </h2>

                                            {/* Pricing */}
                                            <div className="flex items-center gap-1 justify-between">
                                                {product.variation_combinations.length > 0 ? (
                                                    <div className="text-gray-700">
                                                        {lowPrice === highPrice ? (
                                                            <span className="text-green-500 font-bold">
                                                                {highPrice} <span className="text-2xl">৳</span>
                                                            </span>
                                                        ) : (
                                                            <>
                                                                <span className="text-green-500 font-bold">
                                                                    {lowPrice} <span className="text-2xl">৳</span>{" "}
                                                                </span>
                                                                -{" "}
                                                                <span className="text-red-500 font-bold">
                                                                    {highPrice} <span className="text-2xl">৳</span>{" "}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>

                                                ) : (
                                                    <div className="text-green-500 font-bold">
                                                        {product.price} <span className="text-2xl">৳</span>
                                                    </div>
                                                )}
                                        
                                                <button className="bg-pink-500 text-white text-sm py-1 md:px-4 px-1 whitespace-nowrap rounded-full hover:bg-pink-600 transition duration-300">
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
