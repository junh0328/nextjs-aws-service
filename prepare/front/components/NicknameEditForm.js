/* eslint-disable comma-dangle */
/*
profile.js에서 사용되는 닉네임 수정 폼을 컴포넌트로 만듬
*/

import React, { useCallback, useMemo } from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';

const NicknameEditForm = () => {
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');
  const dispatch = useDispatch();

  const style = useMemo(
    () => ({
      marginBottom: '20px',
      border: '1px solid #d9d9d9',
      padding: '30px',
    }),
    []
  );

  const onsubmit = useCallback(() => {
    if (window.confirm('정말로 닉네임을 수정하시겠습니까?')) {
      window.alert(`수정 완료\n변경된 닉네임은 '${nickname}'입니다.`);
      dispatch({
        type: CHANGE_NICKNAME_REQUEST,
        data: nickname,
        // nickname은 useState로 관리되는 상태 값이기 때문에 정확히 data를 어떤 속성으로 전달할 지 정해주지 않았다.
        // 따라서 사가에서 { nickname : data } 로 api 요청시에 action.data 값을 명확히 지정해 주었다.
      });
    } else {
      window.alert('취소되었습니다');
    }
  }, [nickname]);

  return (
    <Form style={style}>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onsubmit}
      />
    </Form>
  );
};

export default NicknameEditForm;
