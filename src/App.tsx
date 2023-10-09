import React, { useMemo } from 'react';
import './App.css';
import { Alert, Box, Snackbar, Typography } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigatorDispather from './Components/Navigators/NavigatorDispather';
import { useSelectorCode, useSelectorCurrentChat, useSelectorUser } from './Redux/Store';
import { UserData } from './Model/Auth/UserData';
import { ItemType } from './Model/Menu/ItemType';
import navConfig from './Config/navConfig.json'
import SignIn from './Components/Pages/SignIn';
import ChatRoom from './Components/Pages/ChatRoom';
import Groups from './Components/Pages/Groups';
import Clients from './Components/Pages/Clients';
import SignOut from './Components/Pages/SignOut';
import { StatusType } from './Model/Alert/StatusType';
import { CodePayload } from './Model/Alert/CodePayload';
import CodeType from './Model/Alert/CodeType';
import { authService, chatRoomService } from './Config/service-config';
import { useDispatch } from 'react-redux';
import { userAction } from './Redux/Slice/AuthSlice';
import { codeAction } from './Redux/Slice/CodeSlice';

function getMenuItem(currentUser:UserData):ItemType[]{
  
    let res:ItemType[];
      if (currentUser.role === 'admin'){
        res = navConfig.items.filter(item => item.users.includes('admin'))
        res[res.length - 1].label = currentUser.username
      } else if (currentUser.role === 'authorized') {
        res = navConfig.items.filter(item => item.users.includes('authorized'))
        res[res.length - 1].label = currentUser.username
      } else {
        res = navConfig.items.filter(item => item.users.includes('unauthorized'))
      }
  return res
}

function App() {
  const currentUser:UserData = useSelectorUser();
  const codeMessage:CodePayload = useSelectorCode();
 

  const dispath = useDispatch()
  const menuItem = useMemo(() => getMenuItem(currentUser),[currentUser])
  const [alertMessage, severity] = useMemo(() => codeProcessing(),[codeMessage]);

  function codeProcessing() {
    const res:[string,StatusType] = ['','success']
    res[1] = codeMessage.code  === CodeType.OK ? 'success' : 'error'
    res[0] = codeMessage.message
    if (codeMessage.code === CodeType.AUTH_ERROR) {
        authService.logout()
        dispath(userAction.reset())
        chatRoomService.shutDownService()
   
    }
    setTimeout(() => {
      dispath(codeAction.reset())
    },5000)
    return res
  }

  return <Box>
    <Typography>App started</Typography>
      <BrowserRouter>
        <Routes>
          <Route path='/' element ={<NavigatorDispather navItem={menuItem}/>}>
              <Route path='ChatRoom' element = {<ChatRoom></ChatRoom>}></Route>
              <Route path='Groups' element = {<Groups></Groups>}></Route>
              <Route path='Clients' element = {<Clients></Clients>}></Route>
              <Route path='SignIn' element = {<SignIn></SignIn>}></Route>
              <Route path='SignOut' element = {<SignOut></SignOut>}></Route>
          </Route>
        </Routes>
        <Snackbar open = {!!alertMessage} 
                  autoHideDuration={20000}
                  onClose={() => dispath(codeAction.reset())}>
                    <Alert onClose={() => dispath(codeAction.reset())} severity = {severity}>{alertMessage}</Alert>
                  </Snackbar>
      </BrowserRouter>
      
  </Box>
}

export default App;
