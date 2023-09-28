import { Box, Typography } from "@mui/material"
import { ChatsArea } from "../Areas/ChatsArea";
import { useSelectorUser } from "../../Redux/Store";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import MessageArea from "../Areas/MessageArea";
import ContactsArea from "../Areas/ContactsArea";
import { chatRoomService } from "../../Config/service-config";
import { ClientType } from "../../Model/Accounts/ClientType";
import { Subscription } from "rxjs";
import { CodePayload } from "../../Model/Alert/CodePayload";
import CodeType from "../../Model/Alert/CodeType";
import { ChatType } from "../../Model/ChatsTypes/ChatType";
import { useDispatch } from "react-redux";
import { codeAction } from "../../Redux/Slice/CodeSlice";
import { chatsAction } from "../../Redux/Slice/ChatSlice";
import { NewChat } from "../../Model/ChatsTypes/NewChat";
import { UserData } from "../../Model/Auth/UserData";
import { RemoveChatType } from "../../Model/ChatsTypes/RemoveChatType";

const ChatRoom:React.FC = () => {

    const [allClients,setAllClients] = useState<ClientType[]>([]);
    const [myChats,setMyChats] = useState<ChatType[]>([])

    const style:CSSProperties = {
        width:'100%',
        display:'flex',
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'center'

    }

    const styleArea:CSSProperties = {
        width:'100%',
        display:'flex',
        flexDirection:'column',
    }

    const styleTitle:CSSProperties = {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'
    }

    const currentUser:UserData = useSelectorUser();
    const dispath = useDispatch()

    async function getActiveContacts (){
       return await chatRoomService.getActiveContacts();
        
    }

    async function getAllClients() {
        return await chatRoomService.getAllClients();
    }

    useEffect(() => {
        const subscriptionChat:Subscription = chatRoomService.getAllMyChats().subscribe({
            next(chats:ChatType[]|string) {
                const codeAlert: CodePayload = {code:CodeType.OK,message:''}
                if (typeof chats != 'string') { 
                    setMyChats(chats);
                    dispath(chatsAction.set(chats))
                }   else {
                    setCodeAlert(chats, codeAlert);
                    codeAlert.message = chats 
                }
                dispath(codeAction.set(codeAlert))
            },
        })
    },[])

    useEffect(() => {
        const subscribtion:Subscription = chatRoomService.getClients().subscribe({
            next(clients:ClientType[] | string) {
                const codeAlert: CodePayload = {code:CodeType.OK,message:''}
                if(typeof clients != 'string'){
                    setAllClients(clients); 
                } else {
                    setCodeAlert(clients,codeAlert)
                    codeAlert.message = clients 
                }
                console.log('clients');
                
                dispath(codeAction.set(codeAlert))
            }
        })

    },[])


    async function createChat(userName:string):Promise<void>{
        const newChat:NewChat = {
            user_from:currentUser.username,
            user_to:userName
        }
        await chatRoomService.createChat(newChat)  
    }

    async function removeChat(chatId:string):Promise<void> {
        const removedChat:RemoveChatType = {
            user:currentUser.username,
            chatId:chatId
        }
        await chatRoomService.removeChat(removedChat);
        console.log(removedChat);
         
    }



    return <Box sx={styleArea}>
                <Box sx={styleTitle}>
                    <Typography variant="h6">Welcome:{currentUser.username}</Typography>
                </Box>
            <Box sx={style}>
                <ChatsArea username={currentUser.username} chats={myChats} callbackRemove={removeChat}></ChatsArea>
                <MessageArea messages={[{owner:'user', text:'message 1'}, {owner:'user 2', text:'message 2'}]}></MessageArea>
                <ContactsArea callback={createChat} contacts={allClients}></ContactsArea>
            </Box> 
        </Box>
}

export default ChatRoom;

function setCodeAlert(chats: string, codeAlert: CodePayload) {
    if (chats.includes('Auth')) {
        codeAlert.code = CodeType.AUTH_ERROR;
    } else {
        codeAlert.code = CodeType.SERVER_ERROR;
    }
}
