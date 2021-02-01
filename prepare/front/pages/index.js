import Head from 'next/head';
import { Form, Input, Button, Checkbox } from 'antd';
import Link from 'next/link';
import useinput from '../hooks/useInput';
import styled from 'styled-components';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from '../reducers/user';
import Router from 'next/router';

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

  const [email, onChangeEmail] = useinput('');
  const [password, onChangePassword] = useinput('');

  const onSubmitForm = useCallback(() => {
    alert('로그인 성공! : \n' + email + '님 환영합니다.');
    dispatch(loginAction({ email, password }));
    Router.replace('/main');
  }, [email, password]);

  return (
    <div>
      <Head>
        <title>juneed | login</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="container" style={{ display: 'flex', alignItems: 'flex-end', alignContent: 'center', justifyContent: 'center' }}>
        <div>
          <Form style={{ marginRight: 30 }} {...layout} name="basic" initialValues={{ remember: true }} onFinish={onSubmitForm}>
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
              <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
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
              <Input.Password name="password" value={password} onChange={onChangePassword} required />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Form.Item {...tailLayout}>
                <ButtonWrapper>
                  <Button type="primary" htmlType="submit">
                    로그인
                  </Button>
                </ButtonWrapper>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <ButtonWrapper>
                  <Button type="primary" htmlType="submit" loading={false}>
                    <Link href="/signup">
                      <a>회원가입</a>
                    </Link>
                  </Button>
                </ButtonWrapper>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img src="../external/emoji.gif" width="400px" />
        </div>
      </div>
    </div>
  );
}
