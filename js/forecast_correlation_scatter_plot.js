document.addEventListener("DOMContentLoaded", function () {
    const historicalData = [
      { year: 2018, region: "Region I", enrollees: 123456 },
      { year: 2018, region: "Region II", enrollees: 234567 },
      { year: 2019, region: "Region I", enrollees: 223456 },
      { year: 2019, region: "Region II", enrollees: 334567 },
      { year: 2020, region: "Region I", enrollees: 323456 },
      { year: 2020, region: "Region II", enrollees: 434567 },
      { year: 2021, region: "Region I", enrollees: 423456 },
      { year: 2021, region: "Region II", enrollees: 534567 },
    ];
  
    const forecastedData = [
      { year: 2025, region: "Region I", enrollees: 523456 },
      { year: 2025, region: "Region II", enrollees: 634567 },
      { year: 2026, region: "Region I", enrollees: 623456 },
      { year: 2026, region: "Region II", enrollees: 734567 },
      { year: 2027, region: "Region I", enrollees: 723456 },
      { year: 2027, region: "Region II", enrollees: 834567 },
      { year: 2028, region: "Region I", enrollees: 823456 },
      { year: 2028, region: "Region II", enrollees: 934567 },
    ];
  
    const regions = ["Region I", "Region II"];
    const colors = ["rgba(255, 165, 0, 0.6)", "rgba(54, 162, 235, 0.6)"];
    const borderColors = ["rgba(255, 165, 0, 0.8)", "rgba(54, 162, 235, 0.8)"];
  
    const datasets = regions.map((region, index) => {
      const regionHistoricalData = historicalData.filter(d => d.region === region);
      const regionForecastedData = forecastedData.filter(d => d.region === region);
  
      const scatterData = regionHistoricalData.map(d => ({
        x: d.year,
        y: d.enrollees,
      })).concat(regionForecastedData.map(d => ({
        x: d.year,
        y: d.enrollees,
      })));
  
      return {
        label: region,
        data: scatterData,
        backgroundColor: colors[index],
        borderColor: borderColors[index],
        borderWidth: 1,
      };
    });
  
    const ctxScatter = document.getElementById("correlationScatterPlot").getContext("2d");
    new Chart(ctxScatter, {
      type: "scatter",
      data: {
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            title: {
              display: true,
              text: "Year",
            },
          },
          y: {
            title: {
              display: true,
              text: "Number of Enrollees",
            },
          },
        },
      },
    });
  });