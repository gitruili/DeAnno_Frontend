// components/TaskCard.tsx
import React from 'react';
import { Task } from '../interfaces/Task';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: Task;
}

const MyTaskCard: React.FC<TaskCardProps> = ({ task }) => {
    return (
        <div className="bg-white p-2 md:p-4 rounded-lg shadow mb-4">
          <h2 className="text-gray-600 text-base md:text-lg font-semibold">{task.name}</h2>
          <p className="text-gray-600">{task.description}</p>
          {/* Display the task status */}
          <div className={`status ${task.received ? 'text-green-500' : 'text-yellow-500'}`}>
            {task.received ? 'Completed' : task.status}
          </div>
        </div>
    );
};

export default MyTaskCard;
