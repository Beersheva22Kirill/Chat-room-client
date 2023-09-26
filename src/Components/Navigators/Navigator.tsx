
import { AppBar, Box, Tab, Tabs } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import { ItemType } from '../../Model/Menu/ItemType';

const Navigator:React.FC<{navItem:ItemType[]}> = (nav) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [value,setValue] = useState(0);
    
    useEffect(() => {
        let index = nav.navItem.findIndex(r => r.to === location.pathname);
        if(index < 0){
          index = 0;
        }
        navigate(nav.navItem[index].to);
        setValue(index)
    },[nav])
   
    function onChangeFn (event: any, newValue: number) {
      setValue(newValue);
    }

    function getTabs() : ReactNode {
      return nav.navItem.map((item) => <Tab component = {Link} to = {item.to} label = {item.label} key={item.label}></Tab>)
    }
    
    return  <Box mt ={10}>
      <AppBar sx = {{backgroundColor:'lightgreen'}}>
          <Tabs value={value < nav.navItem.length ? value : 0} onChange={onChangeFn} aria-label="basic tabs example">
            {getTabs()}
          </Tabs>
      </AppBar>
      <Outlet></Outlet> 
    </Box>
}

export default Navigator;
