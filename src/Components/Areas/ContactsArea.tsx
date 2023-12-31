import { Box, Button, List, Typography } from "@mui/material";
import { CSSProperties, ReactElement, ReactNode, useState } from "react";
import Contact from "../ChatRoom/Contact";
import { ClientType } from "../../Model/Accounts/ClientType";
import { UserData } from "../../Model/Auth/UserData";
import { useSelectorUser } from "../../Redux/Store";
import ModalWindow from "../Common/ModalWindow";
import GroupeForm from "../Forms/GroupeForm";
import { NewGroupe } from "../../Model/ChatsTypes/NewGroupe";

type Props = {
    contacts:ClientType[];
    callback:(userName:string) => void,
    callBackGroupe:(groupe:NewGroupe) => void
}

const ContactsArea:React.FC<Props> = (props) => {
    const [modalActive,setModalActive] = useState<boolean>(false)
    
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

    function createGroupe(groupe:NewGroupe){
        setModalActive(false);
        props.callBackGroupe(groupe)
    }

    return <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <ModalWindow active = {modalActive} element = {<GroupeForm callBack={createGroupe} contacts={props.contacts}></GroupeForm>} setActive={setModalActive}></ModalWindow>
        <Button onClick={() => setModalActive(true)} variant="contained" sx={{width:'100%',backgroundColor:'lightgreen'}}>Create group</Button>
        <Typography variant = 'body1'>Contacts</Typography>
                <Box sx={style}>
                     <List>
                        {getContacts()}
                    </List>  
                </Box>
        </Box>
}

export default ContactsArea;