import type { NextPage } from "next";
import Head from "next/head";
import { TasksView } from "../views";

const Tasks: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Deanno</title>
        <meta
          name="description"
          content="Deanno"
        />
      </Head>
      <TasksView />
    </div>
  );
};

export default Tasks;
