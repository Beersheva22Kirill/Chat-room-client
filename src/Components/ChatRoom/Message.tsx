import { Box, Typography } from "@mui/material";
import { MessageType } from "../../Model/ChatsTypes/MessageType";
import { CSSProperties } from "react";

type Props = {
    message:MessageType;
}

const Message:React.FC<Props> = (props) => {

    const style:CSSProperties = {
        display:'flex',
        justifyContent: props.message.owner == 'user' ? 'right' : 'left',
        margin:1
    }

    return <Box sx={style}>
        <Box>
            <Typography variant="caption" >{props.message.text}</Typography>
        </Box>
        
    </Box>
}

export default Message;