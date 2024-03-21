import React from 'react';
import Dashboard from './pages/dashboard/Dashboard';
import Account from './pages/Account/Account';
import Transaction from './pages/Transaction/Transaction';
import Analystic from './pages/Analystic/Analystic';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/Error/NotFound';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/account" element={<Account />} />
                <Route path="/transaction" element={<Transaction />} />
                <Route path="/analystic" element={<Analystic />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
