/* eslint-disable no-unused-vars */
// post/[id].js

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';

import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';

import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

const Post = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  });

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" />
        <title>Juneed | {singlePost.User.nickname}님의 글</title>
        <meta name="description" content={singlePost.content} />
        <meta property="og:description" content={singlePost.content} />
      </Head>
      <AppLayout>
        <PostCard post={singlePost} />
      </AppLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  // console.log('context 출력');
  // console.log(context);

  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });

  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.params.id,
    // 동적 라우팅에서 data에 접근할 때는, context.query 또는 context.params 등으로 접근합니다.
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Post;
