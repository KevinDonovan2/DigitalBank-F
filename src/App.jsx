import React from 'react';
import Dashboard from './pages/dashboard/Dashboard';
import Account from './pages/dashboard/Account';
import Transaction from './pages/dashboard/Transaction';
import Analystic from './pages/dashboard/Analystic';
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
