import '../styles/globals.css';
import 'antd/dist/antd.css';
import Head from 'next/head';
import PropTypes from 'prop-types';

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

export default Juneed;
