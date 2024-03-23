import React, { useState } from 'react';
import { Box, Dialog, Divider, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

function AddRetrait({ open, onClose, onAdd }) {
    const [accountName, setAccountName] = useState('');
    const [reason, setReason] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');

    const handleAdd = () => {
        if (accountName.trim() === '' || reason.trim() === '' || date.trim() === '' || amount === '') {
            alert('Empty fields !!!');
            return;
        }

        const newTransaction = {
            accountName: accountName,
            reason: reason,
            date: date,
            amount: parseFloat(amount)
        };

        onAdd(newTransaction);

        setAccountName('');
        setReason('');
        setDate('');
        setAmount('');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ backgroundColor: 'whitesmoke', display: 'flex', justifyContent: 'center' }}>Add Transaction</DialogTitle>
            <Divider />
            <DialogContent sx={{ m: 2 }}>
                <Box>
                    <TextField
                        label="Account Name"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                    <TextField
                        label="Reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                </Box>
                <Box>
                    <TextField
                        label="Date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                    <TextField
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="secondary">Cancel</Button>
                <Button onClick={handleAdd} variant="outlined" color="primary">Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddRetrait;
