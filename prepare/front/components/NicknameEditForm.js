import React from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';

const SearchInput = styled(Input.Search)`
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;

const NicknameEditForm = () => {
  return (
    <Form>
      <SearchInput addonBefore="닉네임" enterButton="수정" />
    </Form>
  );
};

export default NicknameEditForm;

// antd의 컴포넌트 Input 안의 Search 컴포넌트의 스타일변화를 주고 싶을 때 스타일드 컴포넌트 또는 useMemo를 사용한다.
