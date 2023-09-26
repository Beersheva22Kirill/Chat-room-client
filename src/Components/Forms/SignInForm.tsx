import { Copyright } from "@mui/icons-material";
import { Avatar, Box, Button, Container, CssBaseline, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { LoginData } from "../../Model/Auth/LoginData";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

type Props = {
    callback:(user:LoginData) => Promise<void>
}
const SignInForm:React.FC<Props> = (props) => {
   
    const defaultTheme = createTheme();
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const loginData:LoginData = {
            username: `${data.get('username')}`,
            password: `${data.get('password')}`
        }
        props.callback(loginData);
      };
  
      return (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor:'lightgreen', color:'black'}}
                >
                  Sign In
                </Button>
              </Box>
              <Button
                  onClick={() => props.callback({username: 'GOOGLE',password: ''})}
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  Google sign In
                </Button>
            </Box>
          </Container>
        </ThemeProvider>
      );
    }

    export default SignInForm;