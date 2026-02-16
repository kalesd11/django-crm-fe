// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './Features/uiSlice';
import authReducer from "./Features/authSlice"

export const store = configureStore({
  reducer: {
    ui: uiReducer,
      auth: authReducer,  
  },
});
