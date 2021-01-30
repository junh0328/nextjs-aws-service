import React, { useCallback, useState } from 'react';
import { Layout, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import '../styles/Random.module.css';

const { Header, Sider, Content } = Layout;

const randomToFunc = () => {
  const [collapsed, setcollapsed] = useState(false);
  const onToggle = useCallback(() => {
    setcollapsed((prev) => !prev);
  }, []);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}></Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {collapsed ? (
            <MenuFoldOutlined className="trigger" onClick={onToggle} />
          ) : (
            <MenuUnfoldOutlined className="trigger" onClick={onToggle} />
          )}
        </Header>
        <Content className="site-layout-background" style={{ margin: '24px 16px', padding: 24, minHeight: 600 }}>
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default randomToFunc;
