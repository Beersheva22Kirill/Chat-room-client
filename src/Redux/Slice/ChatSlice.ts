import { Chat } from "../../Model/ChatsTypes/Chat";
import {createSlice} from'@reduxjs/toolkit';

const chats:Chat[] = [];

const initialState:{initialChats:Chat[]} = {
    initialChats:chats
}


const slice = createSlice({
    initialState,
    name:'myChats',
    reducers:{
        set: (state,data) => {
            state.initialChats = data.payload
        },
        reset: (state) => {
            state.initialChats = chats;
        }
    }
})

export const chatsReducer = slice.reducer;
export const chatsAction = slice.actions;

