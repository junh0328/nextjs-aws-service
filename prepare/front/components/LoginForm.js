import React from 'react';

const LoginForm = () => {
  return (
    <div>
      <h4>로그인이 필요합니다</h4>
    </div>
  );
};

export default LoginForm;

// 임시로 로그인 에러를 나타낼 페이지, useSelector를 통해 initialState의 user.isLoggedIn의 값이 false일 경우 나타날 것임
