import { Box, Typography, createTheme, useMediaQuery, useTheme } from "@mui/material"
import { ChatsArea } from "../Areas/ChatsArea";
import { useSelectorCurrentMessages, useSelectorUser } from "../../Redux/Store";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import MessageArea from "../Areas/MessageArea";
import ContactsArea from "../Areas/ContactsArea";
import { chatRoomService } from "../../Config/service-config";
import { ClientType } from "../../Model/Accounts/ClientType";
import { Subscription } from "rxjs";
import { CodePayload } from "../../Model/Alert/CodePayload";
import CodeType from "../../Model/Alert/CodeType";
import { Chat } from "../../Model/ChatsTypes/Chat";
import { useDispatch } from "react-redux";
import { codeAction } from "../../Redux/Slice/CodeSlice";
import { NewChat } from "../../Model/ChatsTypes/NewChat";
import { UserData } from "../../Model/Auth/UserData";
import { RemoveChatType } from "../../Model/ChatsTypes/RemoveChatType";
import { MessageType } from "../../Model/ChatsTypes/MessageType";
import { messagesAction } from "../../Redux/Slice/MessagesSlice";
import { chatsAction } from "../../Redux/Slice/ChatSlice";
import { NewGroupe } from "../../Model/ChatsTypes/NewGroupe";
import { UserType } from "../../Model/ChatsTypes/UserType";

const ChatRoom:React.FC = () => {

    const [allClients,setAllClients] = useState<ClientType[]>([]);
    const [allChats, setAllChats] = useState<Chat[]>([])
    const [currentChat, setCurrentChat] = useState<Chat|null>(null)
    const [visibleMessageArea,setVisibleMessageArea] = useState<boolean>(true)
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
        justifyContent:'start'
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
            next(chats:Chat[]|string) {
                const codeAlert: CodePayload = {code:CodeType.OK,message:''}
                if (typeof chats != 'string') {    
                    setAllChats(chats) 
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
            next(chat:Chat | string) {
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
            type:"CHAT",
            users:[currentUser.username,userName]
        }
        await chatRoomService.createChat(newChat)  
    }

    async function createGroupe(groupe:NewGroupe):Promise<void>{
        await chatRoomService.createGroupe(groupe)  
       
    } 

    async function removeChat(chatId:string):Promise<void> {
        const removedChat:RemoveChatType = {
            user:[currentUser.username],
            chatId:chatId
        }

        if (currentChat?.idChat === removedChat.chatId) {
            setCurrentChat(null)
            chatRoomService.clearChacheMessage()
         }

        await chatRoomService.removeChat(removedChat); 
        
        
    }

    function selectChat(chat:Chat) {
        setCurrentChat(chat)  
    }

    function sendMessage(message:string){
        const allUsers:UserType[] = currentChat!.users.filter(user => user.active == true)
        const usersFromSend = allUsers.map(user => user.username);
        const messageObject:MessageType = {
            chatId:currentChat!.idChat,
            from:currentUser.username,
            date: Date.now().toString(),
            type:`${currentChat!.type} MESSAGES`,
            to:usersFromSend,
            textMessage:message
        }
        chatRoomService.sendMessage(messageObject);        
    }

    return <Box sx={styleArea}>
                
            <Box sx={style}>
                <ChatsArea username={currentUser.username} chats={allChats} callbackSelect={selectChat} callbackRemove={removeChat}></ChatsArea>
                <MessageArea visible = {visibleMessageArea} callbackSend={sendMessage} currentChat={currentChat} messages={messages}></MessageArea>
                <ContactsArea callBackGroupe={createGroupe} callback={createChat} contacts={allClients}></ContactsArea>
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
