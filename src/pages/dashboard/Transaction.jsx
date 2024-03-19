import { Box } from '@mui/material';
import React from 'react';
import SideBar from './components/SideBar';
import DashBar from './components/DashBar';
import { DrawerProvider } from '../../context/DrawerContext';
import TransactionList from './components/TransactionList';

function Transaction() {
    return (
        <DrawerProvider>
            <DashBar />
            <Box sx={{ display: 'flex', flexGrow: 1, p: 3, mt: 5 }}>
                <SideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <TransactionList />
                </Box>
            </Box>
        </DrawerProvider>
    );
}

export default Transaction;
