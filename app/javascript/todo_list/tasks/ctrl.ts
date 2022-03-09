import axios from "axios";
import Task from "../../resources/task";

export default class TasksCtrl {
  async update(task: Task, attrs): Promise<Task> {
    const response = await axios.put(
      task.routes().update,
      {
        headers: {
          "ACCEPT": "application/json",
          "Content-Type": "application/json",
        },
        data: { task: { ...attrs } },
      },
    )

    const resp = response.data;

    return new Task(resp);
  }
}
