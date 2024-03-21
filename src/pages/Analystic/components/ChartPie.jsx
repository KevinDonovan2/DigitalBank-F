import React from 'react';
import { Chart } from 'react-google-charts';

export const data = [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 5],
    ['Commute', 9]
];

export const options = {
    title: 'All accounts',
    is3D: true,
};

export default function ChartPie() {
    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={'100%'}
            height={'400px'}
        />
    );
}
