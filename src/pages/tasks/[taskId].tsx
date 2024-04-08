// pages/tasks/[taskId].tsx
import { Task } from 'interfaces/Task';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { assert } from "chai"
import { PublicKey, Transaction, SystemProgram, Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import * as anchor from "@coral-xyz/anchor";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import idl from "../../idl/de_anno_token_program.json";
import * as spl from "@solana/spl-token"

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

  const { connection } = useConnection();
  const wallet = useWallet();
  const programId = new PublicKey('2ckWV1BszPt6hwfjyLP4FMSrR4zxbYhkXbnJcDWpq4Q7');

  // const privateKeyJson = "/Users/daniel/Code/07_Solana/.Solana_wallet/test_wallet_1.json"
  const privateKeyString = "[61,157,51,250,97,152,118,91,250,85,71,186,200,124,127,254,26,69,138,153,117,249,210,125,188,111,77,235,239,96,159,60,10,157,225,195,79,52,43,79,13,116,144,43,203,189,29,165,200,252,41,68,152,243,186,58,214,230,179,251,251,211,37,252]";
  // 将JSON字符串转换为Uint8Array
  const privateKeyUint8Array = new Uint8Array(JSON.parse(privateKeyString));
  // 从私钥创建Keypair
  const admin = anchor.web3.Keypair.fromSecretKey(privateKeyUint8Array);
  console.log("admin", admin);

  useEffect(() => {
    // Placeholder: Fetch the task by ID and set it in state
    // For this example, task data is hardcoded. Replace with your fetching logic.
    const fetchedTask: Task = {
      id: 1,
      name: 'task1',
      description: 'Please write one or more of the following targets in the diagram, separated by semicolons.',
      rewards: 50,
      status: 'In Progress',
      received: false,
      images: [
        '/1.jpg',
        '/2.jpg',
        '/3.jpg',
        '/4.jpg',
        '/5.jpg',
        '/6.jpg',
        '/7.jpg',
        '/8.jpg',
        '/9.jpg',
        '/10.jpg',
        '/11.jpg',
        '/12.jpg',
        '/13.jpg',
        '/14.jpg',
        '/15.jpg',
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
  const handleSubmit = async () => {
    setIsReceived(true); 
    // alert('任务提交成功!');
    // Here, implement task submission logic
    // router.push('/tasks');
    const provider = new anchor.AnchorProvider(connection, wallet, {});
    const program = new anchor.Program(idl as anchor.Idl, programId, provider);
    const userPublicKey = wallet.publicKey;
    const [userPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("worker"), userPublicKey.toBuffer()],
      program.programId
    );
    const [demanderPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("demander"), userPublicKey.toBuffer()],
      program.programId
    )
    const [deannoTokenMintPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("deanno")],
      program.programId
    );
    const [deannoDataPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("init")],
      program.programId
    )

    const userTokenAccount = spl.getAssociatedTokenAddressSync(
      deannoTokenMintPDA,
      wallet.publicKey
    )
    console.log('userPublicKey', userPublicKey.toBase58())
    console.log('userPDA', userPDA.toBase58())
    console.log('userTokenAccount', userTokenAccount.toBase58())

    const amount = new anchor.BN(50)
    const tx = await program.methods
      .tokenDistribution(amount)
      .accounts({
        admin: admin.publicKey,
        worker: userPublicKey,
        demander: userPublicKey,
        demanderData: demanderPDA,
        workerData: userPDA,
        initData: deannoDataPDA,
        workerTokenAccount: userTokenAccount,
        deannoTokenMint: deannoTokenMintPDA,
      })
      .signers([admin])
      .rpc()
    console.log("Your transaction signature", tx)

    // Check that 1 token was minted to the player's token account
    // assert.strictEqual(
    //   Number(
    //     (await connection.getTokenAccountBalance(workerTokenAccount)).value
    //       .amount
    //   ),
    //   50_000_000_000
    // )
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
          <p className="my-auto">Task Completed！</p>
        </div>
      }
    </div>
  );
};

export default TaskPage;
