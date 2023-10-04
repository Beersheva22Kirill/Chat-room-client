import {createSlice} from "@reduxjs/toolkit"
import { ChatType } from "../../Model/ChatsTypes/ChatType"

const defaultChat = undefined

const initialState:{currentChat:ChatType|undefined} = {
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