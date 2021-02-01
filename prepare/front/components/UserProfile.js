import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

const { Meta } = Card;

const UserProfile = ({}) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutBtn = useCallback((e) => {
    alert('로그아웃 완료 페이지로 이동합니다.');
    dispatch({
      type: 'LOG_OUT',
    });
    Router.replace('/');
  });

  return (
    <div>
      <Card
        style={{ width: 300 }}
        actions={[
          <div key="twits">
            짹짹
            <br /> 0
          </div>,
          <div key="followings">
            짹짹
            <br /> 0
          </div>,
          <div key="followers">
            짹짹
            <br /> 0
          </div>,
        ]}
      >
        <Meta avatar={<Avatar src="../favicon.png" />} title="_dlwnsgml" />
        <Button onClick={logoutBtn}>로그아웃</Button>
      </Card>
    </div>
  );
};

export default UserProfile;
