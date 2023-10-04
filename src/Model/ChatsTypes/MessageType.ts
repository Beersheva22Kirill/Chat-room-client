import { TypeMessage } from "../Notification/TypeMessage"

export type MessageType ={
    chatId:string,
    from:string,
    type:TypeMessage,
    to?:string[],
    textMessage:string
}