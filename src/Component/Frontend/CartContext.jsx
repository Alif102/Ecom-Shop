import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);


  useEffect(() => {
    // Initialize cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(existingCart);
    setCartCount(existingCart.reduce((acc, item) => acc + item.quantity, 0));
  }, []);

  const addToCart = (product, qty, v_id, variation , currentPrice) => {
    console.log(v_id, variation);

    // Determine the product ID to use (v_id for variant or product.id for the base product)
    const productId = v_id || product.id;

    // Check if the product/variant already exists in the cart
    const existingProductIndex = cart.findIndex((item) => item.id === productId);

    // Get the price from the variation combination if v_id is provided
    const price = v_id ? currentPrice : product.price || 0;

    const v_values = v_id ? variation.values : "";

    // Default quantity to 1 if not provided
    const quantityToAdd = qty || 1;

    let updatedCart = [...cart];

    if (existingProductIndex !== -1) {
        // Update the quantity and recalculate the price
        updatedCart[existingProductIndex].quantity += quantityToAdd;
        updatedCart[existingProductIndex].price =
            updatedCart[existingProductIndex].unitPrice * updatedCart[existingProductIndex].quantity;
    } else {
        // Add new product/variant with unitPrice and initial quantity
        const newCartItem = {
            ...product,
            id: productId, // Use v_id as the unique identifier if available
            quantity: quantityToAdd,
            unitPrice: price,
            variation_values: v_values,

            price: price * quantityToAdd,
            variationDetails: v_id ? variation : null, // Include variation details if v_id is provided
        };
        updatedCart.push(newCartItem);
    }

    // Update localStorage, state, and UI feedback
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    setCartCount(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
    setTotalPrice(updatedCart.reduce((acc, item) => acc + item.price, 0));

    // Show success message
    // Swal.fire({
    //     icon: "success",
    //     title: "Product added/updated in cart!",
    //     text: `You now have ${updatedCart[existingProductIndex]?.quantity || quantityToAdd} of this product in your cart.`,
    //     showConfirmButton: false,
    //     timer: 1000,
    // });
    toast(
      <>
        Product added successfully in your cart.<br /> 
        {/* You now have {updatedCart[existingProductIndex]?.quantity || quantityToAdd} of this product in your cart. */}
      </>,
      {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#C43882',
          color: '#fff',
        },
      }
    );
    
};

  

  const updateCartItem = (updatedProduct) => {
    const updatedCart = cart.map((item) =>
      item.id === updatedProduct.id ? updatedProduct : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.reduce((acc, item) => acc + item.quantity, 0));

    setTotalPrice(updatedCart.reduce((acc, item) => acc + item.price, 0));

  };

  const handleIncreaseQuantity = (productId) => {
    const product = cart.find((p) => p.id === productId);
    if (product) {
      const updatedProduct = {
        ...product,
        quantity: product.quantity + 1,
        price: product.unitPrice * (product.quantity + 1), // Use unitPrice for price calculation
      };
      updateCartItem(updatedProduct);
    }
  };

  const handleDecreaseQuantity = (productId) => {
    const product = cart.find((p) => p.id === productId);
    if (product && product.quantity > 1) { // Check if the quantity is greater than 1
      const updatedProduct = {
        ...product,
        quantity: product.quantity - 1, 
        price: product.unitPrice * (product.quantity - 1), // Correct price calculation
      };
      updateCartItem(updatedProduct);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    setCartCount(updatedCart.reduce((acc, item) => acc + item.quantity, 0));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setTotalPrice(updatedCart.reduce((acc, item) => acc + item.price, 0));

  };


  console.log(totalPrice);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        totalPrice,
        addToCart,
        removeFromCart,
        updateCartItem,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};