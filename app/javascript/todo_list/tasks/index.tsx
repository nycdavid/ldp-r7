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

type IndexProps = {
  data: {
    tasks: Array<Task>,
    header: Array<string>,
  }
}

const Index = ({ data }: IndexProps) => {
  const { tasks } = data;
  const [headerMain, headerSubtext] = data.header;

  return (
    <section>
      <h1 className="display-1">
        {headerMain}&nbsp;
        <HeaderSubtext className="text-muted">{headerSubtext}</HeaderSubtext>
      </h1>
      <ul className="list-group">
        {tasks.map((task: Task, idx: number) => {
          return (<Task task={task} key={idx} />)
        })}
      </ul>
    </section>
  );
}

const HeaderSubtext = styled.small`
  font-size: 0.6em;
`;

const Task = ({ task }: { task: Task }) => {
  return (
    <li className="list-group-item">
      <p><a href={task.routes.edit}>{task.name}</a></p>
      <p>Description: {task.description}</p>
      <p>Start time: {task.start_time}</p>
      <p>End time: {task.end_time}</p>
      <p>Completed: {task.completed ? "true" : "false"}</p>
    </li>
  );
}

export default Index;
