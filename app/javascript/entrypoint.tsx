// React
import React, { useState } from "react";
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

// Project files
// Components
import Weights from "./weights";
import WeightsNew from "./weights/new";

import WeightsRequest from "./weights_request";
import DateRangePicker from "./date_range_picker";

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("app");
  const modelAction: string = rootEl.dataset.modelAction;

  const measurements = JSON.parse(document.getElementById("weight-data").textContent)
  const routes = JSON.parse(document.getElementById("routes").textContent)
  const weights: Weights = new Weights(measurements);
  ReactDOM.render(
    <WeightChart
      initialWeights={weights}
      weightsRequest={new WeightsRequest(routes)}
    />, rootEl
  );
});

interface WeightChartProps {
  initialWeights: Weights,
  weightsRequest: WeightsRequest,
}

const colors = {
  goodGreen: [24, 128, 56],
  badRed: [217, 48, 37],
}

const WeightChart = ({ initialWeights, weightsRequest }: WeightChartProps) => {
  let rgbValues = initialWeights.decreasing() ? colors.goodGreen : colors.badRed;
  const [weights, setWeights] = useState(initialWeights);

  return (
    <React.Fragment>
      <ProgressInfo>
        <h1>{weights.currentValue()} lbs</h1>
        <NetChange decreasing={weights.decreasing()}>
          {weights.decreasing() ? "" : "+"}
          {weights.netChange()} lbs
          ({weights.pctChange()})
        </NetChange>
        <DateRangePicker
          onClick={async (data, afterClick) => {
            const w = await weightsRequest.index("david", data)
            setWeights(w);
            afterClick();
          }}
        />
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

const NetChange = styled.p<{ decreasing: boolean }>`
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
