import { Image } from "@mui/icons-material";
import { Box, Button, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";
import { ClientType } from "../../Model/Accounts/ClientType";
import { useSelectorChats, useSelectorUser } from "../../Redux/Store";
import { log } from "console";
import { UserData } from "../../Model/Auth/UserData";
import { ChatType } from "../../Model/ChatsTypes/ChatType";


type Props = {
    contact:ClientType;
    callbackChat:(userName:string) => void;
}

const Contact:React.FC<Props> = (props) => {

const [disabled,setDisabled] = useState<boolean>(false);
const myChats:ChatType[] = useSelectorChats();


    const style:CSSProperties = {
        marginLeft:2
    }

    const styleBox:CSSProperties = {
        marginLeft:1,
        width:'10px',
        height:'10px',
        backgroundColor:props.contact.active ? !props.contact.blocked ? 'green' :'red' : !props.contact.blocked ? 'grey' : 'red',
        borderRadius:2  
    }

    const onClick = () => {
        props.callbackChat(props.contact.username);
    }

    useEffect(() => {
        const chatsNames:string[] = myChats.map(chat => chat.chatName);        
        setDisabled(chatsNames.includes(props.contact.username))
    },[myChats])
        
 

    return <ListItem sx = {{display:'flex',flexDirection:'row',alignItems:'center'}} key={props.contact.username} disablePadding>
                <Box sx = {{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <ListItemText sx = {style} primary={props.contact.username} />
                    <Box sx = {styleBox}></Box>
                </Box> 
                <Box sx={{marginLeft:2}}>
                    <Button disabled = {disabled} onClick={onClick} variant="text">Begin chat</Button>
                </Box>
            </ListItem>              
} 

export default Contact;