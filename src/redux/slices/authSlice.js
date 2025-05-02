// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Simulated async
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const registerUser = createAsyncThunk("auth/registerUser", async (userData, thunkAPI) => {
  await delay(1000);
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const existing = users.find((user) => user.email === userData.email);
  if (existing) {
    return thunkAPI.rejectWithValue("User already exists");
  }

  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(userData));
  return userData;
});

export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, thunkAPI) => {
  await delay(1000);
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const found = users.find((user) => user.email === email && user.password === password);

  if (!found) {
    return thunkAPI.rejectWithValue("Invalid credentials");
  }

  localStorage.setItem("currentUser", JSON.stringify(found));
  return found;
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await delay(500);
  localStorage.removeItem("currentUser");
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("currentUser")) || null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
