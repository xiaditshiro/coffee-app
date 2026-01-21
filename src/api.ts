// src/api.ts
import axios from 'axios';

export const BASE_URL = 'http://10.0.2.2:3000'; // Android Emulator
export const IMAGE_URL = `${BASE_URL}/images`;
// REGISTER USER + FOTO
export const registerUser = async (
  email: string,
  username: string,
  password: string,
  photo?: { uri: string; type?: string; fileName?: string }
) => {
  const formData = new FormData();
  formData.append('email', email);  
  formData.append('username', username);
  formData.append('password', password);

  if (photo) {
    formData.append('profile_image', {
      uri: photo.uri,
      type: photo.type || 'image/jpeg',
      name: photo.fileName || 'profile.jpg',
    } as any);
  }

  return axios.post(`${BASE_URL}/auth/register`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};


// LOGIN USER
export const loginUser = async (username: string, password: string) => {
  return axios.post(`${BASE_URL}/auth/login`, { username, password });
};

// FETCH PRODUK
export const fetchCoffee = async (categoryId?: number) => {
  let url = `${BASE_URL}/products/coffee`;
  if (categoryId) url = `${BASE_URL}/products/category/${categoryId}`;
  return axios.get(url);
};

export const fetchCake = async () => {
  return axios.get(`${BASE_URL}/products/cake`);
};

// ADD TO CART
export const addToCart = (userId: number, productId: number) => {
  return axios.post(`${BASE_URL}/cart`, {
    user_id: userId,
    product_id: productId,
    qty: 1,
  });
};

// GET CART
export const fetchCart = (userId: number) => {
  return axios.get(`${BASE_URL}/cart/${userId}`);
};

// UPDATE QTY CART
export const updateCartQty = (cartId: number, qty: number) => {
  return axios.put(`${BASE_URL}/cart/${cartId}`, { qty });
};

// DELETE CART ITEM
export const deleteCartItem = (cartId: number) => {
  return axios.delete(`${BASE_URL}/cart/${cartId}`);
};


export const checkout = (userId: number) => {
  return axios.post(`${BASE_URL}/checkout`, {
    user_id: userId,
  });
};

export const fetchOrders = (userId: number) =>
  axios.get(`${BASE_URL}/orders/${userId}`);


export const fetchOrderHistory = (userId: number) => {
  return axios.get(`${BASE_URL}/orders/${userId}`);
};

