// Next, React
import { FC, useState } from 'react';
// Store
import { Task } from 'interfaces/Task';
import Modal from 'components/Modal';
import MyTaskCard from 'components/MyTaskCard';
import { useRouter } from 'next/router';
import ModalTask from 'components/ModalTask';

// Sample task data
const sampleTasks: Task[] = [
  {
    id: 1,
    name: '图片识别1',
    description: '识别图片中的物体.',
    rewards: 45,
    status: 'In Progress',
    received: false,
    images: [
      '/path/to/image1.jpg',
      '/path/to/image2.jpg',
      // Add more image paths as required
    ],
  },
  {
    id: 2,
    name: '图片识别2',
    description: '识别图片中的物体.',
    rewards: 30,
    status: 'Reviewing',
    received: false,
    images: [
      '/path/to/image1.jpg',
      '/path/to/image2.jpg',
      // Add more image paths as required
    ],
  },
  {
    id: 3,
    name: '图片识别3',
    description: '识别图片中的物体.',
    rewards: 20,
    status: 'Completed',
    received: false,
    images: [
      '/path/to/image1.jpg',
      '/path/to/image2.jpg',
      // Add more image paths as required
    ],
  },
];

export const TasksView: FC = ({ }) => {
  const router = useRouter(); // Use the useRouter hook
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [tasks, setTasks] = useState<Task[]>(sampleTasks);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleReceiveTask = (taskId: number) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, received: true };
      }
      return task;
    });
  
    setTasks(updatedTasks);
    router.push(`/tasks/${taskId}`); // Navigate to the task detail page
    // Close the modal after marking as received or handle UI feedback within the modal
  };

  const Card = ({ title, content }) => {
    return (
      // Added responsive padding classes
      <div className="bg-white p-2 md:p-4 rounded-lg shadow mb-4">
        <h2 className="text-base md:text-lg font-semibold">{title}</h2>
        <p className="text-gray-600">{content}</p>
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} onClick={() => handleTaskClick(task)}>
          <MyTaskCard task={task} />
        </div>
        // <TaskCard key={task.id} task={task} />
      ))}
      <ModalTask 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)}
        onReceiveTask={() => handleReceiveTask(selectedTask?.id)}>
        {/* Render selected task details here */}
        <h2>{selectedTask?.name}</h2>
        <p>{selectedTask?.description}</p>
        {/* Add more task details as needed */}
      </ModalTask>
    </div>
  );
};
