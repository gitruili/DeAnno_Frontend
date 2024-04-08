// components/TaskCard.tsx
import React from 'react';
import { Task } from '../interfaces/Task';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
}

const statusMapping = {
  'In Progress': 'In Progress',
  'Reviewing': 'Reviewing',
  'Completed': 'Completed'
};

const MyTaskCard: React.FC<TaskCardProps> = ({ task }) => {
    return (
        <div className={`${styles.taskCard}`}>
          <h2 className="text-base md:text-lg font-semibold">{task.name}</h2>
          <p>{task.description}</p>
          {/* Display the task status */}
          <div className={`status ${task.received ? 'text-green-500' : 'text-yellow-500'}`}>
            {task.received ? 'Completed' : statusMapping[task.status]}
          </div>
        </div>
    );
};

export default MyTaskCard;
