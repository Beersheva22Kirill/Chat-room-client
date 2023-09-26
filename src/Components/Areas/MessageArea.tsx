import { Box } from "@mui/material"
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
        height:'80vh',
        borderStyle:"groove",
        borderColor:'grey',
        backgroundColor: 'background.paper'
    }

    function getMessages(){
        return props.messages.map((message) => {
            return <Message key={message.text} message={message}></Message>
        })
    }

    return <Box sx={style}>
        {getMessages()}
    </Box>
}

export default MessageArea;