// pages/tasks/[taskId].tsx
import { Task } from 'interfaces/Task';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// Import or define the Task interface as shown above

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const TaskPage = () => {
  const router = useRouter();
  const { taskId } = router.query;
  const [task, setTask] = useState<Task | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Current image index
  const [inputValue, setInputValue] = useState('');
  const [isReceived, setIsReceived] = useState(false);

  const Image: React.FC<ImageProps> = ({ src, alt, className }) => (
    <img loading="lazy" src={src} alt={alt} className={className} />
);

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
    setIsReceived(true); 
    // alert('任务提交成功!');
    // Here, implement task submission logic
    // router.push('/tasks');
  };

  if (!task) return <p>Loading task details...</p>;

  return (
    <div className='p-5'>
      {!isReceived  ? 
      <>
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
          <div className="inline-flex">
            {currentIndex > 0 && <button onClick={handlePrevious} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
              Prev
            </button>}
            {task.images && currentIndex < task.images.length - 1 && <button onClick={handleNext} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
              Next
            </button>}
            {task.images && currentIndex === task.images.length - 1 && (
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={handleSubmit}>Submit</button>
            )}
          </div>
        </div>
      </> : 
        <div className="flex gap-1.5 self-center px-5 mt-44">
          <Image src="https://cdn.builder.io/api/v1/image/assets/TEMP/e1d88e9d106110ab92f6fa724fdf11f92ca92d242141de4940273723d38204bc?apiKey=9090ba5df68b4a4da03d4cea998d894a&" alt="" className="shrink-0 aspect-square w-[30px]" />
          <p className="my-auto">任务完成！</p>
        </div>
      }
    </div>
  );
};

export default TaskPage;
