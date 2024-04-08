// components/Modal.tsx
import React, { useState } from 'react';
import styles from './Modal.module.css'; // Assume CSS module for styling
import { Task } from 'interfaces/Task';
import image from 'next/image'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReceiveTask: () => void; // Function to call when receiving the task
  children?: React.ReactNode;
  task: Task;
}

interface TaskItemProps {
    taskNumber: number;
    taskContent: string;
    targets: string[];
    imageUrl: string;
}

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
  }

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onReceiveTask, children, task }) => {
    const [isReceived, setIsReceived] = useState(false);
    console.log('task', task);

    const handleReceiveTask = () => {
        onReceiveTask();
        setIsReceived(true); // Update state to show success message
    };

    if (!isOpen) return null;

    const TaskItem: React.FC<TaskItemProps> = ({ taskNumber, taskContent, targets, imageUrl }) => {
        return (
          <div className="flex flex-col px-8 py-6 bg-zinc-300">
            <div>
                {task.name}
              {/* Task{taskNumber}： {taskContent} Sample：{" "} */}
            </div>
            <img src={task.images[0]} alt="Task example" className="self-center mt-5 aspect-[1.67] w-[205px]" />
            <div className="mt-5">
                {task.description}
              {/* {targets.map((target, index) => (
                <div key={index}>Target{index + 1}：{target}</div>
              ))} */}
            </div>
            <button 
                className="hover:bg-gray-100 text-gray-800 font-semibold rounded shadow justify-center items-center self-start px-16 py-2.5 m-auto mt-32 font-bold whitespace-nowrap bg-white shadow-sm"
                onClick={handleReceiveTask}
            >
              Accept Task
            </button>
            <button 
                className="hover:bg-gray-100 text-gray-800 font-semibold rounded shadow justify-center items-center self-start px-16 py-2.5 m-auto mt-5 font-bold whitespace-nowrap bg-white shadow-sm" 
                onClick={onClose}
            >
              Go Back
            </button>
          </div>
        );
    };

    const tasks: TaskItemProps[] = [
        {
            taskNumber: 1,
            taskContent: "任务1内容xxxxxxxxx",
            targets: ["狗", "猫", "鸭"],
            imageUrl: "./dog.png",
        },
    ];

    const Image: React.FC<ImageProps> = ({ src, alt, className }) => (
        <img loading="lazy" src={src} alt={alt} className={className} />
    );

    // return (
        // <main className="flex flex-col justify-center px-12 py-9 text-xs text-black bg-white max-w-[360px]">
        //     {tasks.map((task, index) => (
        //         <TaskItem key={index} {...task} />
        //     ))}
        // </main>
    // );

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {/* <button className={styles.closeButton} onClick={onClose}>X</button> */}
                <main className="flex flex-col justify-center py-9 text-xs text-black bg-white max-w-[360px]">
                    {!isReceived ? 
                        tasks.map((task, index) => (
                            <TaskItem key={index} {...task} />
                        )) 
                        : 
                        <div className="flex gap-1.5 self-center px-5 mt-44">
                            <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/e1d88e9d106110ab92f6fa724fdf11f92ca92d242141de4940273723d38204bc?apiKey=9090ba5df68b4a4da03d4cea998d894a&" alt="" className="shrink-0 aspect-square w-[30px]" />
                            <p className="my-auto">Task Accepted！</p>
                        </div>
                    }
                </main>
                {/* {children}
                {!isReceived ? (
                    <button className={styles.receiveButton} onClick={handleReceiveTask}>Receive Task</button>
                ) : (
                    <p>Receive succeeded!</p>
                )}
                <button className={styles.closeModalButton} onClick={onClose}>Close</button> */}
            </div>
        </div>
    );
};

export default Modal;
