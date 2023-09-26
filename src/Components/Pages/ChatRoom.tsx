import { Box } from "@mui/material"
import { ChatsArea } from "../Areas/ChatsArea";
import { useSelectorUser } from "../../Redux/Store";
import { CSSProperties, useEffect, useState } from "react";
import MessageArea from "../Areas/MessageArea";
import ContactsArea from "../Areas/ContactsArea";
import { chatRoomService } from "../../Config/service-config";
import { ClientType } from "../../Model/Accounts/ClientType";
import { Subscription } from "rxjs";
import { CodePayload } from "../../Model/Alert/CodePayload";
import CodeType from "../../Model/Alert/CodeType";

const ChatRoom:React.FC = () => {

    const [activeContacts,setActiveContacts] = useState<string[]>(['']);
    const [allClients,setAllClients] = useState<ClientType[]>([]);

    const style:CSSProperties = {
        width:'100%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'

    }

    const currentUser = useSelectorUser();

    async function getActiveContacts (){
       return await chatRoomService.getActiveContacts();
        
    }

    async function getAllClients() {
        return await chatRoomService.getAllClients();
    }

    useEffect(() => {
        const  subscribtion:Subscription = chatRoomService.getClients().subscribe({
            next(clients:ClientType[] | string) {
                const codeAlert: CodePayload = {code:CodeType.OK,message:''}
                if(typeof clients != 'string'){
                    setAllClients(clients); 
                } 
            }
        })

        // getAllClients().then(data => {
        //     const clients = data;
        //     setAllClients(data)
        // });
    },[allClients])

    return <Box sx={style}>
            <ChatsArea username={currentUser} chats={['chat 1', 'chat 2']}></ChatsArea>
            <MessageArea messages={[{owner:'user', text:'message 1'}, {owner:'user 2', text:'message 2'}]}></MessageArea>
            <ContactsArea contacts={allClients}></ContactsArea>
        </Box> 
}

export default ChatRoom;