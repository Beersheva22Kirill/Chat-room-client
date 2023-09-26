import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { CSSProperties } from "react"

type Props = {
    username:string,
    chats:string[]
}

export const ChatsArea:React.FC<Props> = (props) => {

  const style:CSSProperties = {
    display:'flex',
    flexDirection:'row',    
    width:'20vw',
    height:'80vh',
    borderStyle:"groove",
    borderColor:'grey',
    backgroundColor: 'background.paper'
}


    function getChats(){
        return props.chats.map(chat => 
            <ListItem key={chat} disablePadding>
              <ListItemButton sx={{width:'20vw'}}>
                <ListItemText primary={chat} />
              </ListItemButton>
            </ListItem>
        )
    } 

    //{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }

    return <Box sx={style}>
    <nav aria-label="secondary mailbox folders">
      <List>
        {getChats()}
      </List>
    </nav>
  </Box>

}