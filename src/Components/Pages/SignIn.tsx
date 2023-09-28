import { Box, Button, Typography } from "@mui/material"
import SignInForm from "../Forms/SignInForm";
import { LoginData } from "../../Model/Auth/LoginData";
import { useDispatch } from "react-redux";
import { authService, chatRoomService } from "../../Config/service-config";
import { CodePayload } from "../../Model/Alert/CodePayload";
import CodeType from "../../Model/Alert/CodeType";
import { UserData } from "../../Model/Auth/UserData";
import { useActionData } from "react-router-dom";
import { userAction } from "../../Redux/Slice/AuthSlice";
import ModalWindow from "../Common/ModalWindow";
import { CSSProperties, useState } from "react";
import SignUpForm from "../Forms/SignUpForm";
import { AccountData } from "../../Model/Auth/AccountData";
import { codeAction } from "../../Redux/Slice/CodeSlice";

const SignIn:React.FC = () => {
    const [activeSignUp, setActiveSignUp] = useState<boolean>(false)
    const dispatch = useDispatch<any>()

    const styleMain:CSSProperties = {
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }

    const styleSignUp:CSSProperties = {
        width:'80vw',
        display:'flex',
        flexDirection:'column',
        alignItems:'end'
    }

    async function login(user:LoginData):Promise<void>{
        const alertMessage:CodePayload = {code: CodeType.OK, message:''}
        const userAuth:UserData|null = await authService.login(user);
        if(userAuth){
            dispatch(userAction.set(userAuth));
            alertMessage.message = 'Authentification success'
        } else {
            alertMessage.code = CodeType.AUTH_ERROR;
            alertMessage.message = 'Accsess dinied'
        }
        dispatch(codeAction.set(alertMessage)) 
    }

    async function callBackSignUp(account:AccountData):Promise<void> {
        const alertMessage:CodePayload = {code: CodeType.OK, message:''}
        const newAccount:AccountData|null = await authService.signUp(account);
        if(newAccount){
            login({username:newAccount.username,password:newAccount.password})
        }else{
            alertMessage.code = CodeType.AUTH_ERROR;
            alertMessage.message = 'New user not added'
        }
    }

    const openSignUp = () => {
        setActiveSignUp(true);
    }

    return <Box sx = {styleMain}>
        <Box sx={styleSignUp}>
            <Button sx={{backgroundColor:'lightgreen', color:'black'}} variant="contained" onClick={openSignUp}>SignUp</Button>
        </Box>
       <ModalWindow active = {activeSignUp} element = {<SignUpForm callback={callBackSignUp}></SignUpForm>} setActive={setActiveSignUp}></ModalWindow>
       <SignInForm callback={login}></SignInForm>
       
       
    </Box>
}

export default SignIn;