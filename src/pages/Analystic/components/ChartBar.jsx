import React from 'react';
import { Chart } from 'react-google-charts';

export const data = [
    ['Date', 'Amout'],
    ['1/11', 200],
    ['1/12', 2800],
    ['1/13', 900],
    ['1/14', 1000],
    ['1/15', 2000],
    ['1/16', 1500],
    ['1/17', 1000],
    ['1/18', 1170],
    ['1/19', 660],
    ['1/20', 1030],
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
            chartType="AreaChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
        />
    );
}
