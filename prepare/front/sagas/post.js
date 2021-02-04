import { all, delay, fork, put, throttle, takeLatest, call } from 'redux-saga/effects';

function addPostAPI() {
  return axios.post('/api/post');
}

function* addPost() {
  try {
    // const result = yield call(addPostAPI);
    delay(2000);
    yield put({
      type: 'ADD_POST_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAIULURE',
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield throttle('ADD_POST_REQUEST', addPost, 2000);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
