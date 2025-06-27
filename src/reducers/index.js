import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "../Slices/Authslice.js"
import profileReducer from '../Slices/profileSlice.js'
import cartReducer from '../Slices/cartSlice.js'

const rootReducer = combineReducers ({
    auth : authReducer,
    profile : profileReducer,
    cart : cartReducer,

})

export default rootReducer