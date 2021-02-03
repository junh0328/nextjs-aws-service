import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';

const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  console.log(action);
  // 해당 loggerMiddleware를 통해 redux-devTools처럼 액션 행동을 콘솔창에서 감지할 수 있게 되었다.
};

const configureStore = () => {
  const middlewares = [createSagaMiddleware, loggerMiddleware]; // saga,thunk 를 사용하기 위해 미리 만든 middlewares 배열 후에 여기로 들어감
  const enhancer =
    process.env.NODE_ENV === 'production' ? compose(applyMiddleware(...middlewares)) : composeWithDevTools(applyMiddleware(...middlewares));
  // middleswares 배열에 넣은 saga,thunk를 불변성을 유지하며 가져옴

  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: false,
  //process.env.NODE_ENV === 'developement',
});

export default wrapper;
