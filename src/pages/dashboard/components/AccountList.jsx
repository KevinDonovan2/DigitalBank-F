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
import AddAccounts from './AddAccounts'; // Importez le composant AddAccounts

const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'accountType', label: 'Account Type', minWidth: 100 },
    { id: 'startingAmount', label: 'Starting Amount', minWidth: 100 },
    { id: 'currency', label: 'Currency', minWidth: 100 },
];

function AccountList() {
    const [rows, setRows] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false); // État de visibilité de la fenêtre modale AddAccounts

    useEffect(() => {
        axios.get('/api/transactions') // Remplacez '/api/transactions' par l'URL réelle de votre backend
            .then(response => {
                setRows(response.data);
            })
            .catch(error => {
                console.error('Error fetching transactions:', error);
            });
    }, []);

    const handleAddAccount = () => {
        setIsAddDialogOpen(true); // Ouvrir la fenêtre modale AddAccounts lors du clic sur le bouton "Add"
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleCloseAddDialog = () => {
        setIsAddDialogOpen(false); // Fermer la fenêtre modale AddAccounts
    };

    const handleAdd = (newAccount) => {
        // Ajoutez ici la logique pour ajouter un nouveau compte à la liste rows
        console.log('New account added:', newAccount);
        // Fermez la fenêtre modale après l'ajout du compte
        setIsAddDialogOpen(false);
    };

    const filteredRows = rows.filter(row =>
        row.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.accountType.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.currency.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden'  }}>
            <Typography gutterBottom variant='h5' component='div' sx={{ padding: '20px' }} >
                Accounts List
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center' ,backgroundColor:'whitesmoke' , padding:'5px' }}>
                    <SearchIcon />
                    <InputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchValue}
                        onChange={handleSearchChange}
                    />
                </div>
                <Button variant="contained" onClick={handleAddAccount} sx={{ margin: '20px' }}>Add</Button>
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
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* Affichez la fenêtre modale AddAccounts si isAddDialogOpen est true */}
            <AddAccounts open={isAddDialogOpen} onClose={handleCloseAddDialog} onAdd={handleAdd} />
        </Paper>
    );
}

export default AccountList;
