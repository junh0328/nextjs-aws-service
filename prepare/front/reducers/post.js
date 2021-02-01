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
  postAdded: false,
};

const ADD_POST = 'ADD_POST';

export const addPost = {
  type: ADD_POST,
};

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
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };

    default:
      return state;
  }
};

export default reducer;
