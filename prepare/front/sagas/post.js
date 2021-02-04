import { all, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from '../reducers/post';

// function addPostAPI() {
//   return axios.post('/api/post');
// }

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI);
    yield delay(2000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

// function addCommentAPI() {
//   return axios.post('/api/comment');
// }

function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI);
    yield delay(2000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  yield throttle(2000, ADD_POST_REQUEST, addPost);
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchAddComment)]);
}
