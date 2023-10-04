import { TypeMessage } from "./TypeMessage"

export type NotificationType = {
    from?:string,
    to?:string,
    type:TypeMessage;
    textMessage:string
}