// components/TaskCard.tsx
import React from 'react';
import { Task } from '../interfaces/Task';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className={`${styles.taskCard}`}>
      <h2>{task.name}</h2>
      <p>{task.description}</p>
      <div>Rewards: {task.rewards} DAN</div>
      {/* <div>Status: {task.status}</div> */}
      {/* Add buttons or actions here */}
    </div>
  );
};

export default TaskCard;
