import React, { useState, useEffect } from 'react';
import { Paper, Typography, Divider } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'accountType', label: 'Account Type', minWidth: 100 },
    { id: 'startingAmount', label: 'Starting Amount', minWidth: 100 },
    { id: 'currency', label: 'Currency', minWidth: 100 },
];

function TransactionList() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios.get('/api/transactions') // Remplacez '/api/transactions' par l'URL réelle de votre backend
            .then(response => {
                setRows(response.data);
            })
            .catch(error => {
                console.error('Error fetching transactions:', error);
            });
    }, []);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography gutterBottom variant='h5' component='div' sx={{ padding: '20px' }} >
                Transaction List
            </Typography>
            <Divider />
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
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
                    <TableBody>
                        {rows.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    <TableCell align='left'>{row.name}</TableCell>
                                    <TableCell align='left'>{row.accountType}</TableCell>
                                    <TableCell align='left'>{row.startingAmount}</TableCell>
                                    <TableCell align='left'>{row.currency}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default TransactionList;
