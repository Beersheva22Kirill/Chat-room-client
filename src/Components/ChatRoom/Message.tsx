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
        justifyContent: props.message.from == currentUser.username ? 'right' : 'left',
        margin:1
    }

    return <Box sx={style}>
        <Box>
            <Typography variant="caption" >{props.message.textMessage}</Typography>
        </Box>
        
    </Box>
}

export default Message;