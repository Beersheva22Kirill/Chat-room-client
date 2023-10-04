import {createSlice} from "@reduxjs/toolkit"
import { ChatType } from "../../Model/ChatsTypes/ChatType"

const defaultChat = null

const initialState:{currentChat:ChatType|null} = {
    currentChat:defaultChat
};

const slice = createSlice({
    initialState,
    name:"currentChat",
    reducers:{
        set: (state, data) => {
            state.currentChat = data.payload
        },

        reset:(state) => {
            state.currentChat = defaultChat
        }
    }
})

export const currentChatReducer = slice.reducer;
export const currentChatAction = slice.actions;