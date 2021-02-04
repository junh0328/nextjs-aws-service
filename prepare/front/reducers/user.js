const initialState = {
  logInLoading: false, // 로그인 시도 중
  logInDone: false, // 로그인 완료
  logInError: null, // 로그인 에러

  logOutLoading: false, // 로그아웃 시도 중
  logOutDone: false, // 로그아웃 완료
  logOutError: null, // 로그아웃 에러

  me: null,
  signUpData: {},
  loginData: {},
};

export const loginRequestAction = (data) => {
  return {
    type: 'LOG_IN_REQUEST',
    data, // email, password가 들어있음
  };
};

export const logoutRequestAction = () => {
  return {
    type: 'LOG_OUT_REQUEST',
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN_REQUEST':
      return {
        ...state,
        logInLoading: true,
        logInError: null,
        logInDone: false,
      };
    case 'LOG_IN_SUCCESS':
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        me: { ...action.data, nickname: 'zerocho' },
      };
    case 'LOG_IN_FAILURE':
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };
    case 'LOG_OUT_REQUEST':
      return {
        ...state,
        logOutLoading: false,
        me: null,
      };
    case 'LOG_OUT_SUCCESS':
      return {
        ...state,
        logOutLoading: false,
        me: null,
      };
    case 'LOG_OUT_FAILURE':
      return {
        ...state,
        logOutLoading: false,
        me: null,
      };
    default:
      return state;
  }
};

export default reducer;
