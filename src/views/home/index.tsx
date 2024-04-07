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

import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
// import { DeAnnoTokenProgram } from 'models/de_anno_token_program';
import { assert } from "chai"
import { PublicKey, Transaction, SystemProgram, Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import idl from "../../idl/de_anno_token_program.json";

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

  // const connection = new Connection('https://api.devnet.solana.com');
  const programId = new PublicKey('2ckWV1BszPt6hwfjyLP4FMSrR4zxbYhkXbnJcDWpq4Q7');

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

  useEffect(() => {
    const init = async () => {
      if (wallet.publicKey) {
        const withdraw_limit_init = new anchor.BN(100);
        const provider = new anchor.AnchorProvider(connection, wallet, {});
        const program = new anchor.Program(idl as anchor.Idl, programId, provider);
  
        // Use the connected user's publicKey directly
        // No need to generate a new Keypair
        const userPublicKey = wallet.publicKey;
  
        // PDA for the data account using the user's publicKey
        const [userPDA] = anchor.web3.PublicKey.findProgramAddressSync(
          [Buffer.from("worker"), userPublicKey.toBuffer()],
          program.programId
        );
  
        try {
          const tx = await program.methods
            .initDemander(withdraw_limit_init)
            .accounts({
              worker: userPublicKey, // Use userPublicKey here
              workerData: userPDA,
            })
            // No need to include "signers" here as the transaction will be signed by the connected wallet
            .rpc();
          console.log("Your transaction signature", tx);
  
          const userData = await program.account.workerData.fetch(userPDA);
          // assert.strictEqual(
          //   Number(
          //     userData.withdrawPercent
          //   ),
          //   50
          // )
          // Use userData as needed
        } catch (error) {
          console.error("Error in transaction:", error);
        }
      }
    };
  
    init(); // Call the async function
  }, [wallet.publicKey, connection]); // Depend on wallet.publicKey and connection  

  // useEffect(() => {
  //   const init = async () => {
  //     if (wallet.publicKey) {
  //       const withdraw_limit_init = new anchor.BN(100);
  //       const provider = new anchor.AnchorProvider(connection, wallet, {});
  //       const program = new anchor.Program(idl as anchor.Idl, programId, provider);
    
  //       const worker = anchor.web3.Keypair.generate();
  //       // PDA for the data account
  //       const [workerPDA] = anchor.web3.PublicKey.findProgramAddressSync(
  //         [Buffer.from("worker"), worker.publicKey.toBuffer()],
  //         program.programId
  //       );
    
  //       try {
  //         const tx = await program.methods
  //           .initWorker(withdraw_limit_init)
  //           .accounts({
  //             worker: worker.publicKey,
  //             workerData: workerPDA,
  //           })
  //           .signers([worker])
  //           .rpc();
  //         console.log("Your transaction signature", tx);
    
  //         const workerData = await program.account.workerData.fetch(workerPDA);
  //         // Use workerData as needed
  //       } catch (error) {
  //         console.error("Error in transaction:", error);
  //       }
  //     }
  //   };
  
  //   init(); // Call the async function
  // }, [wallet.publicKey, connection]); // Depend on wallet.publicKey and connection

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
  );
};
