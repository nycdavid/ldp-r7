import { DateTime } from "luxon";

import Task, { DTFormat } from "../../../app/javascript/resources/task";
import { Task as _Task } from "../../../app/javascript/resource_types";

import Factory from "../factories";

describe("Task", () => {
  const formatFromISO = (isoStr: string): string => {
    return DateTime.fromISO(isoStr).toFormat(DTFormat);
  }

  test("has all passed attributes", () => {
    const data: _Task = Factory.attributesFor("task");
    const task: Task = new Task(data)

    expect(task.id()).toEqual(data.id);
    expect(task.name()).toEqual(data.name);
    expect(task.description()).toEqual(data.description);
    expect(task.startTime()).toEqual(formatFromISO(data.start_time));
    expect(task.endTime()).toEqual(formatFromISO(data.end_time));
    expect(task.completedAt()).toEqual("");
    expect(task.completed()).toEqual(false);
  });

  describe("#overdue", () => {
    test("returns true if the task's end time has passed", () => {
      const pastTime = DateTime.now().setZone("UTC").minus({ hours: 3 });
      const data: _Task = Factory.attributesFor(
        "task",
        {
          start_time: pastTime.toISO(),
          end_time: pastTime.plus({ hours: 1 }).toISO(),
        },
      );

      const task = new Task(data);

      expect(task.overdue()).toEqual(true);
    });
  });
});
