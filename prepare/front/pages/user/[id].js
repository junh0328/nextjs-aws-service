/* eslint-disable operator-linebreak */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Card } from 'antd';
import { END } from 'redux-saga';
import Head from 'next/head';
import { useRouter } from 'next/router';

import axios from 'axios';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from '../../reducers/user';
// import PostCard from '../../components/PostCard';
import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  const { userInfo, me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!me) {
      dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
    }
  }, [me]);

  // user 정보를 useEffect로 가져올 건데,
  useEffect(() => {
    // console.log('LOAD_USER_요청');
    dispatch({
      type: LOAD_USER_REQUEST,
      data: id,
    });
  }, [id]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
            data: id,
          });
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePosts, id, loadPostsLoading]);

  return (
    <AppLayout>
      {userInfo && (
        <Head>
          <title>
            {userInfo.nickname}
            님의 글
          </title>
          <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
        </Head>
      )}
      {/* 유저 안포가 내가 아닌 경우에만 클릭 시 타인의 정보(트윗, 팔로잉, 팔로워) 정보 뜨게 바꿈 */}
      {userInfo && userInfo.id !== me?.id ? (
        <Card
          style={{ marginBottom: 20 }}
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers}
            </div>,
          ]}
        >
          <Card.Meta avatar={<Avatar>{userInfo.nickname[0]}</Avatar>} title={userInfo.nickname} />
        </Card>
      ) : null}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: context.params.id,
  });
  // console.log('LOAD_USER_POSTS_REQUEST 출력');

  // context.store.dispatch({
  //   type: LOAD_MY_INFO_REQUEST,
  // });

  // context.store.dispatch({
  //   type: LOAD_USER_REQUEST,
  //   data: context.params.id,
  // });

  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  // console.log('getState', context.store.getState().post.mainPosts);
  return { props: {} };
});

export default User;

/*
내가 만들고자 하는 방향은. 그 유저를 클릭하거나, api를 통해 접근할 때, 내 정보가 없어도 이 유저를 불러올 수 있는 방향
왜? get 방식으로 만들었으니깐

근데 오류남 왜? LOAD_USER_REQUEST를 SSR을 안 해줘서, postcard를 매핑할 때 돌릴 때
user 정보가 들어있지 않아서(LIKERS를 못찾아옴) 기존 방식대로는 데이터에 구멍이 뚫려있어서 매핑을 못함.

제약 조건 1. LOAD_MY_INFO는 무조건 useEffect로 돌려야 함 왜?
로그인이 SPA 방식이 아니라 SSR로 정보를 못넘겨줌.

의문점 1. 그럼 LOAD_USER_REQUEST는 사전에 못불러오나?
될 거 같음 내 정보가 아니니깐 근데 잘 모르겠음 이상태로 전달해보니, 초기화 때려야 한다는 오류가 나옴

내 생각 1: 남의 정보를 불러오는 건데, 내(로그인 한 사용자) 정보는 필요 없잖아?
그래서 일단 LOAD_MY_INFO_REQUEST는 뺄거임

내 생각 2 :LOAD_USER_REQUEST 할 떄, saga에서 원하는 건 action.data에 user의 id가 담겨있으면 됨
users 테이블에서 id 선택해서 가져오면 되는 거 아닌가?

궁금한 건 LOAD_USER_POSTS_REQUEST를 할 때는 혹시 유저 정보를 못받아오나??

>> 내가 내린 결론 SSR로 LOAD_USERS_POSTS_REQUEST를 가져오면서 그 posts를 console에 찍어보면 안에 id 가
들어있음. 그 아이디를 통해 useEffect()로 사용자의 정보를 가져오는 게 나음

why?
1.SSR가 사용자의 정보를 가지고 있을 필요가 없음
2. 낭비이기 때문에

*/
