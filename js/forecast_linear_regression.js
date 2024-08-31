// Example data points
const data = [
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 5 },
  { x: 4, y: 7 },
  { x: 5, y: 11 },
];

// Calculate the means of x and y
const meanX = data.reduce((sum, point) => sum + point.x, 0) / data.length;
const meanY = data.reduce((sum, point) => sum + point.y, 0) / data.length;

// Calculate the slope (m) and intercept (b) for the line y = mx + b
let numerator = 0;
let denominator = 0;
data.forEach((point) => {
  numerator += (point.x - meanX) * (point.y - meanY);
  denominator += (point.x - meanX) ** 2;
});
const m = numerator / denominator;
const b = meanY - m * meanX;

// Generate the linear regression line data
const regressionLine = data.map((point) => ({
  x: point.x,
  y: m * point.x + b,
}));

// Create the chart
const ctx = document.getElementById("linearRegressionChart").getContext("2d");
const linearRegressionChart = new Chart(ctx, {
  type: "scatter",
  data: {
    datasets: [
      {
        label: "Data Points",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 1)",
        borderColor: "rgba(75, 192, 192, 1)",
        showLine: false,
        pointRadius: 5,
      },
      {
        label: "Linear Regression Line",
        data: regressionLine,
        type: "line",
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        pointRadius: 0,
      },
    ],
  },
  options: {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "X",
        },
      },
      y: {
        title: {
          display: true,
          text: "Y",
        },
      },
    },
  },
});
