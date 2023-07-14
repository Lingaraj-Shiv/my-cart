import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    async function fetchCartProducts() {
      try {
        const response = await axios.get('https://fakestoreapi.com/carts/2');
        const cartData = response.data;

        const productDetailsPromises = cartData.products.map(async (product) => {
          const productResponse = await axios.get(
            `https://fakestoreapi.com/products/${product.productId}`
          );
          const productDetails = productResponse.data;

          return {
            id: product.productId,
            title: productDetails.title,
            price: productDetails.price,
            image: productDetails.image,
            quantity: product.quantity,
          };
        });

        const updatedCartProducts = await Promise.all(productDetailsPromises);

        setCartProducts(updatedCartProducts);
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    }

    fetchCartProducts();
  }, []);

  return (
    <div className="cart">
      <h1 className="cart-title">Products in Cart</h1>
      <div className="product-list">
        {cartProducts.map((product) => (
          <div key={product.id} className="product-card" data-testid="product-card">
              <img src={product.image} alt={product.title} className="product-image" />
              <div className="product-details">
                <div className="product-title">{product.title}</div>
                <div className="product-price">Price: ${product.price}</div>
                <div className="product-quantity">Quantity: {product.quantity}</div>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
