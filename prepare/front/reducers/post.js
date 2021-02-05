/* eslint-disable comma-dangle */
/* eslint-disable arrow-body-style */
import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';

const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '이준희',
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          id: shortId.generate(),
          src: 'https://image.chosun.com/sitedata/image/202012/09/2020120900033_0.png',
        },
        {
          id: shortId.generate(),
          src: 'https://pds.joins.com/news/component/htmlphoto_mmdata/202012/09/0fd0db44-301a-4f8d-8907-29803b2ccecc.jpg',
        },
        {
          id: shortId.generate(),
          src: 'https://image.zdnet.co.kr/2020/12/17/1d4de0a692e1c978f09639336b1adca0.jpg',
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: 'nero',
          },
          content: '우와 개정판이 나왔군요!',
        },
        {
          User: {
            id: shortId.generate(),
            nickname: '부기',
          },
          content: '저도 사고싶어요!',
        },
      ],
    },
  ],
  imagePaths: [],

  addPostLoading: false, // 포스트 불러오기 요청중
  addPostDone: false, // 포스트 불러오기 성공
  addPostError: null, // 포스트 불러오기 실패

  removePostLoading: false, // 포스트 삭제 요청중
  removePostDone: false, // 포스트 삭제 성공
  removePostError: null, // 포스트 삭제 실패

  addCommentLoading: false, // 포스트 댓글 달기 요청중
  addCommentDone: false, // 포스트 댓글 달기 성공
  addCommentError: null, // 포스트 댓글 달기 실패
};

initialState.mainPosts = initialState.mainPosts.concat(
  Array(20)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.image(),
        },
      ],
      Comments: [
        {
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }))
);

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

// 동적 액션 크리에이터 : 액션을 그때그때 만들어줌
export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

export const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '이준희',
  },
  Images: [],
  Comments: [],
});

export const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '이준희',
  },
});

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts = [dummyPost(action.data), ...state.mainPosts];
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS: {
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        break;
      }
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addcommentLoading = true;
        draft.addcommentDone = false;
        draft.addcommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
