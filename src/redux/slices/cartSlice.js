import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage if available
const storedCart = JSON.parse(localStorage.getItem("cart"));

const initialState = storedCart || {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.cartItems.find(i => i.id === item.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalAmount += item.price;
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existing = state.cartItems.find(i => i.id === itemId);
      if (existing) {
        state.totalQuantity -= existing.quantity;
        state.totalAmount -= existing.price * existing.quantity;
        state.cartItems = state.cartItems.filter(i => i.id !== itemId);
      }
    },

    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find(i => i.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalAmount -= item.price;
      } else {
        state.cartItems = state.cartItems.filter(i => i.id !== itemId);
        state.totalQuantity -= 1;
        state.totalAmount -= item.price;
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
