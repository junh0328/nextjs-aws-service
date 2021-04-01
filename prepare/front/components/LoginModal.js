/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CreateModal, CloseModalButton } from './styled';
import { loginRequestAction } from '../reducers/user';
import useInput from '../hooks/useInput';

const LoginModal = ({ show, onCloseModal }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const dispatch = useDispatch();
  // 더미(가짜) 데이터로 그냥 아이디와 비밀번호가 넘어오는 상태를 관리한다.
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  useEffect(() => {
    // 로그인 실패시, 왜 실패했는지 알려주기 위한 useEffect 추가
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  if (!show) {
    return null;
  }

  return (
    <CreateModal onClick={onCloseModal}>
      <div onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        <Form onFinish={onSubmitForm}>
          <h2>로그인 임시 모달</h2>
          <div>
            <label htmlFor="user-email">이메일</label>
            <br />
            <Input name="user-email" type="text" value={email} onChange={onChangeEmail} required />
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input name="user-password" type="password" value={password} onChange={onChangePassword} required />
          </div>
          <Button type="primary" htmlType="submit" loading={logInLoading}>
            로그인
          </Button>
        </Form>
      </div>
    </CreateModal>
  );
};

LoginModal.propTypes = {
  show: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

LoginModal.defaultProps = {
  show: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

export default LoginModal;
