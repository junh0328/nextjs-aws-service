import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';

import UserProfile from './UserProfile';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const Global = createGlobalStyle`
.ant-row{
  margin-right: 0 !important;
  margin-left: 0 !important;
}

.ant-col:first-child{
  padding-left: 0 !important;
}
.ant-col:last-child{
  padding-right: 0 !important;
}
`;
const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <div>
      <Global />
      <div style={{ position: 'fixed', top: 0, zIndex: 9999, width: '100%', height: '60px' }}>
        <Menu
          mode="horizontal"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Menu.Item>
            <Link href="/main">
              <a>메인</a>
            </Link>
          </Menu.Item>
          {me && (
            <Menu.Item>
              <Link href="/profile">
                <a>프로필</a>
              </Link>
            </Menu.Item>
          )}
          <Menu.Item>
            <SearchInput placeholder="input search text" enterButton />
          </Menu.Item>
        </Menu>
      </div>
      <Row gutter={8} style={{ marginTop: 80 }}>
        <Col xs={24} md={6}>
          {me && <UserProfile />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <div style={{ margin: '10px' }}>
            <a href="https://github.com/junh0328" target="_blank" rel="noreferrer noopener">
              CONTACT ME
            </a>
          </div>
        </Col>
      </Row>
    </div>
  );
};
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
