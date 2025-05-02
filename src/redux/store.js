import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});

// Sync Redux state to localStorage on every change
store.subscribe(() => {
  const { cart } = store.getState();
  localStorage.setItem("cart", JSON.stringify(cart));
});

export default store;
