import React, { useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, Typography } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigatorDispather from './Components/Navigators/NavigatorDispather';
import { useSelectorUser } from './Redux/Store';
import { UserData } from './Model/Auth/UserData';
import { ItemType } from './Model/Menu/ItemType';
import navConfig from './Config/navConfig.json'
import SignIn from './Components/Pages/SignIn';
import ChatRoom from './Components/Pages/ChatRoom';
import Groups from './Components/Pages/Groups';
import Clients from './Components/Pages/Clients';
import SignOut from './Components/Pages/SignOut';

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
  const menuItem = useMemo(() => getMenuItem(currentUser),[currentUser])

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
      </BrowserRouter>
  </Box>
}

export default App;
