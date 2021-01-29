import Head from 'next/head';
import { Form, Input, Button, Checkbox } from 'antd';
import Link from 'next/link';

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
  return (
    <div>
      <Head>
        <title>juneed</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="container" style={{ display: 'flex', alignItems: 'flex-end', alignContent: 'center', justifyContent: 'center' }}>
        <div>
          <Form style={{ marginRight: 30 }} {...layout} name="basic" initialValues={{ remember: true }}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
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
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                  Singin
                </Button>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  <Link href="/signup">
                    <a>Signup</a>
                  </Link>
                </Button>
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
