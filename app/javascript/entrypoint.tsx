// React
import * as React from "react";
import * as ReactDOM from "react-dom";

import styled from "styled-components";

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
  dates: Array<string>,
  data: Array<number>,
  decreasing: boolean,
}

const colors = {
  goodGreen: [24, 128, 56],
  badRed: [217, 48, 37],
}

const WeightChart = ({ dates, data, decreasing }: WeightChartProps) => {
  let rgbValues = [];

  if (decreasing) {
    rgbValues = colors.goodGreen;
  } else {
    rgbValues = colors.badRed;
  }

  const pctChange = (((data[data.length - 1] - data[0]) / data[data.length - 1]) * 100).toFixed(2)

  return (
    <React.Fragment>
      <h1>{data[data.length - 1]} lbs</h1>
      <NetChange decreasing={decreasing}>
        {decreasing ? "-" : "+"}{data[data.length - 1] - data[0]} lbs ({pctChange}%)
      </NetChange>
      <Line
        data={{
          labels: dates,
          datasets: [
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

const NetChange = styled.p`
  color: ${props => props.decreasing ? "rgb(24, 128, 56)" : "rgb(217, 48, 37)"};
  font-size: 18px;
`;
