import React, { useState } from "react";
import styled from "styled-components";

import TaskResource from "../../resources/task";
import { Task as _Task } from "../../resource_types";

import TasksCtrl from "./ctrl";

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

  const tasksCtrl = new TasksCtrl();

  return (
    <div>
        {overdueTasks.length !== 0 && (
          <section>
            <h1 className="display-3">Overdue</h1>
            <ul className="list-group">
              {overdueTasks.map((task: TaskResource, idx: number) => {
                return (<Task task={task} key={idx} tasksCtrl={tasksCtrl} />)
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
            return (<Task task={task} key={idx} tasksCtrl={tasksCtrl} />)
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

type TaskProps = {
  task: TaskResource,
  tasksCtrl: TasksCtrl,
}

const Task = ({ task: _task, tasksCtrl }: TaskProps) => {
  const [task, setTask] = useState(_task);

  return (
    <TaskItem
      id={`task-${task.id()}`}
      className="list-group-item" task={task}
    >
      <Details className={task.completed() ? "completed" : ""}>
        <Check
          className="form-check-input"
          checked={task.completed()}
          onChange={async (event) => {
            const checked = event.target.checked;
            const updatedTask = await tasksCtrl.
              update(task, { completed: checked });

            setTask(updatedTask);
          }}
          type="checkbox"
        />
        <TaskName><a href={task.routes().edit}>{task.name()}</a></TaskName>
        <TimeInfo task={task}>
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

const TimeInfo = styled.p<{ task: TaskResource }>`
  font-size: 13.5px;
  margin-left: 10px;
  margin-bottom: 2px;
  color: ${props => props.task.overdue() ? "#d1453b" : "unset"};
`;

const ClockIcon = styled.i`
  margin-right: 5px;
`;

const Details = styled.div`
  display: flex;
  align-items: end;
`;

export default Index;
