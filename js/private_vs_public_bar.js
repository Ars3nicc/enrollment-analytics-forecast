const ctx = document.getElementById('bar-chart-schools').getContext('2d');

const dataSets = {
    overall: [11978990, 67843470],
    "2018-2019": [4289566, 22558138],
    "2019-2020": [4304676, 22572923],
    "2020-2021": [3375748, 22712409],
};

const totalEnrollments = {
    overall: 79822460,
    "2018-2019": 26847704,
    "2019-2020": 26877699,
    "2020-2021": 26088157,
};

let barChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Private Schools', 'Public Schools'],
        datasets: [{
            data: dataSets['overall'],
            backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        const total = totalEnrollments[document.querySelector('input[name="year_bar"]:checked').value];
                        const value = tooltipItem.raw;
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${tooltipItem.label}: ${value} (${percentage}%)`;
                    }
                }
            }
        }
    }
});

function updateChart(year) {
    barChart.data.datasets[0].data = dataSets[year];
    barChart.update();
}