import React, { useEffect, useState } from 'react'
import { FaAngleRight, FaBars, FaEye, FaSearch } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';
import azmain from '../../../assets/azmain.png'
import PriceRangeFilter from '../../../Component/Frontend/PriceRange/PriceRangeFilter';
import { MdClose } from 'react-icons/md';
import FeatureProducts from '../../../Component/Frontend/HomePage/FeatureProducts/FeatureProducts';

// Price Slider 

const Collections = ({ products }) => {

    const { category_name } = useParams();

    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState(false);

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [sortType, setSortType] = useState('relavent');
    // price range slider 
    const [priceRange, setPriceRange] = useState([0, 0]);
    const [rangeValues, setRangeValues] = useState([0, 0]);

    useEffect(() => {
        const uniqueCategories = [
            ...new Map(products.map(product => [product.category.id, product.category])).values()
        ];

        setCategories(uniqueCategories);
    }, [products]);

    useEffect(() => {
        // Initialize price range based on product data
        const prices = filterProducts.flatMap((product) =>
            product?.variation_combinations?.length
                ? product.variation_combinations.map((comb) => comb.price)
                : product.price
        );

        if (prices.length > 0) {
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            setPriceRange([minPrice, maxPrice]);
            setRangeValues([minPrice, maxPrice]);
        }
    }, [filterProducts])


    // useEffect(() => {
    //     if (products.length > 0 && category_name) {
    //         const lastIndex = category_name.lastIndexOf("-");
    //         const category_id = parseInt(category_name.substring(lastIndex + 1), 10);  // Extract the category ID
    //         if (category_id) {
    //             const filtered = products.filter(product => {
    //                 return category_name.includes(String(product.category.id)) || product.category?.name?.toLowerCase().includes(String(category_name.toLowerCase()));
    //             });
    //             setFilterProducts(filtered);
    //         }
    //         else {
    //             const filtered = products.filter(product => product.category?.name?.toLowerCase().includes(String(category_name.toLowerCase())));
    //             // If no category_name is provided, show all products
    //             setFilterProducts(filtered);
    //         }
    //     }
    //     else {
    //         // If no category_name is provided, show all products
    //         setFilterProducts(products);
    //     }
    // }, [category_name]);

    useEffect(() => {
        if (category_name && products?.length) {
            // Decode and normalize the category name for comparison
            const categoryName = decodeURIComponent(category_name).replace(/-/g, ' ').toLowerCase();
            console.log("Decoded category name:", categoryName);

            // Filter products based on the category name
            const filteredPdts = products.filter(
                (item) =>
                    item.category?.name?.toLowerCase() === categoryName ||
                    item.category?.name?.toLowerCase().includes(category_name.toLowerCase())
            );

            console.log("Filtered Products:", filteredPdts);

            // Set filtered products or show all if none match
            setFilterProducts(filteredPdts.length > 0 ? filteredPdts : products);
        } else if (!category_name && products?.length) {
            // If no category is provided, show all products
            setFilterProducts(products);
        }
    }, [category_name, products]); // Ensure `products` is in dependencies



    const toggleCategory = (e) => {
        const value = String(e.target.value); // Ensure value is a string
        if (category.includes(value)) {
            setCategory(prev => prev.filter(item => item !== value));
        } else {
            setCategory(prev => [...prev, value]);
        }
    };

    const applyCategoryFilter = () => {

        let productsCopy = products.slice();

        if (isSearchOpen && search) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (category.length > 0) {
            productsCopy = productsCopy.filter(product => {
                return category.includes(String(product.category.id));
            });
        }

        // productsCopy = productsCopy.filter(
        //     (product) => product?.variation_combinations?.length
        //         ? (product.variation_combinations[0].price >= rangeValues[0] && product.variation_combinations[0].price <= rangeValues[1]) : (product.price >= rangeValues[0] && product.price <= rangeValues[1])
        // );

        if (productsCopy.length > 0) {
            setFilterProducts(productsCopy);
        }
    }

    const sortProducts = () => {
        let fpCopy = filterProducts;

        switch (sortType) {
            case 'low-high': // Sort by price (low to high)
                setFilterProducts(fpCopy.sort((a, b) => (a?.variation_combinations?.length && b?.variation_combinations?.length)
                    ? (a.variation_combinations[0].price - b.variation_combinations[0].price) : (a.price - b.price)));
                break;

            case 'high-low': // Sort by price (high to low)
                setFilterProducts(fpCopy.sort((a, b) => (a?.variation_combinations?.length && b?.variation_combinations?.length)
                    ? (b.variation_combinations[0].price - a.variation_combinations[0].price) : (b.price - a.price)));
                break;

            case 'name-asc': // Sort by name (A to Z)
                setFilterProducts(fpCopy.sort((a, b) => a.name.localeCompare(b.name)));
                break;

            case 'name-desc': // Sort by name (Z to A)
                setFilterProducts(fpCopy.sort((a, b) => b.name.localeCompare(a.name)));
                break;

            case 'stock-high': // Sort by stock (high to low)
                setFilterProducts(fpCopy.sort((a, b) => b.stock - a.stock));
                break;

            case 'stock-low': // Sort by stock (low to high)
                setFilterProducts(fpCopy.sort((a, b) => a.stock - b.stock));
                break;

            case 'latest': // Sort by latest created (newest to oldest)
                setFilterProducts(fpCopy.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
                break;

            case 'oldest': // Sort by oldest created (oldest to newest)
                setFilterProducts(fpCopy.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)));
                break;

            default:// Apply default filter if no sorting type matches
                applyCategoryFilter();
                break;
        }

    }

    const [showProduct, setShowProduct] = useState(8);

    useEffect(() => {
        applyCategoryFilter();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, isSearchOpen, search]);


    useEffect(() => {
        sortProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortType]);

    const getMoreProduct = () => {
        if (filterProducts.length >= showProduct) {
            setShowProduct((prev) => prev + 8)
        }
    }



    return (

        <div className='container mx-auto relative pb-20 sm:pb-10'>
            {/* Navbar */}
            <nav className="navbar w-full sticky bg-transparent z-50">
                <div className="container mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/">
                        <img src={azmain} alt="logo" className="w-auto h-16" srcSet="" />
                    </Link>

                    {/* Links (hidden on small devices) */}
                    <div className="hidden md:flex space-x-4">
                        <Link to="/collection" className="text-[#C43882] font-sembold text-[20px] hover:text-gray-700">
                            New-Arrival
                        </Link>
                        <Link to="/collection/man" className="text-[#C43882] font-sembold text-[20px] hover:text-gray-700">
                            Man
                        </Link>
                        <Link to="/collection/women" className="text-[#C43882] font-sembold text-[20px] hover:text-gray-700">
                            Women
                        </Link>
                        <Link to="/collection/kids" className="text-[#C43882] font-sembold text-[20px] hover:text-gray-700">
                            Kids
                        </Link>
                        <Link to="/collection/accessories" className="text-[#C43882] font-sembold text-[20px] hover:text-gray-700">
                            Accessories
                        </Link>
                    </div>

                    {/* Right icons */}
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search..."
                                className={`input bg-transparent border text-black outline-[#c43882] border-white input-xs md:input-sm rounded-full  font-sembold p-4 focus:border-white focus:outline-[#c43882] duration-500 focus:ring-0 absolute top-1/2 right-0 transform -translate-y-1/2 ${isSearchOpen ? 'w-48 sm:w-80 bg-white opacity-1' : 'w-0 opacity-0'}`}
                            />
                            {isSearchOpen ? <MdClose onClick={() => setIsSearchOpen(false)} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#C43882] font-sembold z-30 block" size={20} /> :
                                <FaSearch onClick={() => setIsSearchOpen(true)} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-[#C43882] font-sembold z-30 block" size={20} />
                            }
                        </div>
                    </div>
                </div>
            </nav>
            <div className='flex sm:flex-row flex-col gap-1 sm:gap-10 pt-5 py-10 border-t sm:space-y-5'>
                {/* Left Filter Option */}
                <div className="min-w-60 px-2 sm:px-0">
                    <button onClick={() => setShowFilter(!showFilter)} className='flex items-center gap-2 my-2 text-xl cursor-pointer'>FILTERS
                        <FaAngleRight className={`h-3 sm:hidden  transition ease-in-out duration-200 ${showFilter ? 'rotate-90' : ''}`} />
                    </button>
                    {/* Category Filter  */}
                    <div className={`border rounded border-pink-500 sm:mt-2 p-5 mb-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                        <div className='mb-10 space-y-3'>
                            <span className="font-semibold">Filter by Category</span>

                            <div className="flex flex-col gap-5 font-medium text-gray-700 text-sm">
                                {
                                    categories &&
                                    categories.map((item, index) => (
                                        <p className="flex gap-5" key={index}>
                                            <input type="checkbox" className='w-3' name="" id="" value={item.id} onChange={toggleCategory} />{item.name}
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                        <div className='space-y-3'>
                            <span className="font-semibold">Filter by Price</span>
                            <PriceRangeFilter
                                min={priceRange[0]}
                                max={priceRange[1]}
                                minDifference={100}
                                onRangeChange={setRangeValues}
                                currency="৳"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side Products  */}
                <div className="flex-1">
                    <div className="flex justify-between text-base sm:text-2xl px-2 sm:px-0">
                        <div className='inline-flex gap-2 items-center mb-3'>
                            <p className='text-gray-500'>ALL <span className='text-pink-500 font-medium' >COLLECTIONS</span>
                            </p>
                            <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
                        </div>
                        <select onChange={(e) => setSortType(e.target.value)} name="" id="" className="border-2 border-pink-500 px-2 text-sm">
                            <option value="relavent">Sort by: Relavent</option>
                            <option value="low-high">Price: Low to High</option>
                            <option value="high-low">Price: High to Low</option>
                            <option value="latest">Latest to Oldest</option>
                            <option value="oldest">Oldest to Latest</option>
                            <option value="name-asc">Name: A to Z</option>
                            <option value="name-desc">Name: Z to A</option>
                            <option value="stock-high">Stock: High to Low</option>
                            <option value="stock-low">Stock: Low to High</option>
                        </select>
                    </div>
                    <p className='mb-5 px-2 sm:px-0'>Showing {filterProducts.slice(0, showProduct).length} out of <span className='text-pink-500'>{filterProducts.length}</span> results</p>
                    {/* products */}
                    <div className="gap-2 lg:gap-4 gap-y-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {
                            filterProducts ?
                                filterProducts.slice(0, showProduct).map((product, index) => {

                                    const price = product?.variation_combinations?.length
                                        ? product.variation_combinations[0].price
                                        : [product.price];

                                    const prices = product?.variation_combinations?.length
                                        ? product.variation_combinations.map((comb) => comb.price)
                                        : [product.price];

                                    const lowPrice = Math.min(...prices);
                                    const highPrice = Math.max(...prices);

                                    const discountAmount = product?.variation_combinations?.length
                                        ? product.variation_combinations[0].discount
                                        : [product.discount_amount || 0];

                                    const discountDate = product?.variation_combinations?.length
                                        ? product.variation_combinations[0].discount_date
                                        : (product.discount_date ? product.discount_date : null);

                                    const isDiscountValid = discountDate == null || new Date(discountDate) >= new Date();

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
                                                                loading="lazy"
                                                                className="sm:h-[380px] h-[300px] w-full object-cover group-hover:scale-125 transition-transform duration-500"
                                                            />
                                                        </div>

                                                        {/* Discount Badge */}
                                                        {(discountAmount > 0 && isDiscountValid) ? (
                                                            <span className="absolute  right-0 top-1 sm:right-3 sm:top-3 bg-pink-500 text-white font-semibold py-1 px-2 rounded-full flex items-center text-xs origin-bottom -rotate-6">৳{Math.round(discountAmount)} Off
                                                            </span>
                                                        ) : ''}
                                                    </div>

                                                    {/* Product Details */}
                                                    <div className="p-2 sm:p-4">
                                                        {/* Product Name */}
                                                        <h2 className="font-semibold shippori text-gray-800 truncate mb-1 group-hover:text-pink-500 transition-colors duration-300">
                                                            {product.name}
                                                        </h2>

                                                        {/* Pricing */}
                                                        <div className="flex items-center gap-1 justify-between">
                                                            {
                                                                (discountAmount > 0 && isDiscountValid) ?
                                                                    <p className="text-pink-500 font-bold ">
                                                                        ৳{Math.round(price - discountAmount)}&nbsp;
                                                                        <span className="text-gray-500 font-bold relative strike">৳{price}</span>
                                                                    </p> :
                                                                    ((lowPrice == highPrice) ?
                                                                        <p className="text-pink-500 font-bold ">
                                                                            ৳{lowPrice}
                                                                        </p>
                                                                        :
                                                                        <p className="text-pink-500 font-bold ">
                                                                            ৳{lowPrice} - ৳{highPrice}
                                                                        </p>)

                                                            }
                                                            <button className="bg-pink-500 text-white text-sm py-1 md:px-4 px-2 whitespace-nowrap rounded-full hover:bg-pink-600 transition duration-300 hidden sm:block">
                                                                QUICK VIEW
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })
                                : <p>No products found....!!!</p>
                        }
                    </div>


                    <div className="text-center mt-5">
                        <button onClick={() => getMoreProduct()} className="bg-pink-500 text-white text-center text-sm py-2 md:px-10 px-4 whitespace-nowrap rounded-full hover:bg-pink-600 transition duration-300">View More</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collections