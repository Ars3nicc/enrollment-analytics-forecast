document.addEventListener('DOMContentLoaded', function () {
  const ctx = document.getElementById('timelineChart').getContext('2d');

  const data2018 = [
      416746, 269347, 892253, 1177847, 272820, 582521, 659757, 665751, 405521,
      319702, 382891, 416696, 374613, 236746, 195357, 138788, 908939,
  ];

  const data2019 = [
      423263, 277047, 915136, 1213489, 276621, 583824, 673826, 671703, 407076,
      327650, 397967, 431313, 390292, 241721, 210953, 139549, 915539,
  ];

  const data2020 = [
      424637, 289853, 902369, 1178212, 273497, 528491, 690133, 645722, 410451,
      333646, 399801, 411314, 394474, 245678, 208348, 138604, 858003,
  ];

  const regions = [
      "Region I - Ilocos Region",
      "Region II - Cagayan Valley",
      "Region III - Central Luzon",
      "Region IV-A - CALABARZON",
      "Region IV-B - MIMAROPA",
      "Region V - Bicol Region",
      "Region VI - Western Visayas",
      "Region VII - Central Visayas",
      "Region VIII - Eastern Visayas",
      "Region IX - Zamboanga Peninsula",
      "Region X - Northern Mindanao",
      "Region XI - Davao Region",
      "Region XII - Soccsksargen",
      "CARAGA - CARAGA",
      "BARMM - Bangsamoro Autonomous Region in Muslim Mindanao",
      "CAR - Cordillera Administrative Region",
      "NCR - National Capital Region",
  ];

  const config = {
      type: 'line',
      data: {
          labels: regions,
          datasets: [
              {
                  label: '2018-2019 Enrollees',
                  data: data2018,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  fill: false,
              },
              {
                  label: '2019-2020 Enrollees',
                  data: data2019,
                  borderColor: 'rgba(255, 99, 132, 1)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  fill: false,
              },
              {
                  label: '2020-2021 Enrollees',
                  data: data2020,
                  borderColor: 'rgba(54, 162, 235, 1)',
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  fill: false,
              }
          ]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              x: {
                  display: true,
                  title: {
                      display: true,
                      text: 'Regions',
                  },
              },
              y: {
                  display: true,
                  title: {
                      display: true,
                      text: 'Number of Enrollees',
                  },
                  beginAtZero: true,
              },
          },
          plugins: {
              legend: {
                  position: 'top',
              },
              tooltip: {
                  mode: 'index',
                  intersect: false,
              },
          },
          hover: {
              mode: 'nearest',
              intersect: true,
          },
      },
  };

  new Chart(ctx, config);
});