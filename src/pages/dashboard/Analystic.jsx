import React from 'react';
import { Box, Grid, Stack, Card, CardContent } from '@mui/material';
import SideBar from './components/SideBar';
import DashBar from './components/DashBar';
import { DrawerProvider } from '../../context/DrawerContext';
import ChartPie from './components/ChartPie';
import ChartBar from './components/ChartBar';

function Analystic() {
    return (
        <DrawerProvider>
            <DashBar />
            <Box sx={{ display: 'flex', flexGrow: 1, p: 3, mt:5 }}>
                <SideBar />
                <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={2} >
                        <Stack spacing={2} direction='row'>
                            <Card sx={{ maxWidth: 645 }}>
                                <CardContent>
                                    <ChartPie/>
                                </CardContent>
                            </Card>
                            <Card sx={{ maxWidth:'auto' }}>
                                <CardContent>
                                    <ChartBar/>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Box>
            </Box>
        </DrawerProvider>
    );
}

export default Analystic;