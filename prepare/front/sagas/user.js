import { all, delay, fork, put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function loginAPI(data) {
  return axios.post('/api/login', data);
}

/* 
제너레이터의 특성인 yield를 통해 함수를 동작별로 끊어 데이터가 넘어오는지 확인할 수 있다.
const logIngen = logIn({ type: 'LOG_IN_REQUEST', type: { email: 'junh0328@naver.com' } });
logIngen.next();  // >const result = yield call(loginAPI, action.data);
logIngen.next();
*/

function* logIn(action) {
  try {
    // const result = yield call(loginAPI, action.data);
    delay(2000);
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAIULURE',
      data: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('/api/logout');
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    delay(2000);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAIULURE',
      data: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
  yield takeLatest('LOG_OUT_REQUEST', logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogIn), fork(watchLogOut)]);
}
