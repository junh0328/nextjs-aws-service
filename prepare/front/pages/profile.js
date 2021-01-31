import Head from 'next/head';
import React from 'react';
import AppLayout from '../components/AppLayout';

const Profile = () => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" />
        <title>Juneed | Profile</title>
      </Head>
      <AppLayout>
        <h1>프로필 페이지입니다!</h1>
      </AppLayout>
    </div>
  );
};

export default Profile;
