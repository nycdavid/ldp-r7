import React, { useState } from "react";
import styled from "styled-components";

import TaskResource from "../../resources/task";
import { Task as _Task } from "../../resource_types";

type DataProps = {
  tasks: Array<_Task>,
  overdue_tasks: Array<_Task>,
  todays_date: string,
}

const Index = ({ data }: { data: DataProps }) => {
  const {
    tasks: _tasks,
    todays_date: todaysDate,
    overdue_tasks: _overdueTasks,
  } = data;

  const tasks: Array<TaskResource> = _tasks.map(_task => {
    return new TaskResource(_task);
  });

  const overdueTasks: Array<TaskResource> = _overdueTasks.map(_task => {
    return new TaskResource(_task);
  });

  return (
    <div>
        {overdueTasks.length !== 0 && (
          <section>
            <h1 className="display-3">Overdue</h1>
            <ul className="list-group">
              {overdueTasks.map((task: TaskResource, idx: number) => {
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
          {tasks.map((task: TaskResource, idx: number) => {
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

const Task = ({ task: _task }: { task: TaskResource }) => {
  const [task, setTask] = useState(_task);

  return (
    <TaskItem className="list-group-item" task={task}>
      <Details>
        <Check
          className="form-check-input"
          checked={task.completed()}
          onChange={(event) => {
            debugger;
          }}
          type="checkbox"
        />
        <TaskName><a href={task.routes().edit}>{task.name()}</a></TaskName>
        <TimeInfo>
          <ClockIcon className="bi bi-clock" />
          {task.startTime()} &ndash; {task.endTime()}
        </TimeInfo>
      </Details>

      <TaskInfo>{task.description()}</TaskInfo>
    </TaskItem>
  )
};

const TaskItem = styled.li<{ task: TaskResource }>`
  & > *:not(input) {
    text-decoration: ${props => !!props.task.completed() ? "line-through" : "unset"};
    opacity: ${props => !!props.task.completed() ? 0.7 : "unset"};
  }
`;

const Check = styled.input`
  align-self: center;
  margin-bottom: 4px;
  margin-right: 8px;
  cursor: pointer;
`;

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
