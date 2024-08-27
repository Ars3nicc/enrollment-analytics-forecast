document.addEventListener("DOMContentLoaded", function () {
    // Fetch and parse the CSV file
    Papa.parse("excel/top10_regions/2020-2021.csv", {
      download: true,
      header: true,
      complete: function (results) {
        const data = results.data;
        const regions = [];
        const values = [];
  
        // Assuming the CSV has columns 'Regions' and 'Value'
        data.forEach((row) => {
          regions.push(row.Regions);
          values.push(parseInt(row["Value"]));
        });
  
        // Debugging: Log the parsed data
        console.log("Parsed Data:", data);
        console.log("Regions:", regions);
        console.log("Values:", values);
  
        // Sort the data by value in descending order and take the top 10
        const sortedData = data
          .sort((a, b) => b["Value"] - a["Value"])
          .slice(0, 10);
        const topRegions = sortedData.map((row) => row.Regions);
        const topValues = sortedData.map((row) => parseInt(row["Value"]));
  
        // Debugging: Log the sorted data
        console.log("Sorted Data:", sortedData);
        console.log("Top Regions:", topRegions);
        console.log("Top Values:", topValues);
  
        // Data for the bar chart
        const barChartData = {
          labels: topRegions,
          datasets: [
            {
              label: "Regions",
              data: topValues,
              backgroundColor: "rgba(255, 99, 132, 0.6)", // Reddish background color
              borderColor: "rgba(255, 99, 132, 1)", // Reddish border color
              borderWidth: 1,
            },
          ],
        };
  
        // Create the bar chart
        const ctx = document.getElementById("bar-chart-2020-2021").getContext("2d");
        new Chart(ctx, {
          type: "bar",
          data: barChartData,
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      },
    });
  });
  