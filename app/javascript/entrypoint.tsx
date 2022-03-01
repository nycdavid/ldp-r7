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

import Weights from "./weights";

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("app");
  const measurements = JSON.parse(document.getElementById("weight-data").textContent)
  const weights: Weights = new Weights(measurements);
  ReactDOM.render(
    <WeightChart
      weights={weights}
    />, rootEl
  );
});

interface WeightChartProps {
  weights: Weights
}

const colors = {
  goodGreen: [24, 128, 56],
  badRed: [217, 48, 37],
}

const WeightChart = ({ weights }: WeightChartProps) => {
  let rgbValues = weights.decreasing() ? colors.goodGreen : colors.badRed;

  return (
    <React.Fragment>
      <ProgressInfo>
        <h1>{weights.currentValue()} lbs</h1>
        <NetChange decreasing={weights.decreasing()}>
          {weights.decreasing() ? "" : "+"}
          {weights.netChange()} lbs
          ({weights.pctChange()})
        </NetChange>
      </ProgressInfo>

      <Line
        data={{
          labels: weights.dates(),
          datasets: [
            {
              label: "David's weight",
              data: weights.weights(),
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

const ProgressInfo = styled.div`
  margin-bottom: 20px;

  h1 {
    display: inline;
  }

  p {
    display: inline;
    margin-left: 10px;
  }
`;
