/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Router } from 'next/router';
import styled from 'styled-components';
import { CreateModal, CloseModalButton } from './styled';
import { mailJ, nameJ, pwJ } from '../util/signupLogic';
import { DEFAULT_DONE_ACTION, SIGN_UP_REQUEST } from '../reducers/user';

const ErrorMessage = styled.div`
  color: red;
`;

const SignupModal = ({ show, onCloseModal }) => {
  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  // 정규표현식 체크 및 에러 관리
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);

  // 이메일 상태, 에러 관리
  const onChangeEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
      if (!email.match(mailJ)) {
        setEmailError(true);
      } else if (email.match(mailJ)) {
        setEmailError(false);
      }
    },
    [email, emailError],
  );

  // 닉네임 상태, 에러 관리
  const onChangeNickname = useCallback(
    (e) => {
      setNickname(e.target.value);
      if (!nickname.match(nameJ)) {
        setNicknameError(true);
      } else if (nickname.match(nameJ)) {
        setNicknameError(false);
      }
    },
    [nickname, nicknameError],
  );

  // 비밀번호 상태, 에러 관리
  const onChangePassword = useCallback(
    (e) => {
      setPassword(e.target.value);
      // pwJ는 정규표현식입니다.
      if (!password.match(pwJ)) {
        setPasswordError(true);
      } else if (password.match(pwJ)) {
        setPasswordError(false);
      }
    },
    [password, passwordError],
  );

  // 비밀번호 체크 및 에러
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordCheckError(e.target.value !== password);
    },
    [password],
  );
  useEffect(() => {
    if (me && me.id) {
      alert('로그인 된 상태에서 접근할 수 없습니다.');
      Router.replace('/');
    }
  });

  useEffect(() => {
    if (signUpDone) {
      dispatch({
        type: DEFAULT_DONE_ACTION,
      });
      alert('회원가입 성공\n 로그인 모달을 이용하여 로그인 해주세요');
      onCloseModal();
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const onsubmit = () => {
    // console.log('입력하신 사용자 정보' + email + password + nickname);
    // dispatch로 SIGN_UP_REQUEST action을 실행시킴
    if (passwordError || nicknameError || emailError || passwordCheckError) {
      alert('에러 메세지를 확인해주세요');
      return;
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname },
    });
  };

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <CreateModal onClick={onCloseModal}>
      <div style={{ width: 400 }} onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        <Form onFinish={onsubmit}>
          <div>
            <label htmlFor="user-email">이메일</label>
            <br />
            <Input
              name="user-email"
              type="email"
              value={email}
              required
              onChange={onChangeEmail}
              placeholder=" '@' 를 포함한 이메일을 입력해주세요"
            />
            {emailError && <ErrorMessage style={{ color: 'red' }}>올바른 형식의 이메일을 입력하세요</ErrorMessage>}
          </div>
          <div>
            <label htmlFor="user-nick">닉네임</label>
            <br />
            <Input
              name="user-nick"
              value={nickname}
              required
              onChange={onChangeNickname}
              placeholder="사용하실 닉네임을 입력해주세요"
            />
            {nicknameError && <ErrorMessage style={{ color: 'red' }}>닉네임은 한글만 사용 가능합니다.</ErrorMessage>}
          </div>
          <div>
            <label htmlFor="user-password">비밀번호</label>
            <br />
            <Input
              name="user-password"
              type="password"
              value={password}
              required
              onChange={onChangePassword}
              placeholder="비밀번호는 8자 이상입니다."
            />
            {passwordError && <ErrorMessage style={{ color: 'red' }}>올바른 형식의 비밀번호를 입력하세요</ErrorMessage>}
          </div>
          <div>
            <label htmlFor="user-password2">비밀번호 확인</label>
            <br />
            <Input
              name="user-password-check"
              type="password"
              value={passwordCheck}
              onChange={onChangePasswordCheck}
              placeholder="비밀번호는 8자 이상입니다."
              style={{ marginTop: 3 }}
            />
            {passwordCheckError && <ErrorMessage style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</ErrorMessage>}
          </div>
          <div style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit" loading={signUpLoading}>
              가입하기
            </Button>
          </div>
        </Form>
      </div>
    </CreateModal>
  );
};

SignupModal.propTypes = {
  show: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

SignupModal.defaultProps = {
  show: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

export default SignupModal;
