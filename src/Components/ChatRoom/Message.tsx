import { Box, Typography } from "@mui/material";
import { MessageType } from "../../Model/ChatsTypes/MessageType";
import { CSSProperties } from "react";
import { useSelectorUser } from "../../Redux/Store";
import { UserData } from "../../Model/Auth/UserData";

type Props = {
    message:MessageType;
}

const Message:React.FC<Props> = (props) => {

    const currentUser:UserData = useSelectorUser()

    const style:CSSProperties = {
        display:'flex',
        flexDirection:'column',
        margin:1,
        marginLeft:2,
        marginRight:2,
        backgroundColor: props.message.from == currentUser.username ? 'lightgreen' : 'lightgrey',
        paddingLeft:2,
        paddingRight:2,
        paddingTop:0.3,
        paddingBottom:0.3,
        borderRadius:2.5
    }

    const mainStyle:CSSProperties = {
        width:'100%',
        display:'flex',
        justifyContent: props.message.from == currentUser.username ? 'right' : 'left'
    }

    function getDate(date:string){
          
        return new Date(Number.parseInt(date)).toLocaleTimeString();
    }

    return <Box sx={mainStyle}>
        <Box sx={style}>
        <Typography variant="caption">{props.message.from}</Typography>
            <Typography variant="caption" sx={{fontWeight:'bold',fontStyle:'italic'}}>{props.message.textMessage}</Typography>
            <Typography variant="caption" sx={{fontSize:"0.6em"}}>{getDate(props.message.date)}</Typography>
        </Box>
        
    </Box>
}

export default Message;