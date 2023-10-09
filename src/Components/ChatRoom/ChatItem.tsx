import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material"
import { Chat } from "../../Model/ChatsTypes/Chat"
import { DeleteForeverSharp, DeleteSweep, DeleteSweepSharp, RemoveCircle, RemoveDone } from "@mui/icons-material"
import { useState } from "react"

type Props ={
    chat:Chat,
    callback:(id:string) => void
    callbackSelect:(chat:Chat) => void
}
const ChatItem:React.FC<Props> = (props) => {
    const [color, setColor] = useState<string>('grey')

    return <ListItem key={props.chat.idChat} disablePadding>
            <ListItemButton sx={{width:'15vw'}} onClick={() => props.callbackSelect(props.chat)}>
                <ListItemText primary={props.chat.chatName} />
            </ListItemButton>
            <Box onClick = {() => props.callback(props.chat.idChat)} 
                onMouseDown = {() => setColor("grey")} 
                onMouseUp= {() => setColor("Black")} 
                onMouseMove={() => setColor('black')} 
                onMouseOut={() => setColor("grey")}>
                <DeleteForeverSharp htmlColor={color}></DeleteForeverSharp>
            </Box>
            
        </ListItem>
}

export default ChatItem