import React, { useState, useEffect } from 'react';
import { Paper, Typography, Divider, Button } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import InputBase from '@mui/material/InputBase';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'accountType', label: 'Account Type', minWidth: 100 },
    { id: 'startingAmount', label: 'Starting Amount', minWidth: 100 },
    { id: 'currency', label: 'Currency', minWidth: 100 },
];
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function AccountList() {
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

    const handleAddAccount = () => {
        console.log('Add account clicked');
    };
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography gutterBottom variant='h5' component='div' sx={{ padding: '20px' }} >
                Accounts List
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
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

export default AccountList;
