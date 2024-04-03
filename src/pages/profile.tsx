import type { NextPage } from "next";
import Head from "next/head";
import { ProfilePage } from "../views";

const Profile: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Deanno</title>
        <meta
          name="description"
          content="Deanno"
        />
      </Head>
      <ProfilePage />
    </div>
  );
};

export default Profile;
