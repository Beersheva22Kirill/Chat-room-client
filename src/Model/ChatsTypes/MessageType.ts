import { TypeMessage } from "../Notification/TypeMessage"

export type MessageType ={
    chatId:string,
    date:string,
    from:string,
    type:TypeMessage,
    to?:string[],
    textMessage:string
}