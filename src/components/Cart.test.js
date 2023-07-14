import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Cart from './Cart';

const mock = new MockAdapter(axios);

test('renders cart component with empty cart message', async () => {
  mock.onGet('https://fakestoreapi.com/carts/2').reply(200, { products: [] });

  render(<Cart />);

  await waitFor(() => {
    const emptyCartMessage = screen.getByText(/Your cart is empty/i);
    expect(emptyCartMessage).toBeInTheDocument();
  });
});

test('renders cart component with cart items', async () => {
  const cartProducts = [
    {
      id: 1,
      title: 'Product 1',
      price: 10,
      image: 'https://example.com/product1.jpg',
      quantity: 2,
    },
    {
      id: 2,
      title: 'Product 2',
      price: 20,
      image: 'https://example.com/product2.jpg',
      quantity: 1,
    },
  ];

  mock.onGet('https://fakestoreapi.com/carts/2').reply(200, { products: cartProducts });

  render(<Cart />);

  await waitFor(() => {
    const productTitles = screen.getAllByText(/Product \d/i);
    expect(productTitles.length).toBe(2);
  });
});
