import { Image, ModeCommentOutlined } from "@mui/icons-material";
import { Box, Button, Checkbox, FormControlLabel, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";
import { ClientType } from "../../Model/Accounts/ClientType";
import { useSelectorChats, useSelectorUser } from "../../Redux/Store";
import { log } from "console";
import { UserData } from "../../Model/Auth/UserData";
import { Chat } from "../../Model/ChatsTypes/Chat";


type Props = {
    contact:ClientType;
}

const GroupeContact:React.FC<Props> = (props) => {
    
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

    return      <Box sx = {{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'left', minWidth: '50%'}}>
                    <FormControlLabel control={<Checkbox name = {props.contact.username} />} label={props.contact.username} />
                    <Box sx = {styleBox}></Box>
                </Box> 
                
} 

export default GroupeContact;