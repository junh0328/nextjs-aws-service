/* eslint-disable no-alert */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable space-infix-ops */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { END } from 'redux-saga';
import axios from 'axios';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { DEFAULT_POST_ACTION, LOAD_POSTS_REQUEST } from '../reducers/post';
import { DEFAULT_DONE_ACTION, LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import ArrowUp from '../components/ArrowUp';

const main = () => {
  const { me, logOutDone } = useSelector((state) => state.user);
  const {
    mainPosts,
    hasMorePosts,
    loadPostsLoading,
    retweetError,
    retweetDone,
    addCommentError,
    likePostError,
    unlikePostError,
    addPostError,
  } = useSelector((state) => state.post);
  // const mainPosts = useSelector((state)=> state.post.mainPosts) 구조분해를 하지 않으면 다음과 같이 표현할 수 있다.
  const dispatch = useDispatch();

  useEffect(() => {
    if (addPostError) {
      alert(addPostError);
    }
  }, [addPostError]);

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
      setTimeout(() => {
        dispatch({ type: DEFAULT_POST_ACTION });
      }, 1000);
    }
  }, [retweetError]);

  useEffect(() => {
    if (addCommentError) {
      alert(addCommentError);
    }
  }, [addCommentError]);

  useEffect(() => {
    if (likePostError) {
      alert(likePostError);
    }
  }, [likePostError]);

  useEffect(() => {
    if (unlikePostError) {
      alert(unlikePostError);
    }
  }, [unlikePostError]);

  useEffect(() => {
    if (retweetDone) {
      alert('리트윗 성공! \n포스트 상단에서 리트윗된 게시물을 확인하세요!');
      setTimeout(window.scrollTo(0, 0), 1000);
      // 포스트 최상단으로 이동
      dispatch({ type: DEFAULT_POST_ACTION });
    }
  }, [retweetDone]);

  useEffect(() => {
    if (logOutDone) {
      dispatch({
        type: DEFAULT_DONE_ACTION,
      });
      alert('로그아웃 성공!\n로그인 페이지로 돌아갑니다.');
      Router.replace('/');
    }
  }, [logOutDone]);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  // 제일 처음 mainPosts가 빈 배열일 때 실행됨

  useEffect(() => {
    function onScroll() {
      // console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          // console.log('메인 포스트의 길이는 ? ');
          // console.log(mainPosts.length);
          // console.log(mainPosts[mainPosts.length]);
          // console.log(`lastId는 ? ${lastId}`);
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" />
        <title>Juneed | main</title>
      </Head>
      <AppLayout>
        {me && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
      <ArrowUp />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  // console.log(context);

  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default main;

/*
  getServerSideProps와 같은 SSR은 결과적으로 서버 쪽에서 실행되기 때문에, 내 계정으로 사용할 때만 쿠키를 그대로 사용하고
  그렇지 않을 경우에는 쿠키를 초기화해 줘야 한다.

  쿠키를 초기화하지 않을 경우, 같은 도메인에 접속한 다른 사람이 내 쿠키(정보)를 바탕으로 우리가 제공하는 서비스를 실행할 수도 있기 때문에
  치명적인 오류로 작용할 수 있다.
*/
