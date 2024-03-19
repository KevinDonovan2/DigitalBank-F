import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

function AddAccounts({ open, onClose, onAdd }) {
    const [name, setName] = useState('');
    const [accountType, setAccountType] = useState('');
    const [startingAmount, setStartingAmount] = useState('');
    const [currency, setCurrency] = useState('');

    const handleAdd = () => {
        // Validation des champs, vous pouvez ajouter des validations supplémentaires ici
        if (name.trim() === '' || accountType.trim() === '' || startingAmount.trim() === '' || currency.trim() === '') {
            alert('Please fill in all fields');
            return;
        }

        // Créer un objet compte avec les données saisies
        const newAccount = {
            name: name,
            accountType: accountType,
            startingAmount: parseFloat(startingAmount),
            currency: currency
        };

        // Appeler la fonction onAdd avec le nouvel objet compte en paramètre
        onAdd(newAccount);

        // Réinitialiser les champs après l'ajout
        setName('');
        setAccountType('');
        setStartingAmount('');
        setCurrency('');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Account</DialogTitle>
            <DialogContent>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Account Type"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Starting Amount"
                    value={startingAmount}
                    onChange={(e) => setStartingAmount(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleAdd} color="primary">Add</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddAccounts;
