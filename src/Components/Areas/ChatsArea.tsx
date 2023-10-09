import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { CSSProperties } from "react"
import { Chat } from "../../Model/ChatsTypes/Chat"
import ChatItem from "../ChatRoom/ChatItem"

type Props = {
    username:string,
    chats:Chat[],
    callbackRemove:(id:string) => void
    callbackSelect:(chat:Chat) => void
}

export const ChatsArea:React.FC<Props> = (props) => {

  const style:CSSProperties = {
    display:'flex',
    flexDirection:'row',    
    width:'20vw',
    height:'72vh',
    borderStyle:"groove",
    borderColor:'grey',
    backgroundColor: 'background.paper',
   
}


    function getChats(){
        return props.chats.map(chat => <ChatItem key={chat.idChat} chat={chat} callbackSelect={props.callbackSelect} callback={props.callbackRemove}></ChatItem>)
    } 

    return <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:4.4}}>
      <Typography variant="body1"> My chats</Typography>
             <Box sx={style}>
              <List>
                {getChats()}
              </List>
            </Box>
          </Box>
    

}