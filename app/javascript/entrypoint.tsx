// React
import * as React from "react";
import * as ReactDOM from "react-dom";

// Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,

  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,

  LineElement,
  PointElement,
);

import { Line } from "react-chartjs-2";

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("app");
  const weightData = JSON.parse(document.getElementById("weight-data").textContent)
  ReactDOM.render(
    <WeightChart
      dates={weightData.dates}
      data={weightData.data}
      decreasing={weightData.decreasing}
    />, rootEl
  );
});

interface WeightChartProps {
  dates: Array<String>,
  data: Array<Number>,
  decreasing: Boolean,
}

const WeightChart = ({ dates, data, decreasing }: WeightChartProps) => {
  let rgbValues = [];

  if (decreasing) {
    rgbValues = [24, 128, 56];
  } else {
    rgbValues = [217, 48, 37];
  }

  return (
    <React.Fragment>
      <Line
        data={{
          labels: dates,
          datasets:[
            {
              label: "David's weight",
              data: data,
              borderColor: `rgb(${rgbValues.join(", ")})`,
              backgroundColor: `rgb(${rgbValues.join(", ")}, 0.5)`,
            },
          ],
        }}
      />
    </React.Fragment>
  )
}
