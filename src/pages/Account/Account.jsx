import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SideBar from '../dashboard/components/SideBar';
import DashBar from '../dashboard/components/DashBar';
import { DrawerProvider } from '../../context/DrawerContext';
import AccountList from './components/AccountList';
import CircularProgress from '@mui/material/CircularProgress';

function Transaction() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setLoading(false);
        };
        loadData();
        return () => { };
    }, []);

    return (
        <DrawerProvider >
            <DashBar />
            <Box sx={{ display: 'flex', flexGrow: 1, p: 3, mt: 5, backgroundColor: 'whitesmoke', height: '93vh' }}>
                <SideBar />
                {loading ? (
                    <Box sx={{ ml: 60, mt: 10 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <AccountList />
                    </Box>
                )}
            </Box>
        </DrawerProvider>
    );
}

export default Transaction;
