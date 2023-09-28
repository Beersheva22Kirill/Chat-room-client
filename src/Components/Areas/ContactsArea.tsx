import { Box, List, Typography } from "@mui/material";
import { CSSProperties, ReactElement, ReactNode } from "react";
import Contact from "../ChatRoom/Contact";
import { ClientType } from "../../Model/Accounts/ClientType";
import { UserData } from "../../Model/Auth/UserData";
import { useSelectorUser } from "../../Redux/Store";

type Props = {
    contacts:ClientType[];
    callback:(userName:string) => void
}

const ContactsArea:React.FC<Props> = (props) => {
    
    const currentUser:UserData = useSelectorUser();

    const style:CSSProperties ={
        display:'flex',
        flexDirection:'column',    
        width:'20vw',
        height:'72vh',
        borderStyle:"groove",
        borderColor:'grey',
        backgroundColor: 'background.paper'
    }


    function getContacts(){
        return props.contacts.map(contact => {
            let client:ReactNode;
            if(currentUser.username != contact.username) {
                client = <Contact key={contact.username} callbackChat={props.callback} contact = {contact}></Contact>
            } else {
                client = <Box></Box>
            }
             
            return client
        }
        )
    }

    return <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <Typography variant = 'body1'>Contacts</Typography>
                <Box sx={style}>
                     <List>
                        {getContacts()}
                    </List>  
                </Box>
        </Box>
}

export default ContactsArea;