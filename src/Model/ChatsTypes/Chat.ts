import { MessageType } from "./MessageType"
import { TypeChat } from "./TypeChat"
import { UserType } from "./UserType"

export type Chat = {
    idChat:string,
    type:TypeChat,
    chatName:string,
    users:UserType[],
    messages:MessageType[]
}