import { TypeChat } from "./TypeChat"

export type NewGroupe = {
    groupName:string,
    author:string,
    type:TypeChat,
    users:string[]
}