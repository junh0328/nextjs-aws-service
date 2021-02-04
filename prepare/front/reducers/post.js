const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '제로초',
      },
      content: '첫 번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          src: 'https://image.chosun.com/sitedata/image/202012/09/2020120900033_0.png',
        },
        {
          src: 'https://pds.joins.com/news/component/htmlphoto_mmdata/202012/09/0fd0db44-301a-4f8d-8907-29803b2ccecc.jpg',
        },
        {
          src: 'https://image.zdnet.co.kr/2020/12/17/1d4de0a692e1c978f09639336b1adca0.jpg',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'nero',
          },
          content: '우와 개정판이 나왔군요!',
        },
        {
          User: {
            nickname: '부기',
          },
          content: '저도 사고싶어요!',
        },
      ],
    },
  ],
  imagePaths: [],

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

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

const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: false,
        addPostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: false,
        addCommentError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;
