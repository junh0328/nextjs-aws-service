/* eslint-disable no-restricted-globals */
/* eslint-disable arrow-body-style */
import { ArrowUpOutlined } from '@ant-design/icons';
import React from 'react';

const ArrowUp = () => {
  return (
    <div>
      <ArrowUpOutlined
        onClick={() => {
          scrollTo(0, 0);
        }}
        style={{
          border: '2px solid #7f929a',
          color: '#7f929a',
          borderRadius: 50,
          width: 42,
          height: 42,
          backgroundColor: 'white',
          position: 'fixed',
          bottom: 60,
          right: 60,
          fontSize: '30px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    </div>
  );
};

export default ArrowUp;
