document.addEventListener("DOMContentLoaded", function () {
  const historicalData = [
    { year: 2018, enrollees: 26856704, nonEnrollees: 500000 },
    { year: 2019, enrollees: 26877599, nonEnrollees: 520000 },
    { year: 2020, enrollees: 26088157, nonEnrollees: 530000 },
  ];

  const totalEnrollees = historicalData.reduce(
    (sum, data) => sum + data.enrollees,
    0
  );
  const totalNonEnrollees = historicalData.reduce(
    (sum, data) => sum + data.nonEnrollees,
    0
  );

  const averageEnrollees = totalEnrollees / historicalData.length;
  const averageNonEnrollees = totalNonEnrollees / historicalData.length;

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
              const total = tooltipItem.dataset.data.reduce(
                (sum, value) => sum + value,
                0
              );
              const value = tooltipItem.raw;
              const percentage = ((value / total) * 100).toFixed(2);
              return `${
                tooltipItem.label
              }: ${percentage}% (${value.toLocaleString()})`;
            },
          },
        },
      },
    },
  });
});
