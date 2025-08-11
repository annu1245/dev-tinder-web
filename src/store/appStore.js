import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import feedReducer from './feedSlice';
import connectionReducer from './connectionsSlice';

const appStore = configureStore({
  reducer: {
    auth: authReducer,
    feed: feedReducer,
    connections: connectionReducer
  }
})

export default appStore;