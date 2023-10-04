import {createSlice} from "@reduxjs/toolkit"
import { MessageType } from "../../Model/ChatsTypes/MessageType"

const messagesDefault:MessageType[] = []

const initialState:{initialMessages:MessageType[]} = {
    initialMessages:messagesDefault
}

const slice = createSlice({
    initialState,
    name:'messages',
    reducers:{
        set:(state,data) => {
            state.initialMessages = data.payload
        },
        reset:(state) => {
            state.initialMessages = messagesDefault
        }
    }
})

export const messagesReduser = slice.reducer;
export const messagesAction = slice.actions;