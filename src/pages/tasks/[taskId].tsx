// pages/tasks/[taskId].tsx
import { Task } from 'interfaces/Task';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// Import or define the Task interface as shown above

const TaskPage = () => {
  const router = useRouter();
  const { taskId } = router.query;
  const [task, setTask] = useState<Task | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Current image index

  useEffect(() => {
    // Placeholder: Fetch the task by ID and set it in state
    // For this example, task data is hardcoded. Replace with your fetching logic.
    const fetchedTask: Task = {
      id: 1,
      name: 'Sample Task',
      description: 'This is a sample task description.',
      rewards: 50,
      status: 'In Progress',
      received: false,
      images: [
        '/path/to/image1.jpg',
        '/path/to/image2.jpg',
        // Add more image paths as required
      ],
    };

    if (taskId) setTask(fetchedTask);
  }, [taskId]);

  // Navigate to the previous image
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // Navigate to the next image
  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Submit task completion (example functionality)
  const handleSubmit = () => {
    alert('Task Submitted!');
    // Here, implement task submission logic
  };

  if (!task) return <p>Loading task details...</p>;

  return (
    <div>
      <h1>{task.name}</h1>
      <p>{task.description}</p>
      {task.images && task.images.length > 0 && (
        <img src={task.images[currentIndex]} alt={`Task Image ${currentIndex + 1}`} />
      )}
      <div>
        {currentIndex > 0 && (
          <button onClick={handlePrevious}>Previous</button>
        )}
        {task.images && currentIndex < task.images.length - 1 && (
          <button onClick={handleNext}>Next</button>
        )}
        {task.images && currentIndex === task.images.length - 1 && (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default TaskPage;
