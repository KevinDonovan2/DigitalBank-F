import React from 'react';
import { Chart } from 'react-google-charts';

export const data = [
    ['Year', 'Sales'],
    ['2013', 1000],
    ['2014', 1170],
    ['2015', 660],
    ['2016', 1030],
];

export const options = {
    isStacked: true,
    height: 300,
    legend: { position: 'top', maxLines: 3 },
    vAxis: { minValue: 0 },
};

export default function ChartBar() {
    return (
        <Chart
            chartType='AreaChart'
            width='100%'
            height='400px'
            data={data}
            options={options}
        />
    );
}
