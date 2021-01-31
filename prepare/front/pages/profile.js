import Head from 'next/head';
import React from 'react';

import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => {
  const followingList = [{ nickname: '네로초' }, { nickname: '양초' }, { nickname: '제로초' }, { nickname: '부기초' }];
  const followerList = [{ nickname: '네로초' }, { nickname: '양초' }, { nickname: '제로초' }, { nickname: '부기초' }];

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" />
        <title>Juneed | Profile</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </div>
  );
};

export default Profile;
