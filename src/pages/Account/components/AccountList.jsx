import React, { useState, useEffect } from 'react';
import { Paper, Typography, Divider, Button, InputBase } from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import AddAccounts from './AddAccounts';
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';

const columns = [
    { id: 'accountNumber', label: 'Account Number', minWidth: 100 },
    { id: 'customerName', label: 'Customer Name', minWidth: 100 },
    { id: 'customerBirthdate', label: 'Birthdate', minWidth: 100 },
    { id: 'netMonthlySalary', label: 'Net Monthly Salary', minWidth: 100 },
    { id: 'mainBalance', label: 'Main Balance', minWidth: 100 },
    { id: 'loans', label: 'Loans', minWidth: 100 },
    { id: 'interestOnLoans', label: 'Interest on Loans', minWidth: 100 },
    { id: 'decouvertAutorise', label: 'Overdraft Authorized', minWidth: 100 },
    { id: 'creditAuthorized', label: 'Credit Authorized', minWidth: 100 },
    { id: 'edit', label: '', minWidth: 100 },
    { id: 'delete', label: '', minWidth: 100 },
];

function AccountList() {
    const [searchValue, setSearchValue] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editRowData, setEditRowData] = useState(null);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/accounts')
            .then(response => {
                setAccounts(response.data);
            })
            .catch(error => {
                console.error('Error fetching accounts:', error);
            });
    }, []);

    const handleAddAccount = () => {
        setIsAddDialogOpen(true);
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleCloseAddDialog = () => {
        setIsAddDialogOpen(false);
    };

    const handleAdd = (newAccount) => {
        setAccounts(prevAccounts => [...prevAccounts, newAccount]);
        setIsAddDialogOpen(false);
    };

    const handleEdit = (id) => {
        const rowDataToEdit = accounts.find(account => account.accountNumber === id);
        setEditRowData(rowDataToEdit);
        setIsAddDialogOpen(true);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedAccounts = accounts.filter(account => account.accountNumber !== id);
                setAccounts(updatedAccounts);
                Swal.fire(
                    'Deleted!',
                    'Your section has been deleted.',
                    'success'
                );
            }
        });
    };

    const filteredAccounts = accounts.filter(account =>
        account.customerName.toLowerCase().includes(searchValue.toLowerCase()) ||
        account.accountNumber.toString().includes(searchValue)
    );

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography gutterBottom variant='h5' component='div' sx={{ mt: '20px', ml: '20px' }} >
                Accounts List
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
                <Button variant="contained" onClick={handleAddAccount} sx={{ margin: '20px' }}>+ Add</Button>
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
                        {filteredAccounts.map((account) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={account.accountNumber}>
                                    <TableCell align='left'>{account.accountNumber}</TableCell>
                                    <TableCell align='left'>{account.customerName}</TableCell>
                                    <TableCell align='left'>{new Date(account.customerBirthdate).toLocaleDateString()}</TableCell>
                                    <TableCell align='left'>{account.netMonthlySalary}ar</TableCell>
                                    <TableCell align='left'>{account.mainBalance}ar</TableCell>
                                    <TableCell align='left'>{account.loans}ar</TableCell>
                                    <TableCell align='left'>{account.interestOnLoans}ar</TableCell>
                                    <TableCell align='left'>{account.decouvertAutorise ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align='left'>{account.creditAuthorized}ar</TableCell>
                                    <TableCell align='left'>
                                        <Button variant="contained" onClick={() => handleEdit(account.accountNumber)}> <EditIcon /></Button>
                                    </TableCell>
                                    <TableCell align='left'>
                                        <Button variant="contained" onClick={() => handleDelete(account.accountNumber)}> <DeleteSweepIcon /></Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddAccounts open={isAddDialogOpen} onClose={handleCloseAddDialog} onAdd={handleAdd} editRowData={editRowData} />
        </Paper>
    );
}

export default AccountList;
