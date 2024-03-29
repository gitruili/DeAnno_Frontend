import type { NextPage } from "next";
import Head from "next/head";
import { ProfilePage } from "../views";

const Profile: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta
          name="description"
          content="Solana Scaffold"
        />
      </Head>
      <ProfilePage />
    </div>
  );
};

export default Profile;
