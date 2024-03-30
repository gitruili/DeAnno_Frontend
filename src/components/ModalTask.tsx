// components/Modal.tsx
import React, { useState } from 'react';
import styles from './Modal.module.css'; // Assume CSS module for styling

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReceiveTask: () => void; // Function to call when receiving the task
  children: React.ReactNode;
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


const ModalTask: React.FC<ModalProps> = ({ isOpen, onClose, onReceiveTask, children }) => {
    const [isReceived, setIsReceived] = useState(false);

    const handleReceiveTask = () => {
        onReceiveTask();
        setIsReceived(true); // Update state to show success message
    };

    const TaskItem: React.FC<TaskItemProps> = ({ taskNumber, taskContent, targets, imageUrl }) => {
        return (
          <div className="flex flex-col px-8 py-6 bg-zinc-300">
            <div>
              任务{taskNumber}： {taskContent} 示例：{" "}
            </div>
            <img src={imageUrl} alt="Task example" className="self-center mt-5 aspect-[1.67] w-[205px]" />
            <div className="mt-5">
              {targets.map((target, index) => (
                <div key={index}>目标{index + 1}：{target}</div>
              ))}
            </div>
            <button 
                className="justify-center items-center self-start px-16 py-2.5 mt-32 font-bold whitespace-nowrap bg-white shadow-sm"
                onClick={handleReceiveTask}
            >
              开始任务
            </button>
            <button 
                className="justify-center items-center self-start px-16 py-2.5 mt-5 font-bold whitespace-nowrap bg-white shadow-sm" 
                onClick={onClose}
            >
              返回列表
            </button>
          </div>
        );
    };

    const tasks: TaskItemProps[] = [
        {
            taskNumber: 1,
            taskContent: "任务1内容xxxxxxxxx",
            targets: ["狗", "猫", "鸭"],
            imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/0f497993b10427de2a057d68ecd4211d2c30a3e2f82ad2ef479c75686686349a?apiKey=9090ba5df68b4a4da03d4cea998d894a&",
        },
    ];

    const Image: React.FC<ImageProps> = ({ src, alt, className }) => (
        <img loading="lazy" src={src} alt={alt} className={className} />
    );

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>X</button>
                {/* {children} */}
                {tasks.map((task, index) => (
                            <TaskItem key={index} {...task} />
                        ))}
                {/* {!isReceived ? (
                    // Show "Receive Task" button if task hasn't been received yet
                    <button className={styles.receiveButton} onClick={handleReceiveTask}>Start Task</button>
                ) : (
                    // Show success message if task has been received
                    <p>Receive succeeded!</p>
                )} */}
                {/* Close modal button */}
                {/* <button className={styles.closeModalButton} onClick={onClose}>Close</button> */}
            </div>
        </div>
    );
};

export default ModalTask;
