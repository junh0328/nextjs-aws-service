/* eslint-disable spaced-comment */
import { all, call, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import axios from 'axios';

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
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
  RETWEET_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

/*  get 방식에서 데이터를 넣어주기 위해서는 쿼리로 해당 데이터를 넘겨줘야 한다.
여기서 우리는 action.lastId가 들어있는 경우 (useEffect로 게시글이 height 기준에 맞춰 내려갔을 때 새로운 posts를 불러와라)
몇 번째 게시글을 기준으로 새로운 게시글을 불러올 것인지를 정하기 위해 lastId라는 변수를 만들어 주었다.
쿼리 방식은 파라미터 방식과 다르게 ' 키 ? 값 ' 형식으로 물음표를 사용하여 나타낸다.
위 주소를 캐싱하면 들어있는 데이터까지 모두 케싱된다.
케싱은 (get)방식에서만 사용 가능하며, (post, patch, ...)등 기타 방식에서는 사용이 불가하다.
*/

function loadPostsAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`);
  // lastId.?id를 했을 때, lastId가 undefined인 경우 0 을 보일 수 있도록 쿼리문을 처리하였다.
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.lastId);

    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

// 단일 포스트 불러오기
function loadPostAPI(data) {
  return axios.get(`/post/${data}`);
  // lastId.?id를 했을 때, lastId가 undefined인 경우 0 을 보일 수 있도록 쿼리문을 처리하였다.
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);

    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function uploadImagesAPI(data) {
  return axios.post('/post/images', data);
  // form data는 {} json 형식으로 감싸는 게 아닌 data 그대로 들어가야 한다.
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/post', data);
  /* Backend에서 req.body.***에서 넘어오는 데이터의 이름이 없었으므로
 mainPosts에서 우리가 사전에 약속한 json 속성 content를 data의 속성명으로 줍니다.
 */

  /*
  form data로 보내주는 것으로 변환되었기 때문에 content와 같은 json 형식이 아닌, data 그대로를 보내준다.
  */
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
      /*
        action.data.content,
        action.data.postId,
        action.data.userId,
        가 dispatch type, data에 의해 넘어옴
      */
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`, data);
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data, // backend 처리에 의해 PostId 와 UserId가 들어있음 >> 리듀서 draft에서 이 result.data를 처리할 것
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function unlikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

function* unlikePost(action) {
  try {
    console.log('start unlikepost api!');
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data, // backend 처리에 의해 PostId 와 UserId가 들어있음 >> 리듀서 draft에서 이 result.data를 처리할 것
    });
    console.log('end! unlikepost api!');
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}
// POST /post/1/retweet
function retweetAPI(data) {
  return axios.post(`/post/${data}/retweet`);
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data);
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: RETWEET_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchloadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function* watchloadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
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
function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* watchUnLikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}
function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}

export default function* postSaga() {
  yield all([
    fork(watchloadPosts),
    fork(watchloadPost),
    fork(watchUploadImages),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLikePost),
    fork(watchUnLikePost),
    fork(watchRetweet),
  ]);
}
