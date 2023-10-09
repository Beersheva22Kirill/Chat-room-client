import { Box, Button, TextField, Typography } from "@mui/material"
import Message from "../ChatRoom/Message"
import { CSSProperties } from "react"
import { MessageType } from "../../Model/ChatsTypes/MessageType"
import { useSelectorCurrentChat, useSelectorUser } from "../../Redux/Store"
import { Chat } from "../../Model/ChatsTypes/Chat"
import { UserData } from "../../Model/Auth/UserData"

type Props ={
    visible:boolean,
    messages:MessageType[],
    currentChat:Chat|null,
    callbackSend:(message:string) => void
}
const MessageArea:React.FC<Props> = (props) => {

    const currentUser:UserData = useSelectorUser();

    const style:CSSProperties = {
        marginLeft:3,
        marginRight:3,
        display:'flex',
        flexDirection:'column',
        minWidth:'40vw',
        height:'65vh',
        borderStyle:"groove",
        borderColor:'grey',
        backgroundColor: 'background.paper',
        overflowY:'auto',
        scrollMarginTop:3
    }

    const sendGroupStyle:CSSProperties = {
        display:'flex',
        alignItems:'flex-start',
        justifyContent:'center',
        minWidth:'40vw',
        height:'5px',
        marginTop:1
    }

    const styleTitle:CSSProperties = {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        marginTop:0.6
    }

    function getMessages(){
        return props.messages.map((message,index) => {
            return <Message key={index} message={message}></Message>
        })
    }

    const onsubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        props.callbackSend(`${formData.get('message_field')}`);
    }

    return <Box>
        {props.visible && 
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Box sx={styleTitle}>
                    <Typography variant="h6">Welcome:{currentUser.username}</Typography>
            </Box>
            <Typography variant="body1">{`Messages: ${props.currentChat ? props.currentChat.chatName : "No selected chat"}`}</Typography>
             <Box sx={style}>
                {getMessages()}
            </Box>
            <Box component={'form'} sx={sendGroupStyle} onSubmit={onsubmit}>
                <TextField sx={{width:'88%',height:'5px'}} variant="outlined" size="small" name="message_field"></TextField>
                <Button disabled = {props.currentChat == null} type="submit" variant="contained" sx={{backgroundColor:'lightgreen',height:'39px',marginLeft:1}}>Send</Button>
            </Box>
        </Box>}
    </Box>
}

export default MessageArea;