import React from "react";
import styled from "styled-components";

import Task from "../../resources/task";

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
      <Details>
        <TaskName><a href={task.routes.edit}>{task.name}</a></TaskName>
        <TimeInfo>
          <ClockIcon className="bi bi-clock" />
          {task.start_time} &ndash; {task.end_time}
        </TimeInfo>
      </Details>

      <TaskInfo>{task.description}</TaskInfo>
    </li>
  )
};

const TaskName = styled.p`
  font-size: 20px;
  margin-bottom: 0;
`;

const TaskInfo = styled.p`
  font-size: 15px;
  margin-bottom: 0;
`;

const TimeInfo = styled.p`
  font-size: 14px;
  margin-left: 10px;
  margin-bottom: 2px;
`;

const ClockIcon = styled.i`
  margin-right: 5px;
`;

const Details = styled.div`
  display: flex;
  align-items: end;
`;

export default Index;
