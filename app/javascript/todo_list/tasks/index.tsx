import React from "react";

type Task = {
  id: number,
  name: string,
  description: string,
  start_time: string,
  end_time: string,
  completed: boolean,
  routes: {
    show: string,
    update: string,
    delete: string,
    edit: string,
  },
}

const Index = ({ tasks }: { tasks: Array<Task> }) => {
  return (
    <section>
      <h1>Tasks</h1>
      {tasks.map((task: Task, idx: number) => {
        return (
          <div key={idx}>
            <p>
              Name:&nbsp;
              <a href={task.routes.edit}>{task.name}</a>
            </p>
            <p>Description: {task.description}</p>
            <p>Start time: {task.start_time}</p>
            <p>End time: {task.end_time}</p>
            <p>Completed: {task.completed ? "true" : "false"}</p>
          </div>
        )
      })}
    </section>
  );
}

export default Index;
