import { Box, Button, TextField, Typography } from "@mui/material"
import Message from "../ChatRoom/Message"
import { CSSProperties } from "react"
import { MessageType } from "../../Model/ChatsTypes/MessageType"
import { useSelectorCurrentChat } from "../../Redux/Store"
import { ChatType } from "../../Model/ChatsTypes/ChatType"

type Props ={
    messages:MessageType[],
    currentChat:ChatType|null,
    callbackSend:(message:string) => void
}
const MessageArea:React.FC<Props> = (props) => {

    const currentChat:ChatType|null = useSelectorCurrentChat();

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

    return <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
    <Typography variant="body1">{`Messages: ${props.currentChat ? props.currentChat.chatName : "No selected chat"}`}</Typography>
        <Box sx={style}>
        {getMessages()}
    </Box>
    <Box component={'form'} sx={sendGroupStyle} onSubmit={onsubmit}>
        <TextField sx={{width:'88%',height:'5px'}} variant="outlined" size="small" name="message_field"></TextField>
        <Button disabled = {currentChat == null} type="submit" variant="contained" sx={{backgroundColor:'lightgreen',height:'39px',marginLeft:1}}>Send</Button>
    </Box>
    
    </Box>
}

export default MessageArea;