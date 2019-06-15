let orderCategoryByMounth = {
  data: (canvas, data) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
    gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
    gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
    return {
      labels: [
        "JAN",
        "FEV",
        "MAR",
        "ABR",
        "MAI",
        "JUN",
        "JUL",
        "AGO",
        "SET",
        "OUT",
        "NOV",
        "DEZ"
      ],
      datasets: [
        {
          label: (data[0] == undefined) ? "" : data[0][0].name,
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#00d6b4",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: (data[0] == undefined) ? [] : [data[0][0].value,data[1][0].value,data[2][0].value,data[3][0].value,data[4][0].value,data[5][0].value,data[6][0].value,data[7][0].value,data[8][0].value,data[9][0].value,data[10][0].value,data[11][0].value]
        },
        {
          label: (data[0] == undefined) ? "" : data[0][1].name,
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#fb6340",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: (data[0] == undefined) ? [] : [data[0][1].value,data[1][1].value,data[2][1].value,data[3][1].value,data[4][1].value,data[5][1].value,data[6][1].value,data[7][1].value,data[8][1].value,data[9][1].value,data[10][1].value,data[11][1].value]
        },
        {
          label: (data[0] == undefined) ? "" : data[0][2].name,
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#8965e0",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: (data[0] == undefined) ? [] : [data[0][2].value,data[1][2].value,data[2][2].value,data[3][2].value,data[4][2].value,data[5][2].value,data[6][2].value,data[7][2].value,data[8][2].value,data[9][2].value,data[10][2].value,data[11][2].value]
        }
      ]
    };
  },
  options: {
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent"
          },
          ticks: {
            fontColor: "#9e9e9e"
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(0,242,195,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ]
    }
  }
};

let MainCategoryes = (data) => {
  return({
    datasets: [{
      data: data.map(a => a.value),
      backgroundColor: [
        '#FF6384',
        '#4BC0C0',
        '#FFCE56',
        '#2dce89'
      ],
      label: 'My dataset' // for legend
    }],
    labels: data.map(a => a.name)
  });
}

let MainProducts = (data) => {
  return({
    datasets: [{
      data: data.map(a => a.value),
      backgroundColor: [
        '#FF6384',
        '#4BC0C0',
        '#FFCE56',
        '#2dce89',
        '#fb6340'
      ],
      label: 'My dataset' // for legend
    }],
    labels: data.map(a => a.name)
  });
}

module.exports = {
  orderCategoryByMounth,
  MainCategoryes,
  MainProducts
};
