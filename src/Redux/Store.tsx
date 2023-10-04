import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Slice/AuthSlice";
import { useSelector } from "react-redux";
import { codeReducer } from "./Slice/CodeSlice";
import { CodePayload } from "../Model/Alert/CodePayload";
import { chatsReducer } from "./Slice/ChatSlice";
import { ChatType } from "../Model/ChatsTypes/ChatType";
import { currentChatReducer } from "./Slice/CurrChatSlice";
import { messagesReduser } from "./Slice/MessagesSlice";
import { MessageType } from "../Model/ChatsTypes/MessageType";


export const store = configureStore({
    reducer:{
        user:userReducer,
        codeState:codeReducer,
        chatsState:chatsReducer,
        currChat:currentChatReducer,
        currMessages:messagesReduser
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

export function useSelectorCurrentChat() {
    return useSelector<any,ChatType>(state => state.currChat.currentChat)
}

export function useSelectorCurrentMessages() {
    return useSelector<any,MessageType[]>(state => state.currMessages.initialMessages)
}