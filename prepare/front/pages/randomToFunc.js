import React, { useCallback, useState } from 'react';
import { Layout, Menu, Input } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, UploadOutlined, DingtalkOutlined } from '@ant-design/icons';
import UserProfile from '../components/UserProfile';
import Link from 'next/link';

const { Header, Sider, Content } = Layout;

const randomToFunc = () => {
  const [collapsed, setcollapsed] = useState(false);
  const onToggle = useCallback(() => {
    setcollapsed((prev) => !prev);
  }, []);

  return (
    <Layout>
      <Sider theme="dark" trigger={null} collapsible collapsed={collapsed} style={{ marginLeft: 100, width: 400 }}>
        <div className="logo" style={{ color: '#fff', fontSize: 20, textAlign: 'center', height: 40, paddingTop: 5 }}>
          <Link href="/">
            <a style={{ color: 'white' }}>Juneed</a>
          </Link>
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link href="/profile">
              <a>프로필</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UploadOutlined />}>
            업로드
          </Menu.Item>
          <Menu.Item key="3" icon={<DingtalkOutlined />}>
            로그아웃
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, display: 'flex', alignItems: 'center', marginLeft: 16, marginTop: 16 }}
        >
          {collapsed ? (
            <MenuFoldOutlined className="trigger" onClick={onToggle} style={{ marginLeft: 30 }} />
          ) : (
            <MenuUnfoldOutlined className="trigger" onClick={onToggle} style={{ marginLeft: 30 }} />
          )}
          <Input placeholder="Search" style={{ width: 300, marginLeft: 50 }} />
        </Header>
        <Content className="site-layout-background" style={{ margin: '24px 16px', padding: 24, minHeight: 600 }}>
          <UserProfile />
          <UserProfile />
          <UserProfile />
          <UserProfile />
          <UserProfile />
          <UserProfile />
          <UserProfile />
          <UserProfile />
          <UserProfile />
          <UserProfile />
          <UserProfile />
          <UserProfile />
          <UserProfile />
        </Content>
      </Layout>
    </Layout>
  );
};

export default randomToFunc;
