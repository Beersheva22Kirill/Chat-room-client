import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Slice/AuthSlice";
import { useSelector } from "react-redux";
import { codeReducer } from "./Slice/CodeSlice";
import { CodePayload } from "../Model/Alert/CodePayload";
import { chatsReducer } from "./Slice/ChatSlice";
import { ChatType } from "../Model/ChatsTypes/ChatType";


export const store = configureStore({
    reducer:{
        user:userReducer,
        codeState:codeReducer,
        chatsState:chatsReducer
    }
});

export function useSelectorUser(){
    return useSelector<any,any>(state => state.user.initialUser)
}

export function useSelectorCode() {
    return useSelector<any,CodePayload>(state => state.codeState.codeMessage)
}

export function useSelectorChats() {
    return useSelector<any,ChatType[]>(state => state.chatsState.initialChats)
}