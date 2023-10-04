import { Box, Typography } from "@mui/material"
import { ChatsArea } from "../Areas/ChatsArea";
import { useSelectorCurrentChat, useSelectorCurrentMessages, useSelectorUser } from "../../Redux/Store";
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
import { currentChatAction } from "../../Redux/Slice/CurrChatSlice";
import { MessageType } from "../../Model/ChatsTypes/MessageType";
import { log } from "console";
import { messagesAction } from "../../Redux/Slice/MessagesSlice";

const ChatRoom:React.FC = () => {

    const currentChat:ChatType|null = useSelectorCurrentChat();
    const [currChatState,setCurrChatState] = useState<ChatType|null>(null)
    const [allClients,setAllClients] = useState<ClientType[]>([]);
    const [myChats,setMyChats] = useState<ChatType[]>([])
    const currentUser:UserData = useSelectorUser();
    const messages:MessageType[] = useSelectorCurrentMessages();

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
                    if(!currentChat){
                        dispath(currentChatAction.set(chats[0]))
                    }
                    console.log('Chats downloaded');
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
                    console.log('Clients dowloaded');
                } else {
                    setCodeAlert(clients,codeAlert)
                    codeAlert.message = clients 
                }
                dispath(codeAction.set(codeAlert))
            }
        })

    },[])

    useEffect(() => {
        const id = currentChat ? currentChat.idChat : '';
        const subscription:Subscription = chatRoomService.getChatById(id).subscribe({
            next(chat:ChatType | string) {
                const codeAlert: CodePayload = {code:CodeType.OK,message:''}
                if(typeof chat !='string'){
                    let allMessages:MessageType[];
                    if(chat){
                        allMessages = chat.messages;
                        console.log('messages dowloaded');
                    } else {
                        allMessages = [];
                    }
                    dispath(messagesAction.set(allMessages))
                } else {
                    setCodeAlert(chat,codeAlert)
                    codeAlert.message = chat 
                }
                dispath(codeAction.set(codeAlert))
            }
        })
       
    },[currentChat])



    async function createChat(userName:string):Promise<void>{
        const newChat:NewChat = {
            users:[currentUser.username,userName]
        }
        await chatRoomService.createChat(newChat)  
    }

    async function removeChat(chatId:string):Promise<void> {
        const removedChat:RemoveChatType = {
            user:[currentUser.username],
            chatId:chatId
        }
        if (currentChat?.idChat === removedChat.chatId) {
            dispath(currentChatAction.reset())
        }
        await chatRoomService.removeChat(removedChat);         
    }

    async function selectChat(chat:ChatType) {
        dispath(currentChatAction.set(chat)) 
        console.log(currentChat);
         
       
    }

    function sendMessage(message:string){
        const messageObject:MessageType = {
            chatId:currentChat!.idChat,
            from:currentUser.username,
            type:"MESSAGES",
            to:[currentChat!.chatName],
            textMessage:message
        }
        chatRoomService.sendMessage(messageObject);
        console.log(messageObject);
        
    }

    return <Box sx={styleArea}>
                <Box sx={styleTitle}>
                    <Typography variant="h6">Welcome:{currentUser.username}</Typography>
                </Box>
            <Box sx={style}>
                <ChatsArea username={currentUser.username} chats={myChats} callbackSelect={selectChat} callbackRemove={removeChat}></ChatsArea>
                <MessageArea callbackSend={sendMessage} currentChat={currentChat} messages={messages}></MessageArea>
                <ContactsArea callback={createChat} contacts={allClients}></ContactsArea>
            </Box> 
        </Box>
}

export default ChatRoom;

function setCodeAlert(message: string, codeAlert: CodePayload) {
    if (message.includes('AUTHENTIFICATION ERROR')) {
        codeAlert.code = CodeType.AUTH_ERROR;
    } else {
        codeAlert.code = CodeType.SERVER_ERROR;
    }
}
