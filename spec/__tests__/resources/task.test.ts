import { DateTime } from "luxon";

import Task from "../../../app/javascript/resources/task";
import { Task as _Task } from "../../../app/javascript/resource_types";

import Factory from "../factories";

describe("Task", () => {
  test("has all passed attributes", () => {
    const data: _Task = Factory.attributesFor("task")
    const task: Task = new Task(data)

    expect(task.id()).toEqual(data.id);
    expect(task.name()).toEqual(data.name);
    expect(task.description()).toEqual(data.description);
    expect(task.startTime()).toEqual(data.start_time);
    expect(task.endTime()).toEqual(data.end_time);
    expect(task.completedAt()).toEqual("");
    expect(task.completed()).toEqual(false);
  });
});
