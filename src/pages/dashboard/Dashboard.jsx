import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Stack } from '@mui/material';
import SideBar from './components/SideBar';
import DashBar from './components/DashBar';
import CircularProgress from '@mui/material/CircularProgress'; 
import { DrawerProvider } from '../../context/DrawerContext';
import axios from 'axios';

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/accounts');
                setData(response.data);
                setLoading(false); 
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        loadData();
        return () => {};
    }, []);

    const calculateTotalLoans = () => {
        if (data && data.length > 0) {
            return data.reduce((acc, curr) => acc + curr.loans, 0);
        }
        return 0;
    };

    const calculateTotalMainBalance = () => {
        if (data && data.length > 0) {
            return data.reduce((acc, curr) => acc + curr.mainBalance, 0);
        }
        return 0;
    };

    const calculateTotalInterestOnLoans = () => {
        if (data && data.length > 0) {
            return data.reduce((acc, curr) => acc + curr.interestOnLoans, 0);
        }
        return 0;
    };

    return (
        <DrawerProvider>
            <DashBar />
            <Box sx={{ display: 'flex', flexGrow: 1, p: 2, mt: 5, backgroundColor: 'whitesmoke', height: '93vh' }}>
                <SideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            {loading ? (
                                <Box sx={{ml:60,mt:10 }}>
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <Stack spacing={2} direction="row">
                                    <Card sx={{ minWidth: 345 }}>
                                        <CardContent >
                                            <Typography variant="body2" color="text.secondary">
                                                Main Balance:
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div">
                                                ${calculateTotalMainBalance()}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Card sx={{ minWidth: 345 }}>
                                        <CardContent >
                                            <Typography variant="body2" color="text.secondary">
                                                Total Loans:
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div">
                                                ${calculateTotalLoans()}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Card sx={{ minWidth: 345 }}>
                                        <CardContent >
                                            <Typography variant="body2" color="text.secondary">
                                                Interest on Loans:
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div">
                                                ${calculateTotalInterestOnLoans()}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Stack>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </DrawerProvider>
    );
}

export default Dashboard;
