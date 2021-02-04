import axios from 'axios';
import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';

function loginAPI(data) {
  return axios.post('/api/login', data);
  // 여기서 리턴된 값(action.data)이 logIn()함수에서 만든 result값으로 들어간다.
}

function* logIn(action) {
  try {
    console.log('saga login');
    yield delay(2000);
    // const result = yield call(loginAPI, action.data);
    // result는 loginAPI에서 리턴된 값(action.data)이다.
    // 여기서 데이터를 넘겨받는 것을 실패할 경우 바로 catch문으로 넘어간다.
    // call( )|함수를 실행한다. (동기 함수 호출), loginAPI의 값을 리턴 받을 때까지 기다렸다가 리턴 받은 값을 넣어준다. (블로킹을 한다.)
    yield put({
      // put() : redux의 dispatch() 함수와 같은 행동을 한다, 액션 객체를 실행 시킨다.
      type: 'LOG_IN_SUCCESS',
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAIULURE',
      // data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('/api/logout');
}

function* logOut() {
  try {
    delay(2000);
    // const result = yield call(logOutAPI);
    yield put({
      // put() : redux의 dispatch() 함수와 같은 행동을 한다, 액션 객체를 실행 시킨다.
      type: 'LOG_OUT_SUCCESS',
      // data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAIULURE',
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest('LOG_IN_REQUEST', logIn);
  // take(액션) : LOG_IN 이라는 액션이 실행될 때까지 기다리겠다.
}

function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogOut)]);
}
