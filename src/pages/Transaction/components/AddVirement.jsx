import React, { useState } from 'react';
import { Box, Dialog, Divider, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import axios from 'axios';

function AddVirement({ open, onClose, onAdd }) {
    const [idTransfer, setIdTransfer] = useState('');
    const [reason, setReason] = useState('');
    const [applyDate, setApplyDate] = useState('');
    const [registerDate, setRegisterDate] = useState('');
    const [amount, setAmount] = useState('');
    const [state, setState] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [destinataireAccountNumber, setDestinataireAccountNumber] = useState('');

    const handleAdd = () => {
        if (
            idTransfer.trim() === '' ||
            reason.trim() === '' ||
            registerDate.trim() === '' ||
            amount === '' ||
            state.trim() === '' ||
            accountNumber.trim() === '' ||
            destinataireAccountNumber.trim() === ''
        ) {
            alert('Empty fields !!!');
            return;
        }

        const newTransaction = {
            idTransfer: idTransfer,
            reason: reason,
            registerDate: registerDate,
            applyDate: applyDate,
            amount: parseFloat(amount),
            state: state,
            accountNumber: accountNumber,
            destinataireAccountNumber: destinataireAccountNumber
        };

        axios.post('http://localhost:8080/transferts', newTransaction)
            .then(response => {
                console.log('Transaction added successfully:', response.data);
                onAdd(newTransaction);
                setIdTransfer('');
                setReason('');
                setApplyDate('');
                setRegisterDate('');
                setAmount('');
                setState('');
                setAccountNumber('');
                setDestinataireAccountNumber('');
                onClose();
            })
            .catch(error => {
                console.error('Error adding transaction:', error);
                alert('An error occurred while adding the transaction.');
            });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ backgroundColor: 'whitesmoke', display: 'flex', justifyContent: 'center' }}>Add Transaction</DialogTitle>
            <Divider />
            <DialogContent sx={{ m: 2 }}>
                <Box>
                    <TextField
                        label="ID Transfer"
                        value={idTransfer}
                        onChange={(e) => setIdTransfer(e.target.value)}
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
                    <TextField
                        label="Register Date"
                        type="date"
                        value={applyDate}
                        onChange={(e) => setApplyDate(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                    <TextField
                        label="Register Date"
                        type="date"
                        value={registerDate}
                        onChange={(e) => setRegisterDate(e.target.value)}
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
                    <TextField
                        label="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                    <TextField
                        label="Account send"
                        type="number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                    <TextField
                        label="Account receive"
                        type="number"
                        value={destinataireAccountNumber}
                        onChange={(e) => setDestinataireAccountNumber(e.target.value)}
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

export default AddVirement;
