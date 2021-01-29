import React, { useCallback, useState } from 'react';

import Router from 'next/router';

import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import Head from 'next/head';
import useinput from '../hooks/useInput';

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
    console.log(' 회원 가입 !');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Head>
        <title>회원가입 | juneed </title>
      </Head>
      <Form onFinish={onsubmit} {...layout}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
        </div>
        <div>
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <Input name="user-nick" value={nickname} required onChange={onChangeNickname} />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
        </div>
        <div>
          <Input name="user-password-check" type="password" value={passwordCheck} onChange={onChangePasswordCheck} />
          {passwordError && <ErrorMessage style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</ErrorMessage>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit">
            regist
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
