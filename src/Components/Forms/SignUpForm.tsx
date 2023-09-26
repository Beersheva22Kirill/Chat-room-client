import { Box, Button, TextField } from "@mui/material"
import { AccountData } from "../../Model/Auth/AccountData";
import { useState } from "react";

type Props = {
    callback:(account:AccountData) => void
}

const SignUpForm:React.FC<Props>= (props) => {

    const [errorColor,setErrorColor] = useState(false)

    const  handlerSignUp = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const pass1 = `${data.get('password')}`
        const pass2 = `${data.get('passwordRep')}`
        if(pass1 === pass2){
            const account:AccountData = {
                username: `${data.get('username')}`,
                password: `${data.get('password')}`,
                roles:["USER"]
            }
            props.callback(account)
        } else {
            setErrorColor(true)

        }
        
    }

    return <Box>
        <Box component="form" onSubmit={handlerSignUp} noValidate sx={{ mt: 1 }}>
        <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="User name"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  onChange={() => setErrorColor(false)}
                  error = {errorColor}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                /> 
                <TextField
                  onChange={() => setErrorColor(false)}
                  error = {errorColor}
                  margin="normal"
                  required
                  fullWidth
                  name="passwordRep"
                  label="Repeat password"
                  type="password"
                  id="passwordRep"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor:'lightgreen', color:'black'}}
                >
                  Registration
                </Button>             
        </Box>
    </Box>
}

export default SignUpForm;