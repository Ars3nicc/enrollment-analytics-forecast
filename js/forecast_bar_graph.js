document.addEventListener("DOMContentLoaded", function () {
  const enrollmentData = [
    { region: "Region I - Ilocos Region", enrollees: 424637 },
    { region: "Region II - Cagayan Valley", enrollees: 289853 },
    { region: "Region III - Central Luzon", enrollees: 902369 },
    { region: "Region IV-A - CALABARZON", enrollees: 1178212 },
    { region: "Region IV-B - MIMAROPA", enrollees: 273497 },
    { region: "Region V - Bicol Region", enrollees: 528491 },
    { region: "Region VI - Western Visayas", enrollees: 690133 },
    { region: "Region VII - Central Visayas", enrollees: 645722 },
    { region: "Region VIII - Eastern Visayas", enrollees: 410451 },
    { region: "Region IX - Zamboanga Peninsula", enrollees: 333646 },
    { region: "Region X - Northern Mindanao", enrollees: 399801 },
    { region: "Region XI - Davao Region", enrollees: 411314 },
    { region: "Region XII - Soccsksargen", enrollees: 394474 },
    { region: "CARAGA - CARAGA", enrollees: 245678 },
    {
      region: "BARMM - Bangsamoro Autonomous Region in Muslim Mindanao",
      enrollees: 208348,
    },
    { region: "CAR - Cordillera Administrative Region", enrollees: 138604 },
    { region: "NCR - National Capital Region", enrollees: 858003 },
  ];

  // Sort the data by enrollees in descending order and get the top 10 regions
  const topRegions = enrollmentData
    .sort((a, b) => b.enrollees - a.enrollees)
    .slice(0, 10);

  const regions = topRegions.map((d) => d.region);
  const enrollees = topRegions.map((d) => d.enrollees);

  const ctx = document.getElementById("topRegionsChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: regions,
      datasets: [
        {
          label: "Number of Enrollees",
          data: enrollees,
          backgroundColor: "rgba(255, 165, 0, 0.6)", // Orange background color
          borderColor: "rgba(255, 165, 0, 0.8)", // Orange border color
          borderWidth: 1,
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
            text: "Region",
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
