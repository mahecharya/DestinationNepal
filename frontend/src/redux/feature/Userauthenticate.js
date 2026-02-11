import { createSlice } from "@reduxjs/toolkit";

const token=createSlice({
    name:"dipu",initialState:{token:null},isAuthenticated: false,
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload,
            state.isAuthenticated=action.payload.token
        },
        logoutUser:(state)=>{
            state.token=null;
        }
    },

})
export const {setToken,logoutUser}=token.actions
export default token.reducer