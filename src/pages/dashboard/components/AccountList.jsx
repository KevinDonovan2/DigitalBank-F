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

const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'accountType', label: 'Account Type', minWidth: 100 },
    { id: 'startingAmount', label: 'Starting Amount', minWidth: 100 },
    { id: 'currency', label: 'Currency', minWidth: 100 },
    { id: 'delete', label: '', minWidth: 100 },
];

function AccountList() {
    const [rows, setRows] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    useEffect(() => {
        axios.get('/api/transactions')
            .then(response => {
                setRows(response.data);
            })
            .catch(error => {
                console.error('Error fetching transactions:', error);
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
        setRows(prevRows => [...prevRows, newAccount]);

        setIsAddDialogOpen(false);
    };


    const filteredRows = rows.filter(row =>
        row.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.accountType.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.currency.toLowerCase().includes(searchValue.toLowerCase())
    );

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
                // Filtrer les lignes pour supprimer uniquement la section avec l'ID correspondant
                const updatedRows = rows.filter(row => row.id !== id);
                setRows(updatedRows);
                Swal.fire(
                    'Deleted!',
                    'Your section has been deleted.',
                    'success'
                );
            }
        });
    };

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
                        {filteredRows.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    <TableCell align='left'>{row.name}</TableCell>
                                    <TableCell align='left'>{row.accountType}</TableCell>
                                    <TableCell align='left'>{row.startingAmount}</TableCell>
                                    <TableCell align='left'>{row.currency}</TableCell>
                                    {/* Cellule pour le bouton "Delete" */}
                                    <TableCell align='left'>
                                        <Button variant="contained" onClick={() => handleDelete(row.id)}> <DeleteSweepIcon />Delete</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddAccounts open={isAddDialogOpen} onClose={handleCloseAddDialog} onAdd={handleAdd} />
        </Paper>
    );
}

export default AccountList;
