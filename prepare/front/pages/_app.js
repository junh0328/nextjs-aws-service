/* eslint-disable max-len */
import '../styles/globals.css';
import '../styles/random.css';
import 'antd/dist/antd.css';

import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import wrapper from '../store/configureStore';

function Juneed({ Component }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" />
        <title>Juneed</title>
      </Head>
      <Component />
    </>
  );
}

Juneed.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Juneed);

// store에서만든 wrapper로 _app.js의 Juneed를 감싸준다.
// pages에 들어있는 컴포넌트들에서 공통적으로 redux를 통한 상태 관리를 하기 위해
// Next에서는 기존의 react-redux에서 사용하던 Provider로 감싸줄 필요가 없는데, next 라이브러리에서 기본적으로 provider기능을 제공하기 때문이다. 따라서 한 번 더 Provider로 감싸줄 경우 오류가 발생할 것이다.
