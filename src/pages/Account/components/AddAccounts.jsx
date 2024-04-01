import React, { useState, useEffect } from 'react';
import { Box, Dialog, Divider, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';

function AddAccounts({ open, onClose, onAdd, editRowData }) {
    const [customerName, setCustomerName] = useState('');
    const [customerBirthdate, setCustomerBirthdate] = useState('');
    const [netMonthlySalary, setNetMonthlySalary] = useState('');
    const [mainBalance, setMainBalance] = useState('');
    const [loans, setLoans] = useState('');
    const [interestOnLoans, setInterestOnLoans] = useState('');
    const [decouvertAutorise, setDecouvertAutorise] = useState(true);
    const [creditAuthorized, setCreditAuthorized] = useState('');

    useEffect(() => {
        if (editRowData) {
            setCustomerName(editRowData.customerName || '');
            setCustomerBirthdate(editRowData.customerBirthdate || '');
            setNetMonthlySalary(editRowData.netMonthlySalary || '');
            setMainBalance(editRowData.mainBalance || '');
            setLoans(editRowData.loans || '');
            setInterestOnLoans(editRowData.interestOnLoans || '');
            setDecouvertAutorise(editRowData.decouvertAutorise || true);
            setCreditAuthorized(editRowData.creditAuthorized || '');
        }
    }, [editRowData]);

    const handleAddOrUpdate = () => {
        if (customerName.trim() === '' || customerBirthdate.trim() === '' || netMonthlySalary === '' || mainBalance === '' || loans === '' || interestOnLoans === '' || creditAuthorized === '') {
            alert('Veuillez remplir tous les champs !');
            return;
        }

        const newAccount = {
            customerName: customerName,
            customerBirthdate: customerBirthdate,
            netMonthlySalary: parseFloat(netMonthlySalary),
            mainBalance: parseFloat(mainBalance),
            loans: parseFloat(loans),
            interestOnLoans: parseFloat(interestOnLoans),
            decouvertAutorise: decouvertAutorise,
            creditAuthorized: parseFloat(creditAuthorized)
        };

        if (editRowData) {
            axios.put(`http://localhost:8080/accounts/${editRowData.accountNumber}`, newAccount)
                .then(response => {
                    onAdd(response.data);
                    onClose();
                })
                .catch(error => {
                    console.error('Erreur lors de la mise à jour du compte:', error);
                });
        } else {
            axios.post('http://localhost:8080/accounts', newAccount)
                .then(response => {
                    onAdd(response.data);
                    onClose();
                })
                .catch(error => {
                    console.error('Erreur lors de l\'ajout du compte:', error);
                });
        }

        setCustomerName('');
        setCustomerBirthdate('');
        setNetMonthlySalary('');
        setMainBalance('');
        setLoans('');
        setInterestOnLoans('');
        setCreditAuthorized('');
    };

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle sx={{ backgroundColor: 'whitesmoke', display: 'flex', justifyContent: 'center' }}>{editRowData ? 'Modifier le compte' : 'Ajouter un compte'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ m: 2 }}>
                <Box>
                    <TextField
                        label="Nom du client"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                    <TextField
                        label="Date de naissance du client"
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
                        label="Salaire mensuel net"
                        type="number"
                        value={netMonthlySalary}
                        onChange={(e) => setNetMonthlySalary(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                    <TextField
                        label="Solde principal"
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
                        label="Prêts"
                        type="number"
                        value={loans}
                        onChange={(e) => setLoans(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                    <TextField
                        label="Intérêts sur les prêts"
                        type="number"
                        value={interestOnLoans}
                        onChange={(e) => setInterestOnLoans(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                </Box>
                <Box>
                    <TextField
                        label="Découvert autorisé"
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
                    <TextField
                        label="Crédit autorisé"
                        type="number"
                        value={creditAuthorized}
                        onChange={(e) => setCreditAuthorized(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="filled"
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined" color="secondary">Annuler</Button>
                <Button onClick={handleAddOrUpdate} variant="outlined" color="primary">{editRowData ? 'Modifier' : 'Ajouter'}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddAccounts;
