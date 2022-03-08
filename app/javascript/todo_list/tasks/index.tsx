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
  tasks: Array<Task>,
  overdue_tasks: Array<Task>,
  todays_date: string,
}

const Index = ({ data }: { data: DataProps }) => {
  const {
    tasks,
    todays_date: todaysDate,
    overdue_tasks: overdueTasks,
  } = data;

  return (
    <div>
        {overdueTasks.length !== 0 && (
          <section>
            <h1 className="display-3">Overdue</h1>
            <ul className="list-group">
              {overdueTasks.map((task: Task, idx: number) => {
                return (<Task task={task} key={idx} />)
              })}
            </ul>
          </section>
        )}
      <section>
        <h1 className="display-3">
          Today
          <H1Subtext className="text-muted">{todaysDate}</H1Subtext>
        </h1>
        <ul className="list-group">
          {tasks.map((task: Task, idx: number) => {
            return (<Task task={task} key={idx} />)
          })}
        </ul>
      </section>
    </div>
  );
}

const H1Subtext = styled.small`
  font-size: 0.6em;
  margin-left: 20px;
`;

const Task = ({ task }: { task: Task }) => {
  return (
    <li className="list-group-item">
      <p>
        Name:&nbsp;
        <a href={task.routes.edit}>{task.name}</a>
      </p>
      <p>Description: {task.description}</p>
      <p>Start time: {task.start_time}</p>
      <p>End time: {task.end_time}</p>
      <p>Completed: {task.completed ? "true" : "false"}</p>
    </li>
  )
};

export default Index;
