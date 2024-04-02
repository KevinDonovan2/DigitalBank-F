import React from 'react';
import Dashboard from './pages/dashboard/Dashboard';
import Account from './pages/Account/Account';
import Transaction from './pages/Transaction/Transaction';
import Analystic from './pages/Analystic/Analystic';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/Error/NotFound';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Créez un thème personnalisé avec votre couleur principale
const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(100, 185, 75)', // Remplacez cette valeur par votre couleur principale
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/transaction" element={<Transaction />} />
                    <Route path="/analystic" element={<Analystic />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
