// discountedProduct60.map((product, index) => {
const prices = product?.variation_combinations?.length
    ? product.variation_combinations.map((comb) => comb.price)
    : [product.price];

const discounts = product?.variation_combinations?.length
    ? product.variation_combinations.map((comb) => comb.discount_percent)
    : [product.discount_percent || 0];

const discountDates = product?.variation_combinations?.length
    ? product.variation_combinations.map((comb) =>
        new Date(comb.discount_date)) // Get the discount date as a timestamp
    : (product.discount_date ? [new Date(product.discount_date)] : []); // Use product discount date if available

// const highPrice = Math.max(...prices);
const lowPrice = Math.min(...prices);
const maxPrice = Math.max(...prices);
const discountPrice = Math.max(...discounts);
const discountDate = discountDates.length ? new Date(Math.max(...discountDates)) : null;
// }))