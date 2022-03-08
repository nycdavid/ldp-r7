// React
import React from "react";
import * as ReactDOM from "react-dom";

// Components
// Weights
import WeightsIndex from "./weights/index";
// Tasks
import TasksIndex from "./todo_list/tasks/index";

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.getElementById("app");
  const modelAction: string = rootEl.dataset.modelAction;
  const componentData = JSON.parse(document.getElementById("component-data").textContent)

  if (modelAction === "weights-index") {
    ReactDOM.render(<WeightsIndex data={componentData} />, rootEl);
  } else if (modelAction === "tasks-index") {
    ReactDOM.render(<TasksIndex data={componentData} />, rootEl);
  }
});
