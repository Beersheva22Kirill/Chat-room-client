import { ChatType } from "../../Model/ChatsTypes/ChatType";
import {createSlice} from'@reduxjs/toolkit';

const chats:ChatType[] = [];

const initialState:{initialChats:ChatType[]} = {
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

