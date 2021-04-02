/* eslint-disable import/no-unresolved */
/* eslint-disable comma-dangle */

import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import useSWR from 'swr';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NicknameEditForm';
import { backUrl } from '../config/config';
import { DEFAULT_DONE_ACTION, LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
// import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
  const { unfollowDone, removefollowerDone, logOutDone } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (unfollowDone) {
      alert('팔로잉 제거!');
    }
  }, [unfollowDone]);

  useEffect(() => {
    if (removefollowerDone) {
      alert('팔로워 제거!');
    }
  }, [removefollowerDone]);

  useEffect(() => {
    if (logOutDone) {
      dispatch({
        type: DEFAULT_DONE_ACTION,
      });
      alert('로그아웃 성공!\n로그인 페이지로 돌아갑니다.');
      Router.replace('/');
    }
  }, [logOutDone]);

  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);

  const { data: followersData, error: followerError } = useSWR(
    `${backUrl}/user/followers?limit=${followersLimit}`,
    fetcher,
  );
  const { data: followingsData, error: followingError } = useSWR(
    `${backUrl}/user/followings?limit=${followingsLimit}`,
    fetcher,
  );

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, []);

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, []);

  // if (!me) {
  //   return dispatch({
  //     type: LOAD_MY_INFO_REQUEST,
  //   });
  // }

  if (followerError || followingError) {
    console.log(followerError || followingError);
    return <div>팔로잉/팔로우 로딩 중 에러가 발생합니다</div>;
  }

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" />
        <title>Juneed | Profile</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList
          header="팔로잉 목록"
          data={followingsData}
          onClickMore={loadMoreFollowings}
          loading={!followingsData && !followerError}
        />
        <FollowList
          header="팔로워 목록"
          data={followersData}
          onClickMore={loadMoreFollowers}
          loading={!followersData && !followingError}
        />
      </AppLayout>
    </div>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start');
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});
export default Profile;
