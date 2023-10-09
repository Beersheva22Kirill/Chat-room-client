import { Image, ModeCommentOutlined } from "@mui/icons-material";
import { Box, Button, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";
import { ClientType } from "../../Model/Accounts/ClientType";
import { useSelectorChats, useSelectorUser } from "../../Redux/Store";
import { log } from "console";
import { UserData } from "../../Model/Auth/UserData";
import { Chat } from "../../Model/ChatsTypes/Chat";


type Props = {
    contact:ClientType;
    callbackChat:(userName:string) => void;
}

const Contact:React.FC<Props> = (props) => {
    
const [color, setColor] = useState<string>('grey')
const [disabled,setDisabled] = useState<boolean>(false);
const myChats:Chat[] = useSelectorChats();


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
        
 

    return <ListItem sx = {{display:'flex',flexDirection:'row'}} key={props.contact.username} disablePadding>
                <Box sx = {{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'left', minWidth: '50%'}}>
                    <Box sx = {styleBox}></Box>
                    <ListItemText sx = {style} primary={props.contact.username} />
                </Box> 
                <Box onClick = {onClick} 
                onMouseDown = {() => setColor("grey")} 
                onMouseUp= {() => setColor("Black")} 
                onMouseMove={() => setColor('black')} 
                onMouseOut={() => setColor("grey")}>
                <ModeCommentOutlined htmlColor={color}></ModeCommentOutlined>
                </Box>
             </ListItem>              
} 

export default Contact;