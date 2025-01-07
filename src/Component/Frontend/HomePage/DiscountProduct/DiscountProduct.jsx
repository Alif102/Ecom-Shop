import React, { useEffect, useState } from 'react'
import banner from '../../../../assets/banner-left.png';
import { Link } from 'react-router-dom';
import { FaAngleRight, FaEye, FaMinus, FaStar } from 'react-icons/fa6';
const DiscountProduct = ({ products }) => {

    const [activeTab, setActiveTab] = useState(3);

    const [discountedProduct20, setDiscountedProduct20] = useState([]);
    const [discountedProduct40, setDiscountedProduct40] = useState([]);
    const [discountedProduct60, setDiscountedProduct60] = useState([]);

    const filterDiscountedProducts = (products, min, max) => {
        const now = new Date(); // Cache current date for efficiency
        return products.filter(product => {

            const variation = product.variation_combinations;

            const hasDirectDiscount = (product.has_variation === 0) &&
                product.discount_percent > min &&
                product.discount_percent <= max &&
                (product.discount_date == null || new Date(product.discount_date) >= now);

            const hasVariationDiscount = variation.length > 0 &&
                variation[0].discount_percent > min &&
                variation[0].discount_percent <= max &&
                (variation[0].discount_date == null || new Date(variation[0].discount_date) >= now);

            return hasDirectDiscount || hasVariationDiscount;
        });
    };

    useEffect(() => {
        // Filter the products when the component mounts
        const filtered20 = filterDiscountedProducts(products, 0, 20);
        const filtered40 = filterDiscountedProducts(products, 20, 40);
        const filtered60 = filterDiscountedProducts(products, 40, 100);
        setDiscountedProduct20(filtered20.slice(0, 6));
        setDiscountedProduct40(filtered40.slice(0, 6));
        setDiscountedProduct60(filtered60.slice(0, 6));
    }, [products]);

    return (
        <div className='relative'>
            <div className="lg:grid lg:grid-cols-4 gap-10 lg:justify-between">
                <div className='md:hidden lg:col-span-1 lg:block'>
                    <Link to="/collection">
                        <img src={banner} alt="" className='mx-auto h-full'/>
                    </Link>
                </div>
                <div className='lg:col-span-3 mt-10 lg:mt-0'>
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
                    <div className="grid grid-cols-2 md:grid-cols-3 my-5 sm:my-0 sm:mt-5 sm:gap-5 2xl:gap-10 gap-2">
                        {activeTab === 1 && (
                            discountedProduct60.length > 0 &&
                            discountedProduct60.map((product, index) => {

                                const price = product?.variation_combinations?.length
                                    ? product.variation_combinations[0].price
                                    : [product.price];

                                const discountAmount = product?.variation_combinations?.length
                                    ? product.variation_combinations[0].discount
                                    : [product.discount_amount || 0];

                                const discountPercent = product?.variation_combinations?.length
                                    ? product.variation_combinations[0].discount_percent
                                    : [product.discount_percent || 0];

                                const discountDate = product?.variation_combinations?.length
                                    ? product.variation_combinations[0].discount_date
                                    : (product.discount_date ? product.discount_date : null);

                                return (
                                    <div key={index} className="w-full h-full group">
                                        <Link to={`/singleproduct/${product.name}-${product.id}`}>
                                            <div className="relative bg-white shadow-sm rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300 p-2">
                                                {/* Product Image */}
                                                <div className="relative">
                                                    <div className="group relative overflow-hidden">
                                                        <img
                                                            src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/15/image/${product.image}`}
                                                            alt={product.name}
                                                            className="sm:h-[340px] mx-auto object-cover group-hover:scale-125 transition-transform duration-500"
                                                        />
                                                    </div>
                                                    <span className="absolute  right-0 top-1 sm:right-3 sm:top-3 bg-pink-500 text-white font-semibold py-1 px-2 rounded-full flex items-center text-xs origin-bottom -rotate-6">{Math.round(discountPercent)}% Off
                                                    </span>
                                                </div>

                                                {/* Product Details */}
                                                <div className="text-center">
                                                    {/* Product Name */}
                                                    <h2 className="font-semibold shippori text-gray-800 truncate group-hover:text-pink-500 transition-colors duration-300">
                                                        {product.name}
                                                    </h2>
                                                    {/* Pricing */}
                                                    <div className="text-gray-700">
                                                        <p className="text-pink-500 font-bold ">
                                                            ৳{Math.round(price - discountAmount)}&nbsp;
                                                            <span className="text-gray-500 font-bold relative strike">৳{price}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        )}
                        {activeTab == 2 && (
                            discountedProduct40.length > 0 &&
                            discountedProduct40.map((product, index) => {

                                const price = product?.variation_combinations?.length
                                    ? product.variation_combinations[0].price
                                    : [product.price];

                                const discountAmount = product?.variation_combinations?.length
                                    ? product.variation_combinations[0].discount
                                    : [product.discount_amount || 0];

                                const discountPercent = product?.variation_combinations?.length
                                    ? product.variation_combinations[0].discount_percent
                                    : [product.discount_percent || 0];

                                const discountDate = product?.variation_combinations?.length
                                    ? product.variation_combinations[0].discount_date
                                    : (product.discount_date ? product.discount_date : null);

                                const isDiscountValid = (new Date(discountDate) >= new Date() || discountDate == null) ? true : false;

                                return (
                                    <div key={index} className="w-full h-full group">
                                        <Link to={`/singleproduct/${product.name}-${product.id}`}>
                                            <div className="relative bg-white shadow-sm rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300 p-2">
                                                {/* Product Image */}
                                                <div className="relative">
                                                    <div className="group relative overflow-hidden">
                                                        <img
                                                            src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/15/image/${product.image}`}
                                                            alt={product.name}
                                                            className="sm:h-[340px] mx-auto object-cover group-hover:scale-125 transition-transform duration-500"
                                                        />
                                                    </div>

                                                    {/* Discount Badge */}
                                                    {(discountPercent > 0 && isDiscountValid) ? (
                                                        <span className="absolute  right-0 top-1 sm:right-3 sm:top-3  bg-pink-500 text-white font-semibold py-1 px-2 rounded-full flex items-center text-xs origin-bottom -rotate-6">{Math.round(discountPercent)}% Off
                                                        </span>
                                                    ) : ''}
                                                </div>

                                                {/* Product Details */}
                                                <div className="text-center">
                                                    {/* Product Name */}
                                                    <h2 className="font-semibold shippori text-gray-800 truncate group-hover:text-pink-500 transition-colors duration-300">
                                                        {product.name}
                                                    </h2>
                                                    {/* Pricing */}
                                                    <div className="text-gray-700">
                                                        {
                                                            discountPercent > 0 && isDiscountValid ? (
                                                                <p className="text-pink-500 font-bold ">
                                                                    ৳{Math.round(price - discountAmount)}&nbsp;
                                                                    <span className="text-gray-500 font-bold relative strike">৳{price}</span>
                                                                </p>
                                                            ) : (
                                                                <span className="text-pink-500 font-bold">৳{price}</span>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        )}

                        {activeTab == 3 &&
                            discountedProduct20.length > 0 &&
                            discountedProduct20.map((product, index) => {

                                const price = product?.variation_combinations?.length
                                    ? product.variation_combinations[0].price
                                    : [product.price];

                                const discountAmount = product?.variation_combinations?.length
                                    ? product.variation_combinations[0].discount
                                    : [product.discount_amount || 0];

                                const discountPercent = product?.variation_combinations?.length
                                    ? product.variation_combinations[0].discount_percent
                                    : [product.discount_percent || 0];

                                const discountDate = product?.variation_combinations?.length
                                    ? product.variation_combinations[0].discount_date
                                    : (product.discount_date ? product.discount_date : null);

                                const isDiscountValid = (new Date(discountDate) >= new Date() || discountDate == null) ? true : false;

                                return (
                                    <div key={index} className="w-full h-full group">
                                        <Link to={`/singleproduct/${product.name}-${product.id}`}>
                                            <div className="relative bg-white shadow-sm rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300 p-2">
                                                {/* Product Image */}
                                                <div className="relative">
                                                    <div className="group relative overflow-hidden">
                                                        <img
                                                            src={`https://pub-c053b04a208d402dac06392a3df4fd32.r2.dev/15/image/${product.image}`}
                                                            alt={product.name}
                                                            className="sm:h-[340px] mx-auto object-cover group-hover:scale-125 transition-transform duration-500"
                                                        />
                                                    </div>

                                                    {/* Discount Badge */}
                                                    {(discountPercent > 0 && isDiscountValid) ? (
                                                        <span className="absolute  right-0 top-1 sm:right-3 sm:top-3  bg-pink-500 text-white font-semibold py-1 px-2 rounded-full flex items-center text-xs origin-bottom -rotate-6">{Math.round(discountPercent)}% Off
                                                        </span>
                                                    ) : ''}
                                                </div>

                                                {/* Product Details */}
                                                <div className="text-center">
                                                    {/* Product Name */}
                                                    <h2 className="font-semibold shippori text-gray-800 truncate group-hover:text-pink-500 transition-colors duration-300">
                                                        {product.name}
                                                    </h2>
                                                    {/* Pricing */}
                                                    <div className="text-gray-700">
                                                        {
                                                            discountPercent > 0 && isDiscountValid ? (
                                                                <p className="text-pink-500 font-bold ">
                                                                    ৳{Math.round(price - discountAmount)}&nbsp;
                                                                    <span className="text-gray-500 font-bold relative strike">৳{price}</span>
                                                                </p>
                                                            ) : (
                                                                <span className="text-pink-500 font-bold">৳{price}</span>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div >
        </div >
    )
}

export default DiscountProduct