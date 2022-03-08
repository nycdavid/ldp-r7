import React, { useState } from "react";
import styled from "styled-components"

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

import { Weight as _Weight, User as _User } from "../resource_types";
import Weight from "../resources/weight";
import WeightsCollection from "./weights_collection";
import WeightsCtrl from "./request";

import DateRangePicker from "../date_range_picker";

type DataProps = {
  weights: Array<_Weight>,
  user: _User,
  routes: {
    new: string,
    index: string,
  }
}

const Index = ({ data }: { data: DataProps }) => {
  const { weights: _weights, user, routes } = data;
  const propWeights = _weights.map(_weight => (new Weight(_weight)));
  const weightsColl = new WeightsCollection(propWeights);
  const ctrl = new WeightsCtrl(routes);
  const [weights, setWeights] = useState(weightsColl);
  const color = weights.decreasing() ? `rgb(24, 128, 56)` : `rgb(217, 48, 37)`

  return (
    <section>
      <a className="btn btn-primary" href={routes.new}>Weigh in</a>
      <ProgressInfo>
        <h1>{weightsColl.currentValue()} lbs</h1>
        <NetChange color={color}>
          {weightsColl.decreasing() ? "" : "+"}
          {weightsColl.netChange()} lbs
          ({weightsColl.pctChange()})
        </NetChange>
        <DateRangePicker
          clickHandler={async (data, afterClick) => {
            const resp = await ctrl.index("david", data);
            setWeights(resp);
            afterClick();
          }}
        />
        <Line
          data={{
            labels: weights.dates(),
            datasets: [
              {
                label: "David's weight",
                data: weights.weights(),
                borderColor: color,
                backgroundColor: color,
              }
            ],
          }}
        />
      </ProgressInfo>
    </section>
  );
}

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

const NetChange = styled.p<{ color: string }>`
  color: ${props => props.color};
  font-size: 18px;
`;

export default Index;
