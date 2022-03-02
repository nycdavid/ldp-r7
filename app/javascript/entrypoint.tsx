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

import Weights from "./weights";
import WeightsRequest from "./weights_request";

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("app");
  const measurements = JSON.parse(document.getElementById("weight-data").textContent)
  const routes = JSON.parse(document.getElementById("routes").textContent)
  const weights: Weights = new Weights(measurements);
  ReactDOM.render(
    <WeightChart
      weights={weights}
      weightsRequest={new WeightsRequest(routes)}
    />, rootEl
  );
});

interface WeightChartProps {
  weights: Weights,
  weightsRequest: WeightsRequest,
}

const colors = {
  goodGreen: [24, 128, 56],
  badRed: [217, 48, 37],
}

const WeightChart = ({ weights, weightsRequest }: WeightChartProps) => {
  let rgbValues = weights.decreasing() ? colors.goodGreen : colors.badRed;
  const [weightsState, setWeights] = useState(weights);

  return (
    <React.Fragment>
      <ProgressInfo>
        <h1>{weightsState.currentValue()} lbs</h1>
        <NetChange decreasing={weightsState.decreasing()}>
          {weightsState.decreasing() ? "" : "+"}
          {weightsState.netChange()} lbs
          ({weightsState.pctChange()})
        </NetChange>
        <DateRangePicker
          onClick={async (data) => {
            const w = await weightsRequest.index("david", data)
            setWeights(w);
          }}
        />
      </ProgressInfo>

      <Line
        data={{
          labels: weightsState.dates(),
          datasets: [
            {
              label: "David's weight",
              data: weightsState.weights(),
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

const DateRangePicker = ({ onClick }: { onClick: (data: number) => void }) => {
  const ranges = {
    "7D": 7,
    "2W": 7 * 2,
    "3W": 7 * 3,
    "1M": 7 * 4,
    "6M": 7 * 4 * 6,
    "1Y": 365,
  }

  const DateButtons = styled.section`
    li {
      margin-right: 7px;
    }

    button {
      font-size: 12px;
      padding: 2px 8px;
    }
  `;

  return (
    <DateButtons>
      <ul className="nav nav-pills">
        {
          Object.keys(ranges).map((rangeDisplayVal, idx) => {
            const dayValue = ranges[rangeDisplayVal];

            return (
              <li className="nav-item" key={idx}>
                <button
                  className="nav-link"
                  onClick={() => { onClick(dayValue) }}
                >
                  {rangeDisplayVal}
                </button>
              </li>
            );
          })
        }
      </ul>
    </DateButtons>
  )
}
