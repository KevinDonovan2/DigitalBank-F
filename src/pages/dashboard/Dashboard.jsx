import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Stack } from '@mui/material';
import SideBar from './components/SideBar';
import DashBar from './components/DashBar';
import { DrawerProvider } from '../../context/DrawerContext';

function Dashboard() {
    return (
        <DrawerProvider>
            <DashBar />
            <Box sx={{ display: 'flex', flexGrow: 1, p: 2, mt: 5 }}>
                <SideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Stack spacing={2} direction="row">
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                      Lizard
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                      Lizard
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack spacing={2}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                      Lizard
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                      Lizard
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </DrawerProvider>
    );
}

export default Dashboard;
