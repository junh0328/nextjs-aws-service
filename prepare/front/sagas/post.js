import { all, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import shortId from 'shortid';

import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  generateDummyPost,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

// function loadPostsAPI() {
//   return axios.get('/api/post');
// }

function* loadPosts() {
  try {
    // const result = yield call(loadPostsAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

// function addPostAPI() {
//   return axios.post('/api/post');
// }

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    const id = shortId.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

// function removePostAPI() {
//   return axios.delete('/api/post');
// }

function* removePost(action) {
  try {
    // const result = yield call(removePostAPI);
    yield delay(1000);
    yield put({
      // post 리듀서 살태와 user 리듀서 상태를 동시에 바꿔줄 수 없으므로 액션을 두번 실행하여 바꿔준다.
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
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
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
      /*
        action.data.content,
        action.data.postId,
        action.data.userId,
        가 dispatch type, data에 의해 넘어옴
      */
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}
function* watchloadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
  yield throttle(1000, ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield throttle(1000, REMOVE_POST_REQUEST, removePost);
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([fork(watchloadPosts), fork(watchAddPost), fork(watchAddComment), fork(watchRemovePost)]);
}
