document.addEventListener("DOMContentLoaded", function () {
  const historicalData = [
    { year: 2018, gs: 15655050, jhs: 8262066, shs: 2939588, total: 26856704 },
    { year: 2019, gs: 15309037, jhs: 8443862, shs: 3124700, total: 26877599 },
    { year: 2020, gs: 14628816, jhs: 8282454, shs: 3176887, total: 26088157 },
  ];

  const years = historicalData.map((d) => d.year);
  const gsData = historicalData.map((d) => d.gs);
  const jhsData = historicalData.map((d) => d.jhs);
  const shsData = historicalData.map((d) => d.shs);
  const totalData = historicalData.map((d) => d.total);

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

  const allYears = years.concat(forecastedYears);
  const allGsData = gsData.concat(forecastedGs);
  const allJhsData = jhsData.concat(forecastedJhs);
  const allShsData = shsData.concat(forecastedShs);
  const allTotalData = totalData.concat(forecastedTotal);

  const ctx = document.getElementById("forecastTimelineChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: allYears,
      datasets: [
        {
          label: "GS",
          data: allGsData,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: false,
        },
        {
          label: "JHS",
          data: allJhsData,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: false,
        },
        {
          label: "SHS",
          data: allShsData,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: false,
        },
        {
          label: "Total",
          data: allTotalData,
          borderColor: "rgba(153, 102, 255, 1)",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Year",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Number of Enrollees",
          },
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      hover: {
        mode: "nearest",
        intersect: true,
      },
    },
  });
});
