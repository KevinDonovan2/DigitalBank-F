import React, { useState, useEffect } from 'react';
import { Paper, Typography, Divider, Button, InputBase } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import AddVirement from './AddVirement';
import AddRetrait from './AddRetrait';

// Ajout du champ "state" aux colonnes
const columns = [
    { id: 'idTransfer', label: 'ID Transfer', minWidth: 100 },
    { id: 'reason', label: 'Reason', minWidth: 100 },
    { id: 'registerDate', label: 'Register Date', minWidth: 100 },
    { id: 'amount', label: 'Amount', minWidth: 100 },
    { id: 'state', label: 'State', minWidth: 100 },
    { id: 'accountNumber', label: 'Account send', minWidth: 100 },
    { id: 'destinataireAccountNumber', label: 'Account receve', minWidth: 100 },
];

function TransactionList() {
    const [rows, setRows] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [transactionType, setTransactionType] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/transferts')
            .then(response => {
                const transformedData = response.data.map(transaction => ({
                    idTransfer: transaction.idTransfer,
                    reason: transaction.reason,
                    registerDate: transaction.registerDate,
                    amount: transaction.amount,
                    state: transaction.state,
                    accountNumber: transaction.accountNumber,
                    destinataireAccountNumber: transaction.destinataireAccountNumber,
                }));
                setRows(transformedData);
            })
            .catch(error => {
                console.error('Error fetching transactions:', error);
            });
    }, []);

    const handleAddAccount = (type) => {
        setTransactionType(type);
        setIsAddDialogOpen(true);
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleCloseAddDialog = () => {
        setIsAddDialogOpen(false);
    };

    const handleAdd = (newTransaction) => {
        const updatedTransaction = {
            ...newTransaction,
            status: transactionType === 'retrait' ? 'retrait' : 'virement',
        };
    
        setRows(prevRows => [...prevRows, updatedTransaction]);
        setIsAddDialogOpen(false);
    };
    

    const filteredRows = rows.filter(row =>
        row.reason.toLowerCase().includes(searchValue.toLowerCase())
    );    

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography gutterBottom variant='h5' component='div' sx={{ mt: '20px', ml: '20px' }} >
                Transactions List
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'whitesmoke', padding: '5px' }}>
                    <SearchIcon />
                    <InputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                </div>
                <div>
                    <Button variant="contained" onClick={() => handleAddAccount('retrait')} sx={{ margin: '20px' }}>Retrait</Button>
                    <Button variant="contained" onClick={() => handleAddAccount('virement')} sx={{ margin: '20px' }}>Virement</Button>
                </div>
            </div>
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
                        {filteredRows.map((row) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.idTransfer}>
                                <TableCell align='left'>{row.idTransfer}</TableCell>
                                <TableCell align='left'>{row.reason}</TableCell>
                                <TableCell align='left'>{row.registerDate}</TableCell>
                                <TableCell align='left'>{row.amount}</TableCell>
                                <TableCell align='left'>{row.state}</TableCell>
                                <TableCell align='left'>{row.accountNumber}</TableCell>
                                <TableCell align='left'>{row.destinataireAccountNumber}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {isAddDialogOpen && (
                transactionType === 'retrait' ? (
                    <AddRetrait open={isAddDialogOpen} onClose={handleCloseAddDialog} onAdd={handleAdd} />
                ) : (
                    <AddVirement open={isAddDialogOpen} onClose={handleCloseAddDialog} onAdd={handleAdd} />
                )
            )}
        </Paper>
    );
}

export default TransactionList;
