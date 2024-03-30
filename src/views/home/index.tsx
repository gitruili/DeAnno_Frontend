// Next, React
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
import { Task } from 'interfaces/Task';
import TaskCard from 'components/TaskCard';
import BottomMenuBar from 'components/BottomMenuBar';
import Modal from 'components/Modal';

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

export const HomeView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()

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
    // Close the modal after marking as received or handle UI feedback within the modal
  };

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

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
          <TaskCard task={task} />
        </div>
        // <TaskCard key={task.id} task={task} />
      ))}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)}
        onReceiveTask={() => handleReceiveTask(selectedTask?.id)}>
        {/* Render selected task details here */}
        <h2>{selectedTask?.name}</h2>
        <p>{selectedTask?.description}</p>
        {/* Add more task details as needed */}
      </Modal>
    </div>
    
    // <div className="flex flex-row justify-center">
    //   <div className="relative group items-center">
    //       <div className="m-1 absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 
    //       rounded-lg blur opacity-20 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
    //       <button
    //           className="group w-60 m-2 btn animate-pulse bg-gradient-to-br from-indigo-500 to-fuchsia-500 hover:from-white hover:to-purple-300 text-black"
    //       >
    //           <div className="hidden group-disabled:block">
    //               Wallet not connected
    //           </div>
    //           <span className="block group-disabled:hidden" > 
    //               Sign Message 
    //           </span>
    //       </button>
    //   </div>
    // </div>
    // <div className="md:hero mx-auto p-4">
    //   <div className="md:hero-content flex flex-col">
    //     <div className='mt-6'>
    //     <div className='text-sm font-normal align-bottom text-right text-slate-600 mt-4'>v{pkg.version}</div>
    //     <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mb-4">
    //       Solana Next
    //     </h1>
    //     </div>
    //     <h4 className="md:w-full text-2x1 md:text-4xl text-center text-slate-300 my-2">
    //       <p>Unleash the full power of blockchain with Solana and Next.js 13.</p>
    //       <p className='text-slate-500 text-2x1 leading-relaxed'>Full-stack Solana applications made easy.</p>
    //     </h4>
    //     <div className="relative group">
    //       <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-indigo-500 rounded-lg blur opacity-40 animate-tilt"></div>
    //       <div className="max-w-md mx-auto mockup-code bg-primary border-2 border-[#5252529f] p-6 px-10 my-2">
    //         <pre data-prefix=">">
    //           <code className="truncate">{`npx create-solana-dapp <dapp-name>`} </code>
    //         </pre>
    //       </div>
    //     </div>
    //     <div className="flex flex-col mt-2">
    //       <RequestAirdrop />
    //       <h4 className="md:w-full text-2xl text-slate-300 my-2">
    //       {wallet &&
    //       <div className="flex flex-row justify-center">
    //         <div>
    //           {(balance || 0).toLocaleString()}
    //           </div>
    //           <div className='text-slate-600 ml-2'>
    //             SOL
    //           </div>
    //       </div>
    //       }
    //       </h4>
    //     </div>
    //   </div>
    // </div>
  );
};
