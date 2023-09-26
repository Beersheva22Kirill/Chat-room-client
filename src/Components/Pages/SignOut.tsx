import { Box, Button, Typography } from "@mui/material"
import { authService, chatRoomService } from "../../Config/service-config";
import { useDispatch } from "react-redux";
import { userAction } from "../../Redux/Slice/AuthSlice";

const SignOut:React.FC = () => {
const dispatch = useDispatch()

    const signOut = () => {
         authService.logout();
         dispatch(userAction.reset())
         chatRoomService.disconectWebSocket()
    }

    return <Box>
            <Button
            onClick={signOut} 
            variant="contained" 
            sx={{ mt: 3, mb: 2, color:'lightgreen'}}>
             Confirm sign out   
            </Button>
    </Box>
}

export default SignOut;