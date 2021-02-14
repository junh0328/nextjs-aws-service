/* eslint-disable operator-linebreak */
/* eslint-disable space-infix-ops */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';
import { LOAD_USER_REQUEST } from '../reducers/user';

const main = () => {
  const { me, logOutDone } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector((state) => state.post);
  // const mainPosts = useSelector((state)=> state.post.mainPosts) 구조분해를 하지 않으면 다음과 같이 표현할 수 있다.
  const dispatch = useDispatch();

  useEffect(() => {
    if (retweetError) {
      alert(retweetError);
    }
  }, [retweetError]);

  useEffect(() => {
    if (logOutDone) {
      alert('로그아웃 완료! \n로그인 페이지로 이동합니다.');
      Router.replace('/');
    }
  }, [logOutDone]);

  // 제일 처음 mainPosts가 빈 배열일 때 실행됨
  useEffect(() => {
    dispatch({ type: LOAD_USER_REQUEST });
    dispatch({ type: LOAD_POSTS_REQUEST });
  }, []);

  useEffect(() => {
    function onScroll() {
      // console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST,
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostsLoading]);
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <link rel='icon' href='/favicon.png' />
        <title>Juneed | main</title>
      </Head>
      <AppLayout>
        {me && <PostForm />}
        {mainPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </AppLayout>
    </>
  );
};

export default main;
