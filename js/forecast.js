document.addEventListener('DOMContentLoaded', function () {
    const historicalData = [
        { year: 2018, gs: 15655050, jhs: 8262066, shs: 2939588, total: 26856704 },
        { year: 2019, gs: 15309037, jhs: 8443862, shs: 3124700, total: 26877599 },
        { year: 2020, gs: 14628816, jhs: 8282454, shs: 3176887, total: 26088157 },
    ];

    const years = historicalData.map(d => d.year);
    const gsData = historicalData.map(d => d.gs);
    const jhsData = historicalData.map(d => d.jhs);
    const shsData = historicalData.map(d => d.shs);
    const totalData = historicalData.map(d => d.total);

    function forecast(data, startYear, endYear) {
        const regression = ss.linearRegression(data.map((y, i) => [i, y]));
        const forecastedValues = [];
        for (let i = startYear - years[0]; i <= endYear - years[0]; i++) {
            forecastedValues.push(ss.linearRegressionLine(regression)(i));
        }
        return forecastedValues;
    }

    const forecastedGs = forecast(gsData, 2025, 2028);
    const forecastedJhs = forecast(jhsData, 2025, 2028);
    const forecastedShs = forecast(shsData, 2025, 2028);
    const forecastedTotal = forecast(totalData, 2025, 2028);

    const forecastedYears = [2025, 2026, 2027, 2028];

    const tableBody = document.querySelector('.forecast-table tbody');
    forecastedYears.forEach((year, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${year}</td>
            <td>${forecastedGs[index].toFixed(2)}</td>
            <td>${forecastedJhs[index].toFixed(2)}</td>
            <td>${forecastedShs[index].toFixed(2)}</td>
            <td>${forecastedTotal[index].toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
    });
});