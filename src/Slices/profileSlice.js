import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user :  null,
    loading :  false
};

const profileSlice = createSlice({
    name : "profile",
    initialState : initialState,
    reducers : {
        setUser(state , value){
            state.user = value.payload;
        },
        setLoadiing(state,value){
            state.loading = value.payload
        }
    }
})

export const {setUser,setLoadiing} = profileSlice.actions;

export default profileSlice.reducer
