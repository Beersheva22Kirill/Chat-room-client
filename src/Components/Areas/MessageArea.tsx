import { Box, Button, TextField, Typography } from "@mui/material"
import Message from "../ChatRoom/Message"
import { CSSProperties } from "react"
import { MessageType } from "../../Model/ChatsTypes/MessageType"

type Props ={
    messages:MessageType[]
}
const MessageArea:React.FC<Props> = (props) => {

    const style:CSSProperties = {
        marginLeft:3,
        marginRight:3,
        display:'flex',
        flexDirection:'column',
        minWidth:'40vw',
        height:'65vh',
        borderStyle:"groove",
        borderColor:'grey',
        backgroundColor: 'background.paper'
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
        return props.messages.map((message) => {
            return <Message key={message.text} message={message}></Message>
        })
    }

    return <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <Typography variant="body1">Messages</Typography>
        <Box sx={style}>
        {getMessages()}
    </Box>
    <Box sx={sendGroupStyle}>
        <TextField sx={{width:'88%',height:'5px'}} variant="outlined" size="small" ></TextField>
        <Button variant="contained" sx={{backgroundColor:'lightgreen',height:'39px',marginLeft:1}}>Send</Button>
    </Box>
    
    </Box>
}

export default MessageArea;