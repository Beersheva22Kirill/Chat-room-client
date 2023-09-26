import { Box, Typography } from "@mui/material";
import { CSSProperties } from "react";

type Props = {
    contact:string;
    active:boolean;
    blocked:boolean;
}

const Contact:React.FC<Props> = (props) => {

    const style:CSSProperties = {
        marginLeft:2
    }

    const styleBox:CSSProperties = {
        marginLeft:1,
        width:'10px',
        height:'10px',
        backgroundColor:props.active ? !props.blocked ? 'green' :'red' : !props.blocked ? 'grey' : 'red',
        borderRadius:2  
    }

    return <Box sx = {{display:'flex',flexDirection:'row',alignItems:'center'}}>        
                <Typography sx={style}>{props.contact}</Typography>
                <Box sx = {styleBox}></Box>
            </Box>
} 

export default Contact;