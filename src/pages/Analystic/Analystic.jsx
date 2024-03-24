import React, { useState, useEffect } from 'react';
import { Box, Grid, Stack, Card, CardContent } from '@mui/material';
import SideBar from '../dashboard/components/SideBar';
import DashBar from '../dashboard/components/DashBar';
import { DrawerProvider } from '../../context/DrawerContext';
import ChartPie from './components/ChartPie';
import ChartBar from './components/ChartBar';
import CircularProgress from '@mui/material/CircularProgress';

function Analystic() {
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
        <DrawerProvider>
            <DashBar />
            <Box sx={{ display: 'flex', flexGrow: 1, p: 3, mt: 5, backgroundColor: 'whitesmoke', height: '93vh' }}>
                <SideBar />
                {loading ? (
                    <Box sx={{ ml: 60, mt: 10 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <Grid container spacing={1}>
                            <Stack spacing={2} direction="row">
                                <Card sx={{ maxWidth: 645, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}> {/* Added boxShadow */}
                                    <CardContent>
                                        <ChartPie />
                                    </CardContent>
                                </Card>
                                <Card sx={{ minWidth: '43vw', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}> {/* Added boxShadow */}
                                    <CardContent>
                                        <ChartBar />
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Grid>
                    </Box>
                )}
            </Box>
        </DrawerProvider>
    );
}

export default Analystic;
