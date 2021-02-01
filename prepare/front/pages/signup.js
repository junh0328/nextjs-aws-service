import React, { useCallback, useState } from 'react';

import Router from 'next/router';

import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import Head from 'next/head';
import useinput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';

const ErrorMessage = styled.div`
  color: red;
`;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const Signup = () => {
  const [email, onChangeEmail] = useinput('');
  const [nickname, onChangeNickname] = useinput('');
  const [password, onChangePassword] = useinput('');

  // 비밀번호 체크 및 에러
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const onsubmit = () => {
    alert(`회원가입 성공!\n로그인 페이지로 이동합니다`);
    Router.replace('/');
  };

  return (
    <AppLayout>
      <div style={{ width: 400 }}>
        <Head>
          <title>juneed | signup </title>
        </Head>
        <Form onFinish={onsubmit} {...layout}>
          <div>
            <label htmlFor="user-email">이메일</label>
            <br />
            <Input
              name="user-email"
              type="email"
              value={email}
              required
              onChange={onChangeEmail}
              placeholder=" '@' 를 포함한 이메일을 입력해주세요"
            />
          </div>
          <div>
            <label htmlFor="user-nick">닉네임</label>
            <br />
            <Input name="user-nick" value={nickname} required onChange={onChangeNickname} placeholder="사용하실 닉네임을 입력해주세요" />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input
              name="user-password"
              type="password"
              value={password}
              required
              onChange={onChangePassword}
              placeholder="비밀번호는 8자 이상입니다."
            />
          </div>
          <div>
            <label htmlFor="user-password2">비밀번호 확인</label>
            <br />
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
              placeholder="비밀번호는 8자 이상입니다."
              style={{ marginTop: 3 }}
            />
            {passwordError && <ErrorMessage style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</ErrorMessage>}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit">
              가입하기
            </Button>
          </div>
        </Form>
      </div>
    </AppLayout>
  );
};

export default Signup;
