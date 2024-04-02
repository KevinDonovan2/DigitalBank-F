import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography,Divider, Stack, Table, TableBody, TableCell, TableHead, TableContainer, TableRow, Paper } from '@mui/material';
import SideBar from './components/SideBar';
import DashBar from './components/DashBar';
import CircularProgress from '@mui/material/CircularProgress';
import { DrawerProvider } from '../../context/DrawerContext';
import ChartPie from '../Analystic/components/ChartPie';
import axios from 'axios';

const columns = [
    { id: 'customerName', label: 'Customer Name', minWidth: 100 },
    { id: 'mainBalance', label: 'Main Balance', minWidth: 100 },
];

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [accounts, setAccounts] = useState([]);
    const [data, setData] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/accounts');
                setData(response.data);
                setAccounts(response.data); // Assuming the response data is an array of accounts
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        loadData();
        return () => { };
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
            <Box sx={{ display: 'flex', flexGrow: 1, p: 2, mt: 5, backgroundColor: 'whitesmoke', height: '100vh' }}>
                <SideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            {loading ? (
                                <Box sx={{ ml: 60, mt: 10 }}>
                                    <CircularProgress />
                                </Box>
                            ) : (
                                <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', gap: 2, minWidth: 1050 }}>
                                    <Stack spacing={2} direction="row">
                                        <Card sx={{ width: '100%' }}>
                                            <CardContent >
                                                <Typography variant="body2" color="text.secondary">
                                                    Main Balance:
                                                </Typography>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {calculateTotalMainBalance()}ar
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card sx={{ width: '100%' }}>
                                            <CardContent >
                                                <Typography variant="body2" color="text.secondary">
                                                    Total Loans:
                                                </Typography>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {calculateTotalLoans()}ar
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                        <Card sx={{ width: '100%' }}>
                                            <CardContent >
                                                <Typography variant="body2" color="text.secondary">
                                                    Interest on Loans:
                                                </Typography>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {calculateTotalInterestOnLoans()}%
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Stack>
                                    <Stack spacing={2} direction="row">
                                        <Card sx={{ width: '100%' }}>
                                            <ChartPie />
                                        </Card>
                                        <Paper sx={{ width: '100%' }}>
                                            <Typography gutterBottom variant='h5' component='div' sx={{ mt: '20px', ml: '20px' }} >
                                                Accounts List
                                            </Typography>
                                            <Divider />
                                            <TableContainer >
                                                <Table>
                                                    <TableHead variant="body2">
                                                        <TableRow>
                                                            {columns.map((column) => (
                                                                <TableCell
                                                                    key={column.id}
                                                                    align='left'
                                                                    style={{ minWidth: column.minWidth }}
                                                                >
                                                                    {column.label}
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody component={Paper}>
                                                        {accounts.map(account => (
                                                            <TableRow hover role="checkbox" tabIndex={-1} key={account.accountNumber}>
                                                                <TableCell component="th" scope="row">
                                                                    {account.customerName}
                                                                </TableCell>
                                                                <TableCell align='left'>
                                                                    {account.mainBalance}ar
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </Paper>
                                    </Stack>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </DrawerProvider>
    );
}

export default Dashboard;
