import { Box } from "@mui/material";
import { CSSProperties } from "react";
import Contact from "../ChatRoom/Contact";
import { ClientType } from "../../Model/Accounts/ClientType";

type Props = {
    contacts:ClientType[];
}

const ContactsArea:React.FC<Props> = (props) => {
    const style:CSSProperties ={
        display:'flex',
        flexDirection:'column',    
        width:'20vw',
        height:'80vh',
        borderStyle:"groove",
        borderColor:'grey',
        backgroundColor: 'background.paper'
    }


    function getContacts(){
        return props.contacts.map(contact => <Contact key={contact.username} active={contact.active} blocked = {contact.blocked} contact= {contact.username}></Contact>)
    }

    return <Box sx={style}>
        {getContacts()}
    </Box>
}

export default ContactsArea;