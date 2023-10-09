import { Box, Button, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import { ClientType } from "../../Model/Accounts/ClientType";
import { ReactNode, useState } from "react";
import Contact from "../ChatRoom/Contact";
import { UserData } from "../../Model/Auth/UserData";
import { useSelectorUser } from "../../Redux/Store";
import GroupeContact from "../ChatRoom/GroupeContact";
import { Chat } from "../../Model/ChatsTypes/Chat";
import { NewGroupe } from "../../Model/ChatsTypes/NewGroupe";
import { log } from "console";

type Props = {
    contacts:ClientType[],
    callBack:(groupe:NewGroupe) => void
}

const GroupeForm:React.FC<Props> = (props) => {

    const [users,setUsers] = useState<string[]>([])

    const currentUser:UserData = useSelectorUser()

    function callBackUsers(username:string,checked:boolean){
        let usersArray:string[] = users;
        if(checked){
            usersArray.push(username);
        } else {
            const index = usersArray.indexOf(username);
            usersArray.splice(index,1);
        }
        setUsers(usersArray)
    }

    function getContacts(){
        return props.contacts.map(contact => {
            let client:ReactNode;
            if(currentUser.username != contact.username) {
                client = <GroupeContact key={contact.username} contact = {contact}></GroupeContact>
            } else {
                client = <Box></Box>
            }
             
            return client
        }
        )
    }

    function onSubmit(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const usersArray:string[] = props.contacts.map(contact => contact.username);
        let usersGroupe:string[] = usersArray.filter(user => form.get(user))
        usersGroupe.push(currentUser.username)
        let groupeObject:NewGroupe = {
            groupName:`${form.get('nameGroupe')}`,
            author:currentUser.username,
            type:"GROUPE",
            users: usersGroupe
        }
        console.log(groupeObject);
        props.callBack(groupeObject)
    }

     return <Box component='form' onSubmit={onSubmit}>
        <Box>
            <TextField sx={{width:'100%'}} name="nameGroupe"></TextField>
        </Box>
        <FormGroup>
            {getContacts()}
        </FormGroup>
       <Box>
        <Button sx={{backgroundColor:'lightgreen'}} variant="contained" type="submit">Create groupe</Button>
       </Box>
     </Box>
}

export default GroupeForm;