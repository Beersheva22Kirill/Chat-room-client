import { LOCAL_STORAGE_ITEM_USER } from "../../Config/service-config"
import { UserData } from "../../Model/Auth/UserData";
import {createSlice} from'@reduxjs/toolkit';

const unautorized:UserData = {username:'unauthorized',role:'unauthorized'};
const localUser:string|null = localStorage.getItem(LOCAL_STORAGE_ITEM_USER); 
const currentUser:UserData = localUser ? JSON.parse(localUser) : unautorized;

const initialState: {initialUser:UserData} = {
    initialUser:currentUser
}

const slice = createSlice({
    initialState:initialState,
    name:'currentUser',
    reducers:{
        set: (state,data) => {
            state.initialUser = data.payload as UserData
        },

        reset: (state) => {
            state.initialUser = unautorized
        }

    }
})

export const userReducer = slice.reducer;
export const userAction = slice.actions;

