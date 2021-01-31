import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const main = () => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" />
        <title>Juneed | main</title>
      </Head>
      <AppLayout>
        <h1>메인 페이지입니다.</h1>
      </AppLayout>
    </div>
  );
};

export default main;
