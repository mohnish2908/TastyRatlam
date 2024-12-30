import { combineReducers } from '@reduxjs/toolkit';

import authReducer from '../slices/userSlice';
// import profileReducer from '../slices/profileSlice';
// import productReducer from '../slices/productSlice';
import adminReducer from '../slices/adminSlice';
const rootReducer = combineReducers({
    auth: authReducer,
    // profile: profileReducer,
    admin: adminReducer,


})

export default rootReducer;