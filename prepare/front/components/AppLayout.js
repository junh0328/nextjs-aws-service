import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import { HomeFilled, InfoCircleFilled, ProfileFilled } from '@ant-design/icons';
import Router from 'next/router';

import useInput from '../hooks/useInput';
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

  const [searchInput, onChangeSearchInput] = useInput('');

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Global />
      <div
        style={{
          position: 'fixed',
          top: 0,
          zIndex: 9,
          width: '100%',
          height: '60px',
          backgroundColor: 'white',
          textAlign: 'center',
        }}
      >
        <Menu
          mode="horizontal"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '60px',
          }}
        >
          {me ? (
            <>
              <Menu.Item>
                <Link href="/main" shallow>
                  <a>
                    <HomeFilled style={{ width: '100%' }} />
                  </a>
                </Link>
              </Menu.Item>

              <Menu.Item>
                <Link href="/profile">
                  <a>
                    <ProfileFilled style={{ width: '100%' }} />
                  </a>
                </Link>
              </Menu.Item>

              <Menu.Item>
                <Link href="/faq" shallow>
                  <a>
                    <InfoCircleFilled style={{ width: '100%' }} />
                  </a>
                </Link>
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item>
                <Link href="/">
                  <a>로그인</a>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/signup">
                  <a>회원가입</a>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/faq" shallow>
                  <a>FAQ</a>
                </Link>
              </Menu.Item>
            </>
          )}

          <Menu.Item>
            <SearchInput
              value={searchInput}
              onChange={onChangeSearchInput}
              onSearch={onSearch}
              placeholder="input search text"
              enterButton
            />
          </Menu.Item>
        </Menu>
      </div>
      <Row
        gutter={8}
        style={{
          paddingTop: 80,
          backgroundColor: 'rgba(var(--b3f,250,250,250),1)',
        }}
      >
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
