import React, { useState, useEffect } from 'react';
import { Box, Dialog, Divider, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import axios from 'axios';

function AddAccounts({ open, onClose, onAdd, editRowData }) {
    const [customerName, setCustomerName] = useState('');
    const [customerLastName, setCustomerLastName] = useState('');
    const [netMonthlySalary, setNetMonthlySalary] = useState('');
    const [customerBirthdate, setCustomerBirthdate] = useState('');

    useEffect(() => {
        if (editRowData) {
            setCustomerName(editRowData.customerName);
            setCustomerLastName(editRowData.customerLastName);
            setNetMonthlySalary(editRowData.netMonthlySalary);
            setCustomerBirthdate(editRowData.customerBirthdate);
        }
    }, [editRowData]);

    const handleAddOrUpdate = () => {
        if (customerName.trim() === '' || customerLastName.trim() === '' || netMonthlySalary === '' || customerBirthdate.trim() === '') {
            alert('Empty fields !!!');
            return;
        }

        const selectedDate = new Date(customerBirthdate);
        const maxDate = new Date(2003, 0, 1);
        if (selectedDate >= maxDate) {
            alert('Date must be before 2003!');
            return;
        }

        const newAccount = {
            customerName: customerName,
            customerLastName: customerLastName,
            netMonthlySalary: parseFloat(netMonthlySalary),
            customerBirthdate: customerBirthdate
        };

        if (editRowData) {
            axios.put(`http://localhost:8080/accounts/${editRowData.accountNumber}`, newAccount)
                .then(response => {
                    onAdd(response.data);
                    onClose();
                })
                .catch(error => {
                    console.error('Error updating account:', error);
                });
        } else {
            axios.post('http://localhost:8080/accounts', newAccount)
                .then(response => {
                    onAdd(response.data);
                    onClose();
                })
                .catch(error => {
                    console.error('Error adding account:', error);
                });
        }

        setCustomerName('');
        setCustomerLastName('');
        setNetMonthlySalary('');
        setCustomerBirthdate('');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ backgroundColor: 'whitesmoke', display: 'flex', justifyContent: 'center' }}>{editRowData ? 'Edit Account' : 'Add Account'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ m: 2 }}>
                <Box>
                    <TextField
                        label="Customer Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                    <TextField
                        label="Customer Last Name"
                        value={customerLastName}
                        onChange={(e) => setCustomerLastName(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                </Box>
                <Box>
                    <TextField
                        label="Net Monthly Salary"
                        type="number"
                        value={netMonthlySalary}
                        onChange={(e) => setNetMonthlySalary(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                    <TextField
                        label="Customer Birthdate"
                        type="date"
                        value={customerBirthdate}
                        onChange={(e) => setCustomerBirthdate(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="secondary">Cancel</Button>
                <Button onClick={handleAddOrUpdate} variant="outlined" color="primary">{editRowData ? 'Update' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddAccounts;
