import React, { useCallback } from 'react';
import { Button, Card, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);
  return (
    <Card
      style={{ backgroundColor: 'rgba(var(--b3f,250,250,250),1)' }}
      actions={[
        <div key="twit">
          {/* 트윗 수 */}
          짹짹
          <br />
          {me.Posts.length}
        </div>,
        <div key="followings">
          팔로잉
          <br />
          {me.Followings.length}
        </div>,
        <div key="followings">
          팔로워
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{me.nickname[0]}</Avatar>} title={me.nickname} />
      <Button onClick={onLogOut} loading={logOutLoading} style={{ marginTop: '10px' }}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
