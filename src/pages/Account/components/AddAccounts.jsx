import React, { useState, useEffect } from 'react';
import { Box, Dialog, Divider, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';

function AddAccounts({ open, onClose, onAdd, editRowData }) {
    const [customerName, setCustomerName] = useState('');
    const [customerBirthdate, setCustomerBirthdate] = useState('');
    const [netMonthlySalary, setNetMonthlySalary] = useState('');
    const [mainBalance, setMainBalance] = useState('');
    const [decouvertAutorise, setDecouvertAutorise] = useState(true);

    useEffect(() => {
        if (editRowData) {
            setCustomerName(editRowData.customerName || '');
            setCustomerBirthdate(editRowData.customerBirthdate || '');
            setNetMonthlySalary(editRowData.netMonthlySalary || '');
            setMainBalance(editRowData.mainBalance || '');
            setDecouvertAutorise(editRowData.decouvertAutorise || true);
        }
    }, [editRowData]);

    const handleAdd = () => {
        if (customerName.trim() === '' || customerBirthdate.trim() === '' || netMonthlySalary === '' || mainBalance === '') {
            alert('Veuillez remplir tous les champs !');
            return;
        }

        const birthdate = new Date(customerBirthdate);
        const today = new Date();
        let age = today.getFullYear() - birthdate.getFullYear();
        const month = today.getMonth() - birthdate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }
        if (age < 21) {
            alert('Le client doit avoir au moins 21 ans pour ouvrir un compte !');
            return;
        }

        const newAccount = {
            customerName: customerName,
            customerBirthdate: customerBirthdate,
            netMonthlySalary: parseFloat(netMonthlySalary),
            mainBalance: parseFloat(mainBalance),
            decouvertAutorise: decouvertAutorise
        };

        axios.post('http://localhost:8080/accounts', newAccount)
            .then(response => {
                onAdd(response.data);
                onClose();
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout du compte:', error);
            });

        setCustomerName('');
        setCustomerBirthdate('');
        setNetMonthlySalary('');
        setMainBalance('');
    };

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle sx={{ backgroundColor: 'whitesmoke', display: 'flex', justifyContent: 'center' }}>{editRowData ? 'Modifier le compte' : 'Ajouter un compte'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ m: 2 }}>
                <Box>
                    <TextField
                        label="Name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                    <TextField
                        label="Birthdate"
                        type="date"
                        value={customerBirthdate}
                        onChange={(e) => setCustomerBirthdate(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                </Box>
                <Box>
                    <TextField
                        label="Monthly Salary"
                        type="number"
                        value={netMonthlySalary}
                        onChange={(e) => setNetMonthlySalary(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                    <TextField
                        label="Main Balance"
                        type="number"
                        value={mainBalance}
                        onChange={(e) => setMainBalance(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                </Box>
                <Box>
                    <TextField
                        label="Decouvert Autorise"
                        select
                        value={decouvertAutorise}
                        onChange={(e) => setDecouvertAutorise(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    >
                        <MenuItem value={true}>Oui</MenuItem>
                        <MenuItem value={false}>Non</MenuItem>
                    </TextField>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="secondary">Cancel</Button>
                <Button onClick={handleAdd} variant="outlined" color="primary">ADD</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddAccounts;
