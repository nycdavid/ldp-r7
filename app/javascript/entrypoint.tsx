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

import TasksIndex from "./todo_list/tasks/index";

import WeightsRequest from "./weights_request";
import DateRangePicker from "./date_range_picker";

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("app");
  const modelAction: string = rootEl.dataset.modelAction;
  const componentData = JSON.parse(document.getElementById("component-data").textContent)
  const routes = JSON.parse(document.getElementById("routes").textContent)

  if (modelAction === "weights-index") {
    ReactDOM.render(
      <WeightChart
        data={componentData}
        weightsRequest={new WeightsRequest(routes)}
      />, rootEl
    );
  } else if (modelAction === "tasks-index") {
    // ReactDOM.render(<TasksIndex data={componentData} />, rootEl);
  }
});

const colors = {
  goodGreen: [24, 128, 56],
  badRed: [217, 48, 37],
}

const WeightChart = ({ data, weightsRequest }) => {
  const { weights: dataWeights, user, routes } = data;
  const initialWeights = new Weights(dataWeights);
  const [weights, setWeights] = useState(initialWeights);
  const { name: userName } = user;
  let rgbValues = initialWeights.decreasing() ? colors.goodGreen : colors.badRed;

  return (
    <React.Fragment>
      <h1>{userName}</h1>
      <a href={routes.new} className="btn btn-primary">Weigh in</a>
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
