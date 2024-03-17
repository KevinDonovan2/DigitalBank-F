import { Box } from '@mui/material';
import React from 'react';
import SideBar from './components/SideBar';
import DashBar from './components/DashBar';
import { DrawerProvider } from '../../context/DrawerContext';

function Account() {
    return (
        <DrawerProvider>
            <DashBar />
            <Box sx={{ display: 'flex', flexGrow: 1, p: 3, mt:5 }}>
                <SideBar />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h1>Setting</h1>
                </div>
            </Box>
        </DrawerProvider>
    );
}

export default Account;