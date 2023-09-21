import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Slice/AuthSlice";
import { useSelector } from "react-redux";


export const store = configureStore({
    reducer:{
        user:userReducer
    }
});

export function useSelectorUser(){
    return useSelector<any,any>(state => state.user.initialUser)
}
