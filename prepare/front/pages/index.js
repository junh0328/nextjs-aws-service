/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable jsx-quotes */
import React, { useCallback, useEffect } from 'react';
import Head from 'next/head';
import { Row, Col, Form, Input, Button, Checkbox } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import useInput from '../hooks/useInput';

import { loginRequestAction } from '../reducers/user';

const GlobalFlex = createGlobalStyle`
  body{
    display: flex;
    align-items: center;
    justify-content: center;
  }
   // mobile
   @media (max-width: 600px) {
    display: flex;
    flex-wrap: wrap;

    img {
      width: 80%;
    }
}
`;

const ButtonWrapper = styled.div`
  margin-top: 1px;
`;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function Home() {
  const dispatch = useDispatch();
  const { logInLoading, me, logInError } = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  useEffect(() => {
    if (me) {
      alert('로그인 성공\n메인페이지로 이동합니다!');
      Router.replace('/main');
    }
  }, [me]);

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Head>
        <title>juneed | login</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <GlobalFlex />
      <Row gutter={16}>
        <Col
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          md={12}
          xs={24}
        >
          <Form
            style={{ marginRight: 30 }}
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onSubmitForm}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your e-mail!',
                },
              ]}
            >
              <Input
                name="user-email"
                type="email"
                value={email}
                required
                onChange={onChangeEmail}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password
                name="password"
                value={password}
                onChange={onChangePassword}
                required
              />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Form.Item {...tailLayout}>
                <ButtonWrapper>
                  <Button type="primary" htmlType="submit" loading={logInLoading}>
                    로그인
                  </Button>
                </ButtonWrapper>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <ButtonWrapper>
                  <Button type="primary">
                    <Link href="/signup">
                      <a>회원가입</a>
                    </Link>
                  </Button>
                </ButtonWrapper>
              </Form.Item>
            </div>
          </Form>
        </Col>
        <Col md={12} xs={24}>
          <div style={{ textAlign: 'center' }}>
            <img src="../external/emoji.gif" width="400px" alt="emoji" />
          </div>
        </Col>
      </Row>
    </div>
  );
}
