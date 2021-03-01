/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Popover, Avatar, List, Comment } from 'antd';
import {
  CommentOutlined,
  EllipsisOutlined,
  HeartOutlined,
  HeartTwoTone,
  RetweetOutlined,
} from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import moment from 'moment';

import CommentForm from './CommentForm';
import PostImages from './PostImages';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';
import {
  REMOVE_POST_REQUEST,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  RETWEET_REQUEST,
} from '../reducers/post';

moment.locale('ko');

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const [commentFormOpened, setCommentForemOpened] = useState(false);
  // const { me } = useSelector((state) => state.user);
  // const id = me && me.id;
  // = const id = me?.id; optional channing 연산자

  const id = useSelector((state) => state.user.me?.id);

  const onLike = useCallback(() => {
    // if (!id) {
    //   return alert('로그인이 필요합니다!');
    // }
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onUnLike = useCallback(() => {
    // if (!id) {
    //   return alert('로그인이 필요합니다!');
    // }
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentForemOpened((prev) => !prev);
  }, []);

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다!');
    }
    return dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, [id]);

  const onRetweet = useCallback(() => {
    if (!id) {
      return alert('로그인이 필요합니다!');
    }
    return dispatch({
      type: RETWEET_REQUEST,
      data: post.id,
    });
  }, [id]);

  const liked = post.Likers.find((v) => v.id === id);

  // console.log('post 상태값 출력');
  // console.log(post);
  return (
    <div>
      {/* 이 postcard의 주인이 내가 아니면, 팔로우 언팔로우 버튼을 띄워 가능하게 한다. */}
      <Card
        style={{ marginBottom: '30px' }}
        title={post.RetweetId ? `${post.User.nickname} 님이 리트윗하셨습니다.` : null}
        extra={id && <FollowButton post={post} />}
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <div
            onClick={onRetweet}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <RetweetOutlined key="retweet" style={{ marginRight: 5 }} />
            {post.Retweet ? <span>리트윗된 게시글</span> : <span>리트윗하기</span>}
          </div>,
          liked ? (
            <div
              onClick={onUnLike}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <HeartTwoTone twoToneColor="#eb2f96" key="heart" style={{ marginRight: 5 }} />
              {post.Likers.length}
            </div>
          ) : (
            <div
              onClick={onLike}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <HeartOutlined key="heart" style={{ marginRight: 5 }} />
              {post.Likers.length}
            </div>
          ),
          <div
            onClick={onToggleComment}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <CommentOutlined key="commet" style={{ marginRight: 5 }} />
            {post.Comments.length}
          </div>,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    {!post.RetweetId && <Button>수정</Button>}
                    <Button type="danger" onClick={onRemovePost}>
                      삭제
                    </Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        {/* 리트윗 게시글이 맞으면 전자 아니면 후자로 보여줘라 */}
        {post.RetweetId && post.Retweet ? (
          <Card cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}>
            <div style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.Retweet.User.id}`} prefetch={false}>
                  <a>
                    <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.Retweet.User.nickname}
              description={<PostCardContent postData={post.Retweet.content} />}
            />
          </Card>
        ) : (
          <>
            <div style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post.User.id}`} prefetch={false}>
                  <a>
                    <Avatar>{post.User.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post.User.nickname}
              description={<PostCardContent postData={post.content} />}
            />
          </>
        )}
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments ? post.Comments.length : 0}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={(item) => (
              <li>
                <Comment
                  datetime={moment(post.Comments.createdAt).format('YYYY.MM.DD')}
                  style={{ marginBottom: 10, borderBottom: '1px solid #f0f0f0' }}
                  author={item.User.nickname}
                  avatar={
                    <Link href={`/user/${item.User.id}`} prefetch={false}>
                      <a>
                        <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item.content}
                />
              </li>
            )}
          />
        </div>
      )}
      {/* <Comments /> */}
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    Comments: PropTypes.arrayOf(PropTypes.object),
    Images: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};

export default PostCard;

// post는 pages/main 에서 mainPosts를 매핑한 결과이다.
