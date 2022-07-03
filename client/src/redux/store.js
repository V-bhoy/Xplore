import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice'
import xploreReducer from "./features/xploreSlice";

const store = configureStore({
    reducer:{
        auth: authReducer,
        xplore: xploreReducer
    }
})


export default store;