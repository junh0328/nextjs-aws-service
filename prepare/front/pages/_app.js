import '../styles/globals.css';
import '../styles/random.css';
import 'antd/dist/antd.css';
import Head from 'next/head';
import PropTypes from 'prop-types';

function Juneed({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" />
        <title>Juneed</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

Juneed.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default Juneed;
