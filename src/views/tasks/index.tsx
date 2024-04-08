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
    name: 'task1: image classification',
    description: 'Please write one or more of the following targets in the diagram, separated by semicolons.',
    rewards: 45,
    status: 'In Progress',
    received: false,
    images: [
      './dog.png',
      '/path/to/image2.jpg',
      // Add more image paths as required
    ],
  },
  {
    id: 2,
    name: 'task2: image detection',
    description: 'Please use a rectangular box to mark the vehicles in the following image.',
    rewards: 30,
    status: 'Reviewing',
    received: false,
    images: [
      './car.png',
      '/path/to/image2.jpg',
      // Add more image paths as required
    ],
  },
  {
    id: 3,
    name: 'task3: image translation',
    description: 'Please describe the content in the following image with a paragraph of text.',
    rewards: 20,
    status: 'Completed',
    received: false,
    images: [
      './man.png',
      '/path/to/image2.jpg',
      // Add more image paths as required
    ],
  },
  {
    id: 4,
    name: 'task4: human keypoint detection',
    description: 'Please mark the key points of the human figure in the following order: nose, left and right eyes, left and right ears, left and right shoulders, left and right elbows, left and right wrists, left and right buttocks, left and right knees, and left and right ankles.',
    rewards: 20,
    status: 'Completed',
    received: false,
    images: [
      './people.png',
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
        onReceiveTask={() => handleReceiveTask(selectedTask?.id)}
        task={selectedTask}>
        {/* Render selected task details here */}
        <h2>{selectedTask?.name}</h2>
        <p>{selectedTask?.description}</p>
        {/* Add more task details as needed */}
      </ModalTask>
    </div>
  );
};
