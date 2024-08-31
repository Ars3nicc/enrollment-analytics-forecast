document.addEventListener("DOMContentLoaded", function () {
  const historicalData = [
    { year: 2018, enrollees: 26856704, nonEnrollees: 500000 },
    { year: 2019, enrollees: 26877599, nonEnrollees: 520000 },
    { year: 2020, enrollees: 26088157, nonEnrollees: 530000 },
  ];

  // Calculate the means of x (year) and y (enrollees)
  const meanX = historicalData.reduce((sum, data) => sum + data.year, 0) / historicalData.length;
  const meanY = historicalData.reduce((sum, data) => sum + data.enrollees, 0) / historicalData.length;

  // Calculate the slope (m) and intercept (b) for the line y = mx + b
  let numerator = 0;
  let denominator = 0;
  historicalData.forEach(data => {
    numerator += (data.year - meanX) * (data.enrollees - meanY);
    denominator += (data.year - meanX) ** 2;
  });
  const m = numerator / denominator;
  const b = meanY - m * meanX;

  // Predict the enrollees for the year 2025
  const year2025 = 2025;
  const predictedEnrollees2025 = m * year2025 + b;

  // Add the prediction to the data
  const combinedData = historicalData.concat({ year: year2025, enrollees: predictedEnrollees2025, nonEnrollees: 550000 });

  const totalEnrollees = combinedData.reduce((sum, data) => sum + data.enrollees, 0);
  const totalNonEnrollees = combinedData.reduce((sum, data) => sum + data.nonEnrollees, 0);

  const averageEnrollees = totalEnrollees / combinedData.length;
  const averageNonEnrollees = totalNonEnrollees / combinedData.length;

  const ctx = document.getElementById("forecastDonutChart").getContext("2d");
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Enrollees", "Non-Enrollees"],
      datasets: [
        {
          data: [averageEnrollees, averageNonEnrollees],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const total = tooltipItem.dataset.data.reduce((sum, value) => sum + value, 0);
              const value = tooltipItem.raw;
              const percentage = ((value / total) * 100).toFixed(2);
              return `${tooltipItem.label}: ${percentage}% (${value.toLocaleString()})`;
            },
          },
        },
      },
    },
  });
});