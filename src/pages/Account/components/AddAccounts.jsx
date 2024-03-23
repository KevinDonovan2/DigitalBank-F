import React, { useState, useEffect } from 'react';
import { Box, Dialog, Divider, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

function AddAccounts({ open, onClose, onAdd, editRowData }) {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [monthlySalary, setMonthlySalary] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        if (editRowData) {
            setName(editRowData.name);
            setLastName(editRowData.lastName);
            setMonthlySalary(editRowData.monthlySalary);
            setDate(editRowData.date);
        }
    }, [editRowData]);

    const handleAddOrUpdate = () => {
        if (name.trim() === '' || lastName.trim() === '' || monthlySalary === '' || date.trim() === '') {
            alert('Empty fields !!!');
            return;
        }

        const selectedDate = new Date(date);
        const maxDate = new Date(2003, 0, 1); // 1st January 2003
        if (selectedDate >= maxDate) {
            alert('Date must be before 2003!');
            return;
        }

        const newAccount = {
            name: name,
            lastName: lastName,
            monthlySalary: parseFloat(monthlySalary),
            date: date
        };

        if (editRowData) {
            onAdd(editRowData.id, newAccount);
        } else {
            onAdd(newAccount);
        }

        setName('');
        setLastName('');
        setMonthlySalary('');
        setDate('');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ backgroundColor: 'whitesmoke', display: 'flex', justifyContent: 'center' }}>{editRowData ? 'Edit Account' : 'Add Account'}</DialogTitle>
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
                    <TextField
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                </Box>
                <Box>
                    <TextField
                        label="Monthly Salary"
                        type="number"
                        value={monthlySalary}
                        onChange={(e) => setMonthlySalary(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                    <TextField
                        label="Birthday"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
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
