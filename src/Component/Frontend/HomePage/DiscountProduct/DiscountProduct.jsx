import React, { useEffect, useState } from 'react'
import banner from '../../../../assets/banner-left.png';
const DiscountProduct = ({ products }) => {

    const [activeTab, setActiveTab] = useState(1);

    const [discountedProduct20, setDiscountedProduct20] = useState([]);
    const [discountedProduct40, setDiscountedProduct40] = useState([]);
    const [discountedProduct60, setDiscountedProduct60] = useState([]);

    const filterDiscountedProducts = (products, min, max) => {
        return products.filter(product => {
            const hasDirectDiscount = product.discount_percent > min && product.discount_percent <= max;
            const hasVariationDiscount = Array.isArray(product.variation_combinations) &&
                product.variation_combinations.some(variation => variation.discount_percent > min && variation.discount_percent <= max);
            return hasDirectDiscount || hasVariationDiscount;
        });
    };

    useEffect(() => {
        // Filter the products when the component mounts
        const filtered20 = filterDiscountedProducts(products, 0, 20);
        const filtered40 = filterDiscountedProducts(products, 20, 40);
        const filtered60 = filterDiscountedProducts(products, 40, 100);
        setDiscountedProduct20(filtered20);
        setDiscountedProduct40(filtered40);
        setDiscountedProduct60(filtered60);
    }, [products]);

    return (
        <div className='relative'>
            <div className="sm:grid sm:grid-cols-4 gap-20 justify-between">
                <div className='sm:col-span-1'>
                    <img src={banner} alt="" />
                </div>
                <div className='sm:col-span-3 mt-10 sm:mt-0'>
                    <div className='w-full flex sm:flex-row flex-col justify-between items-center border-b-2 border-gray-300 space-y-5 sm:space-y-0'>
                        <h2 className="text-center text-2xl md:text-3xl font-semibold pollinator"><span className=" text-pink-600">Discount</span> Products</h2>
                        <div className='flex flex-row text-center items-center gap-5 sm:gap-10 discount-product'>
                            <button onClick={() => setActiveTab(1)} className={`sm:text-xl font-bold ${activeTab === 1 ? "text-pink-600 activeTab" : ''}`}>
                                Up to 60% Off
                            </button>
                            <button onClick={() => setActiveTab(2)} className={`sm:text-xl font-bold ${activeTab === 2 ? "text-pink-600 activeTab" : ''}`}>
                                40% Off
                            </button>
                            <button onClick={() => setActiveTab(3)} className={`sm:text-xl font-bold ${activeTab === 3 ? "text-pink-600 activeTab" : ''}`}>
                                20% Off
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 my-10 bg-pink-200">
                        {activeTab === 1 && (
                            <div className="">
                                Tab content 1
                            </div>
                        )}
                        {activeTab === 2 && (
                            <div className="p-10">
                                Tab content 2
                            </div>
                        )}
                        {activeTab === 3 && (
                            <div className="p-10">
                                Tab content 3
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiscountProduct