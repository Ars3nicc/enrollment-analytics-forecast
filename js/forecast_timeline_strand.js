document.addEventListener("DOMContentLoaded", function () {
    const historicalData = [
      { year: 2018, ABM: 402142, ARTS: 12632, GAS: 572224, HUMSS: 459572, MARITIME: 13640, SPORTS: 4916, STEM: 411525, TVL: 1062937, TOTAL: 23917116 },
      { year: 2019, ABM: 400587, ARTS: 13885, GAS: 530296, HUMSS: 626013, MARITIME: 12851, SPORTS: 5315, STEM: 468011, TVL: 1067742, TOTAL: 23752899 },
      { year: 2020, ABM: 375299, ARTS: 12118, GAS: 535218, HUMSS: 756741, MARITIME: 7699, SPORTS: 4867, STEM: 500460, TVL: 984485, TOTAL: 22911270 },
    ];
  
    const categories = ["ABM", "ARTS", "GAS", "HUMSS", "MARITIME", "SPORTS", "STEM", "TVL", "TOTAL"];
  
    function calculateLinearRegression(data, category) {
      const meanX = data.reduce((sum, item) => sum + item.year, 0) / data.length;
      const meanY = data.reduce((sum, item) => sum + item[category], 0) / data.length;
  
      let numerator = 0;
      let denominator = 0;
      data.forEach(item => {
        numerator += (item.year - meanX) * (item[category] - meanY);
        denominator += (item.year - meanX) ** 2;
      });
  
      const m = numerator / denominator;
      const b = meanY - m * meanX;
  
      return { m, b };
    }
  
    function predictEnrollment(year, m, b) {
      return m * year + b;
    }
  
    const predictions = [];
    for (let year = 2025; year <= 2028; year++) {
      const prediction = { year };
      categories.forEach(category => {
        const { m, b } = calculateLinearRegression(historicalData, category);
        prediction[category] = predictEnrollment(year, m, b);
      });
      predictions.push(prediction);
    }
  
    const combinedData = historicalData.concat(predictions);
  
    const ctx = document.getElementById("forecastTimelineStrandChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: combinedData.map(item => item.year),
        datasets: categories.map(category => ({
          label: category,
          data: combinedData.map(item => item[category]),
          fill: false,
          borderColor: getRandomColor(),
          tension: 0.1
        }))
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
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Year'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Enrollment'
            }
          }
        }
      }
    });
  
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  });