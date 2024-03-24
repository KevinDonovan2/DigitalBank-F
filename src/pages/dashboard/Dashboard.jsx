import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Stack } from '@mui/material';
import SideBar from './components/SideBar';
import DashBar from './components/DashBar';
import CircularProgress from '@mui/material/CircularProgress'; 
import { DrawerProvider } from '../../context/DrawerContext';

function Dashboard() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setLoading(false); 
        };
        loadData();
        return () => {};
    }, []);

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
                                                Sold principal:
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div">
                                                $2000
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Card sx={{ minWidth: 345 }}>
                                        <CardContent >
                                            <Typography variant="body2" color="text.secondary">
                                                Pret:
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div">
                                                $2000
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Card sx={{ minWidth: 345 }}>
                                        <CardContent >
                                            <Typography variant="body2" color="text.secondary">
                                                Intérêts des prêts:
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="div">
                                                $2000
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
