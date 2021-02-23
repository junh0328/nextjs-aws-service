import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import postSaga from './post';
import userSaga from './user';
import { backUrl } from '../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(postSaga), fork(userSaga)]);
}
/*
try catch 문에서
성공 시, result.data 에서 값을 확인할 수 있고,
실패 시, err.response.data를 통해 오류를 확인할 수 있다.
*/
