import React from "react";
import styled from "styled-components";

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

type DataProps = {
  tasks: Array<Task>
}

const Index = ({ data }: { data: DataProps }) => {
  const { tasks } = data;

  return (
    <section>
      <h1 className="display-3">
        Today
        <H1Subtext className="text-muted">Tue Mar 8</H1Subtext>
      </h1>
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

const H1Subtext = styled.small`
  font-size: 0.6em;
  margin-left: 20px;
`;

export default Index;
