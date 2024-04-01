import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

export default function ChartPie() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/accounts');
                // Assuming response.data is an array of objects with 'customerName' and 'mainBalance' properties
                const data = response.data.map(account => [account.customerName, account.mainBalance]);
                // Prepending the header row
                data.unshift(['Name', 'MainBalances']);
                setChartData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const options = {
        title: 'All accounts',
        is3D: true,
    };

    return (
        <Chart
            chartType="PieChart"
            data={chartData}
            options={options}
            width={'100%'}
            height={'400px'}
        />
    );
}
