import type { NextPage } from "next";
import Head from "next/head";
import { TasksView } from "../views";

const Tasks: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta
          name="description"
          content="Solana Scaffold"
        />
      </Head>
      <TasksView />
    </div>
  );
};

export default Tasks;
