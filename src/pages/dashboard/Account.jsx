import { Box } from '@mui/material';
import React from 'react';
import SideBar from './components/SideBar';
import DashBar from './components/DashBar';
import { DrawerProvider } from '../../context/DrawerContext';
import AccountList from './components/AccountList';

function Transaction() {
    return (
        <DrawerProvider >
            <DashBar />
            <Box sx={{ display: 'flex', flexGrow: 1, p: 3, mt: 5 ,backgroundColor:'whitesmoke' ,height: '93vh' }}>
                <SideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <AccountList />
                </Box>
            </Box>
        </DrawerProvider>
    );
}

export default Transaction;
