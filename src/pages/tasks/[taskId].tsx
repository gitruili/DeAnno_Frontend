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
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Placeholder: Fetch the task by ID and set it in state
    // For this example, task data is hardcoded. Replace with your fetching logic.
    const fetchedTask: Task = {
      id: 1,
      name: '任务示例1',
      description: '任务说明：填写图中的物体.',
      rewards: 50,
      status: 'In Progress',
      received: false,
      images: [
        '/dog.jpg',
        '/plane.jpg',
        // Add more image paths as required
      ],
    };

    if (taskId) {
      setTask(fetchedTask);
      setInputValue('');
    }
  }, [taskId]);

  // Navigate to the previous image
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
    setInputValue('');
  };

  // Navigate to the next image
  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setInputValue('');
  };

  // Submit task completion (example functionality)
  const handleSubmit = () => {
    alert('任务提交成功!');
    // Here, implement task submission logic
    router.push('/tasks');
  };

  if (!task) return <p>Loading task details...</p>;

  return (
    <div>
      <h1>{task.name}</h1>
      <p>{task.description}</p>
      {task.images && task.images.length > 0 && (
        <img src={task.images[currentIndex]} alt={`Task Image ${currentIndex + 1}`} />
      )}
      <input 
        className={`text-black box-border flex relative flex-col shrink-0 p-2.5 mt-5 rounded border border-solid border-stone-300`}
        value={inputValue} // Bind state to input value
        onChange={(e) => setInputValue(e.target.value)} // Update state on input change
      />
      <div className={`mt-3`}>
        {currentIndex > 0 && (
          <button onClick={handlePrevious}>Previous</button>
        )}
        {task.images && currentIndex < task.images.length - 1 && (
          <button onClick={handleNext}>Next</button>
        )}
        {task.images && currentIndex === task.images.length - 1 && (
          <button className={`ml-6`} onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default TaskPage;
