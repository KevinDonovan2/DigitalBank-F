import React, { useState } from 'react';
import { Box, Dialog, Divider, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function AddAccounts({ open, onClose, onAdd }) {
    const [name, setName] = useState('');
    const [accountType, setAccountType] = useState('');
    const [startingAmount, setStartingAmount] = useState('');
    const [currency, setCurrency] = useState('');

    const handleAdd = () => {
        if (name.trim() === '' || accountType.trim() === '' || startingAmount.trim() === '' || currency.trim() === '') {
            alert('champs vide !!!');
            return;
        }

        const newAccount = {
            name: name,
            accountType: accountType,
            startingAmount: parseFloat(startingAmount),
            currency: currency
        };

        onAdd(newAccount);

        setName('');
        setAccountType('');
        setStartingAmount('');
        setCurrency('');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ backgroundColor: 'whitesmoke', display: 'flex', justifyContent: 'center' }}>Add Account</DialogTitle>
            <Divider />
            <DialogContent sx={{ m: 2 }}>
                <Box>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                    <FormControl variant="filled" fullWidth sx={{ minWidth: 120 }}>
                        <InputLabel id="account-type-label">Account Type</InputLabel>
                        <Select
                            labelId="account-type-label"
                            value={accountType}
                            onChange={(e) => setAccountType(e.target.value)}
                        >
                            <MenuItem value="General">General</MenuItem>
                            <MenuItem value="Cash">Cash</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <TextField
                        label="Starting Amount"
                        type="number"
                        value={startingAmount}
                        onChange={(e) => setStartingAmount(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                    <FormControl variant="filled" fullWidth sx={{ minWidth: 120 }}>
                        <InputLabel >Currency</InputLabel>
                        <Select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value="MDG">MDG</MenuItem>
                            <MenuItem value="EUR">EUR</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleAdd} color="primary">Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddAccounts;
