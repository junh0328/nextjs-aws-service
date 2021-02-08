# 어디서나 적용가능한 front 구성하기

클론 코딩을 따라치면서, 따라할 때는 이해가 가는데, 막상 만들려니깐 어디서부터 시작할 지 모르겠는 나를 위한 계획서입니다.
SSR까지 쭉 download한 dependencies를 바탕으로 어떤 작업을 했는지 작성해 나갈 예정입니다.

## 1. 📁 downloaded dependencies

- @ant-design/icons
- antd
- next
- prop-types
- react
- react-dom
- styled-components

🌟 초기 설정 및 페이지만 나누기/ eslint로 기본적인 프로그래밍 규율 만들기 🌟

## 2. 📁 downloaded dependencies

- eslint
- eslint-plugin-import
- eslint-plugin-react
- eslint-plugin-react-hook

🌟 공통 레이아웃인 App Layout으로 그리드 나누고, 디자인하기 (postcard 등) 🌟

```
xs = 모바일
sm = 태블릿
md = 작은 데스크탑
https://ant.design/components/grid/

페이지를 구성할 때는 모바일 > pc 순으로 만들것!

24가 Full page의 기준이다.
6 / 12 / 6 을 통해 25 : 50 : 25 의 비율로 화면을 구성한다는 것을 의미한다.
gutter는 <Col> 끼리 붙지 않도록 Col 사이의 간격(padding)을 주는 것이다.
```

<hr/>
🌟 antd 커스터마이징하기!🌟
파일이 빌드시 크지 않다는 전제하에 (1MB 이하) 인라인 태그로도 커버가 가능하지만 더 커질 경우 useMemo 또는 styled-component로 인라인 스타일링 된 태그들을 바꿔주는 것이 성능 최적화에 도움이 된다.

```js
case 1 !

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

antd로 제공받은 컴포넌트를 styled 컴포넌트로 styling하기
```

```js
case 2 !

const style = useMemo(() =>  ({vertical-align: middle}), []);

후에 style을 속성으로 넣어준다. style={style}
```

<hr/>

🌟 프로필 페이지관련 작업 📁pages/profile 🌟

- followList / followerList 만들기
  > https://ant.design/components/list/
- NikcnameEditForm 만들기

## 3. 📁 downloaded dependencies

- redux
- react-redux
- next-redux-wrapper

<p>
비동기를 처리할 때는 기본적으로 Context API, redux, mobX등 을 사용하는데, 과정은 보통 3단계로 나눠져있다.
비동기 처리에서는 요청 > 성공 or 실패 의 과정을 반복하게 되는데, 이 과정을 context api로 하나하나 만들기 보다 redux를 사용하여 정형화된 상태로 구현이 가능하다. 또한 리덕스 관련 확장프로그램(redux-devtools) 등을 통해 redux는 history 추적이 용이하다는 장점이 있어 redux를 많이 사용하는 편이다.
</p>

🌟 nextjs에 redux 적용하기 🌟

<p>

기본적으로 redux를 다운받고 pages 전체를 활용하기 위해 \_app.js를 hoc로 덮어씌우는 📁store/configureStore 에 next-redux-wrapper를 사용한다.

</p>

<h2>store 만들기</h2>

```js
import { createWrapper } from 'next-redux-wrapper';
import { createStore } from 'redux';

import reducer from '../reducers';

const configureStore = () => {
  const store = createStore(reducer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'developement',
});

export default wrapper;
```

<h2>reducer 만들기</h2>
<p>
리듀서는 react에서 사용했던 방식을 그대로 사용한다. 전체적으로 상태관리를 하는 rootReducer와 초기 상태를 지정하는 initialState 변수가 있다. 컴포넌트 들에서 요청(액션)을 보내면 그 액션을 파악하고 rootReducer로 넘겨주어, 리듀서에서 리턴된 값을 다시 해당 컴포넌트로 반환하는 과정을 거친다. 리듀서는 항상 수동적으로 작동하는 것을 잊지말아야 한다.
</p>

```js
const initialState = {
  name: 'junhee',
  age: 25,
  pw: 'babo',
};

const changeNickName = (data) => {
  return {
    type: 'CHANGE_NICKNAME',
    data,
  };
};

changeNickName('boogiejun');

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_NICKNAME':
      return {
        ...state,
        name: action.data,
      };
    default:
      return { state };
  }
};

export default rootReducer;
```

<p>
changeNickName()에 'boogiejun'이라는 파라미터가 들어가 발생하면, changeNickName() 함수가 발생하면서 바꾸고자 하는 객체의 속성 { name }에 접근한다. 루트 리듀서에서 'CHANGE_NICKNAME'을 받아와 기존 상태(...state)를 유지하고 바꾸자고 하는 속성 name만 들어오는 action.data(boogiejun)으로 바꿔준다. 이를 리턴하고, virtualDOM이 변화된 상태를 감지하여 컴포넌트를 리렌더링하여 사용자가 보게 된다.
</p>

## 4. 📁 downloaded dependencies

- redux-devtools-extension

🌟 redux에 미들웨어, HYDRATE 적용하기 🌟

<p> 우리는 nextjs의 SSR의 장점을 활용하기 위해 HYDRATE를, redux-devtools로 redux-saga/ reducer의 데이터를 추적하기 위해 미들웨어를 추가적으로 구성합니다.</p>

```js
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE : ', action);
      return { ...state, ...action.payload };
    case LOG_IN:
      ...
      ...
    default state;
  }
```

<p>📁reducers/index의 rootReducer case에 HYDRATE를 추가합니다. 또한 configureStore도 미들웨어 사용 준비를 거칩니다.</p>
<img  width="80%" src="./images/confi.png" title="configurationChanged">
<p>store에 추가한 enhancer를 통해 우리는 redux-devTools를 사용할 수 있습니다. production 즉 배포 상태에서는 사용하지 않지만, production 상태가 아닐 떄(개발상태)는 redux-devTools를 사용하여 state를 추적합니다. middleWares에는 saga/thunk를 추가적으로 넣어 redux를 확장하는 미들웨어를 선언할 것입니다.</p>

🌟 antd <-> styled-component 응용하기 🌟

```js
const ButtonRed = styled(Button)`
  background-color: salmon;
  color: white;
  border: none;

  &:hover {
    border: 1px solid salmon;
    color: salmon;
  }
`;
```

<p> 
기존의 import {Button} from 'antd'를 통헤 블라온 버튼 컴포넌트에 스타일드 컴포넌트로 스타일링하는 과정이다. ( & ) 연산자를 사용하여 기존에 class, id 와 같은 document 선택자에 접근하여 스타일링을 해줄 수 있다. 
</p>

🌟 리듀서 쪼개기 🌟

<p> 처음 프론트엔드 코드를 작성할 때, 우리는 간단하게 reducer의 원리만 알아보는 index 리듀서에 모든 기능을 작성하여 시험해봤다. 하지만 리덕스사가 및 리듀서를 사용하여 코드를 진행하면서 불가피하게 길어질 코드를 관리하기 위해서 reducer를 user/ post 리듀서로 나눠주었다.</p>

```js
import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HYDRATE : ', action);
        return { ...state, ...action.payload };
      default:
        return { state };
    }
  },
  user,
  post,
});

export default rootReducer;
```

<p>위 커밋으로 되돌아와 이전의 나눠지기 전의 코드와 비교해보면 어느 부분이 바뀌었는 지 쉽게 알 수 있다. rootReducer는 redux의 combineReducers를 이용하여 쪼개주었고, initialState도 각각 user 리듀서와 post 리듀서로 나누어 들어갔다.</p>

```js
// reducer를 나누기 전 index에 몰아넣은 user/ post 객체
const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  },
};
```

<p>원래 user.isLoggedIn에 접근하기 위해서는 기존의 불변성을 지켜줘야 하기 때문에</p>

```js
// reducer를 나누기 전 user 객체를 변화시키는 reducer의 액션 실행시의 불변성
case 'LOG_IN':
  return {
    ...state,
    user: {
      ...state.user,
      isLoggedIn: true,
      user: action.data,
    },
  };
```

<p>와 같이 불변성을 지켜서 한단계 더 내려가 isLoggedIn에 접근했다. 하지만, 리듀서를 나눠주었기 때문에 현재 user 리듀서에서는 다음과 같이 접근한다. (user 객체가 initialState이기 때문에 한 번 더 불변성을 지키며 내려갈 필요가 없어졌음)</p>

```js
// reducer를 나눈 후 user 객체를 변화시키는 reducer의 액션 실행시의 불변성
case 'LOG_IN':
  return {
    ...state,
    isLoggedIn: true,
    user: action.data,
  };
```

<hr/>

🌟 main Page 구성하기 🌟

<p>기존 강좌에서 index 페이지를 mainPosts로 구성했던 것과 달리, 접근 권한을 높이기 위해 (무분별한 서버의 접속량을 낮추기 위해서) 로그인을 index로 구성하였다. 따라서 기존의 index 페이지는 main 페이지로 대체되었다. 데이터는 reducer의 user에서 받아오기 때문에 useSelector로 관리하여 프로그래밍 상에 문제는 없음을 확인하였다. 따라서 우리는 pages/main 에서 post 리듀서의 <b>mainPosts</b>를 매핑하여 하나씩 풀어주는 <b>post</b> props를 통해 모든 정보를 주고받을 것이다.</p>

<p>PostCard를 구현하기 위해서는 처음 어떻게 구현할 지 설계를 해본다.</p>

```js
// antd 적용 전 우리가 예상하여 작성한 PostCard 컴포넌트, 넣고 싶은 기능들이 들어가있다. (image, content, button, commentform, comment)
const PostCard = ({ post }) => {
  return (
    <div>
      <Card>
        <Image />
        <Content />
        <Button></Button>
      </Card>
      <CommentForm />
      <Comments />
    </div>
  );
};
```

<p>위와 같은 형식으로 Card를 구현한다고 했을 때, antd에서 기본적으로 제공하는 속성들이 있다면, 그것을 사용하고 없다면 컴포넌트로 만들어줘야 한다.</p>

```js
// antd를 적용한 PostCard 컴포넌트

const PostCard = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  return (
    <div>
      <Card
        cover={post.Images[0] && <PostImages images={post.images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          <HeartOutlined key="heart" />,
          <CommentOutlined key="commet" />,
          <Popover
            key="more"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  ((<Button>수정</Button>), (<Button type="danger">삭제</Button>))
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={post.content}
        />
      </Card>
      {/* <CommentForm /> */}
      {/* <Comments /> */}
    </div>
  );
};
```

<p>위의 PostCard 컴포넌트처럼 우리는 css framework를 사용하지 않더라도, 미리 넣고싶은 기능들을 상상하여 컴포넌트 형식으로 넣어놓고, 존재하는 부분은 css framework에서 참고하여 속성들을 채우고 없는 부분은 따로 컴포넌트를 더 추가하여 만들어주는 식으로 작성하면 된다. (인스타그램의 포스트카드, 트위터의 포스트카드의 레이아웃을 참고하여 구성하는 편이 하나하나 다 만드는 것보다 더 빠르고 효율적일 것)</p>

## 5. 📁 downloaded dependencies

- react-slick

🌟 PostCard의 하위 컴포넌트 postImages 구현하기 🌟

<p>styled-component에서 제공하는 createGlobalStyle을 사용하여 global하게 클래스에 css styling 작업을 할 수 있습니다. 이미 slick 라이브러리에서 만들어져 제공하는 클래스의 이름(slick-slide 라 가정,)을 대신해서 styled-component를 사용하여 이를 덮어 씌울 수 있습니다. 사용 방법은 다음과 같습니다.</p>

```js
export const Global = createGlobalStyle`
  .slick-slide{
    display: inline-block;  
  }
  .ant-card-cover{
    transform: none !important;
  }
`;
```

<p>후에 이 Global 변수를 컴포넌트 형태로 최상단에 선언하여 사용하며 (<Global/>) .slick-slide class를 덮어 씌워 우리가 만든 스타일로 들어가게 됩니다. </p>

<img  width="80%" src="./images/styledglobal.png" title="usingGlobalStyle">

<p> 이미지 캐루셀 형식은 직접 구현하기 보다 react-slick 과 같은 라이브러리를 사용하여 구현한다면 효과적으로 이미지 캐루셀 형식을 만들 수 있습니다. <a href="https://www.npmjs.com/package/react-slick">react-slick</a> npm 사이트에서 react-slick이 제공하는 속성들을 비교해볼 수 있습니다. <a href="https://gahyun-web-diary.tistory.com/15"> tistory</a>를 참고하여 완성도 높은 캐루셀을 만들어 봅시다. </p>

<hr/>

🌟 다이나믹 라우팅을 위한 해쉬태그(#) 분리하기 🌟

<p>nextjs를 사용하는 가장 큰 이유는 '다이나믹 라우팅을 사용한 서버사이드 렌더링을 제공하기 위해서' 라고 해도 과언이 아니다. 한 가지 동적 페이지를 통해 사용자가 원하는 데이터와 정보를 state로 관리하여 서버에서부터 사용자에게 전달될 수 있다. hashtag 또한, 후에 `[hashtag].js`와 같은 방향으로 해당 해쉬태그가 포함된 모든 게시글을 보여줄 수 있도록 만들어야 하기 때문에 일반 글과 해시태그가 포함된 게시글을 분리할 필요가 있다. 이때 정규 표현식을 사용하여 일반 글과 해쉬태그가 포함된 글을 분리할 수 있는데, 방법은 다음과 같다.</p>

```Js
const PostCardContent = ({ postData }) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((v) => {
      if (v.match(/(#[^\s]+)/)) {
        return (
          <Link href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }} as={`/hashtag/${v.slice(1)}`} key={v}>
            <a>{v}</a>
          </Link>
        );
      }
      return v;
    })}
  </div>
);
```

<p>PostCard의 하위 컴포넌트인 PostCardContent는 postData를 props로 받아와 사용한다. 이 postData에는 사용자가 입력한 글(해쉬태그 포함)이 들어있다. if 문에 따라 postData를 분리하게 되는데, 정규표현식을 통해 (#)이 포함된 문자열은 Link 태그를 포함하여 나타내고 바로 다이나믹 라우팅을 위해 `/hashtag/${v.slice(1)}`로 나타낸다. 예를 들어 `#익스프레스` 해쉬태그를 클릭하면 링크를 타고 `localhost/hashtag/익스프레스` 와 같은 방법으로 나타날 것이다. 후에 해당 해쉬태그가 들어있는 모든 게시글을 볼 수 있다. </p>
<p>
🌟<a href="https://regexr.com/">정규식 테스트 사이트</a>🌟<br/>
//g 에서 g는 global로 여러개의 문자열을 받을 수 있다. split 함수를 통해 해당 정규식이 포함된 postData만을 분리하고, 매핑하는데, slice(1)은 문자열의 맨 앞에 붙어있는 '#'을 떼주기 위함이다. 따라서 해시태그 {url/해당해시태그}를 통해 해당 해시태그가 포함된 글을 검색할 수 있게 되었다.
</p>

<h1>🌟instagram 디테일🌟</h1>
- 'postcardcontent' 최대 보여줄 수 있는 댓글 제한
- 댓글 특정 갯수 이상 달릴 때, 스크롤 적용
- 좋아요 n 개 갯수 표시
- 프로필 이미지 설정하기

## 6. 📁 downloaded dependencies

- axios
- redux-saga

<p>redux-saga는 리덕스의 미들웨어로 주어지는 상황(액션)에 대해 비동기적으로 다음 행동을 할 수 있는 함수를 제공한다. <a href="https://github.com/junh0328/redux-saga">깃허브 공식문서</a>를 통해 더 자세한 사용방법을 알아볼 수 있다. 사용법은 기존 강의를 통해서 공부했으므로, 적용법에 대해서만 남겨보고자 한다. redux-saga는 리덕스의 미들웨어이므로 📁store/configureStore.js 에서 만들었던 변수 middleWares= [...] 에 redux-saga를 넣어 적용가능하다. 적용한 코드는 다음과 같다.</p>

<img  width="80%" src="./images/sagaMiddleware.png" title="usingSagaMiddleware" alt="usingSagaMiddleware">

🌟 📁sagas/index 로 redux-saga 처음 적용하기 🌟

<p> redux-saga 와 같은 비동기 함수 미들웨어를 적용하는 근본적인 이유는 무엇일까? 아마도 사용자가 서버로 요청을 ('~ 해줘, 불러와줘, ... ') 보낼 때, 프론트 서버에서 이 사용자의 요청을 감지(watch)하여 서버로 보내고(api) 결과값을 서버로부터 받는(put) 과정을 진행하기 위해서이다. 이러한 과정들에 들어가는 함수들을 기본적으로 제공한다는 것이 리덕스 사가의 제일 큰 장점이다. 따라서 공식문서에서 제공하는 방향에 따라 함수를 설계해야 한다.
</p>

🌟 로그인 API로 사가 알아보기 🌟

```js
import all, { call, fork, put, take } from 'redux-saga/effects';
import axios from 'axios';

function loginAPI(data) {
  return axios.post('/api/login', data);
}

function* logIn(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAIULURE',
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield take('LOG_IN_REQUEST', logIn);
}

export default function* rootSaga() {
  yield all([fork(watchLogin)]);
}
```

- 1. 먼저 export 한 rootSaga를 통해 모든 요청(all)을 감지할 수 있도록 한다(fork).
- 2. 요청을 감지할 수 있는 watchLogin()함수를 만들고, 해당 요청 ('LOGIN_IN_REQUEST')이 사용자로부터 넘어오면, logIn 함수를 실행시킨다.
- 3. 로그인 함수에서는 'LOG_IN_REQUEST'를 통해 사용자가 보내고자하는 데이터(payload)를 action으로 받아 와 이 데이터를 loginAPI에게 넘겨주고 결과 값을 result 변수에 담는다.
- 4. result 변수는 백엔드에서 처리되어 넘어오는 결과에 따라 'LOG_IN_SUCCESS' 또는 'LOG_IN_FAILURE' 함수를 반환하여 사용자에게 전달한다.
- 5. 이 과정들은 모두 generator 함수(function\*)를 통해 하나하나 끊겨 작동하기 때문에 redux-devtools로 관리할 수 있고, 추적에 용이하다.
- 6. 'LOG_IN_SUCCESS'와 같은 액션들은 모두 리듀서에 만들어 import 하여 사용하게 된다.

<h2> 🌟 next-redux-saga를 적용한 것이 아니기 때문에, 따로 hoc를 적용하여 \_app.js를 추가적으로 덮어씌울 필요는 없다. 🌟</h2>

🌟 saga의 이펙트 (effects) 🌟

<p> 처음 배울 때 yield 뒤에 변수값을 받아 오거나, 조건 문을 통해 문장을 제어하였는데, saga를 활용하기 위해서는 이펙트들을 잘 활용해야 한다. </p>

|           값           |                                                         의미                                                         |
| :--------------------: | :------------------------------------------------------------------------------------------------------------------: |
|        all([ ])        |                 yield에서 배열을 받는다. 그 배열안에 들어있는 함수(fork, call)를 한번에 실행해준다.                  |
|        fork( )         | 함수를 실행한다. (비동기 함수 호출), 요청을 보내고 결과와 상관없이 바로 다음 함수로 넘어간다. (블로킹을 하지않는다.) |
|        call( )         |       함수를 실행한다. (동기 함수 호출), 리턴 받을 때까지 기다렸다가 리턴 받은 값을 넣어준다. (블로킹을 한다.)       |
| take("ACTION", action) |    'ACTION' 이라는 액션이 실행될 때까지 기다리겠다. 'ACTION'이 실행되면, action이라는 generator 함수를 실행한다.     |
|        put({ })        |                            액션 객체를 실행시킨다. (redux의 dispatch와 같은 행동을 한다)                             |
|        delay()         |   백엔드 구현 전에, 더미데이터를 통해 데이터를 주고 받지 않고 일정 지연시간만 주고 처리하고 싶을 때 사용하는 함수    |

<p> yield 는 async/ await의 await과 비슷하다고 생각하면 쉽다. </p>

🌟 saga의 이펙트 재 반복성 (take) 🌟

<p>
yield를 통해 take() 함수들을 감싸다보니 생기는 가장 큰 문제는 해당 함수를 한 번 밖에 실행하지 못한다는 것이다.🌟 띠리사 generator의 특성을 활용하여 yield로 만든 해당 함수들을 while true 문으로 감싸줘야 한다! 🌟 while true와 같이 모든 함수를 감싸주게 되면 코드의 양이 늘어나므로 takeEvery()라는 함수를 기존 take() 대신 사용한다.
</p>

|               값               |                                                                      의미                                                                      |
| :----------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------: |
|          takeEvery()           |                      yield take()를 대신해서 모든 상황에서 take를 계속 받을 수 있는 함수, while true의 역할을 대신 한다.                       |
|          takeLatest()          |                            이벤트의 실행이 두 번 혹은 연속적으로 실행됐을 때, 최종적으로 클릭한 액션을 넘겨받는다.                             |
| throttle(초, "ACTION", action) | takeLatest()의 한계(요청을 시간 차로 보냈을 때는 두 요청 모두를 처리)를 보완하기 위해서 일정 시간동안 보낼 수 있는 요청의 갯수를 제한하는 함수 |

<p>
보통은 takeLatest()를 많이 사용한다. 하지만, takeLatest()를 통해 프론트에서는 최종적으로 마지막 액션을 보여준다고 하더라도, 백에서는 해당 요청에 따라 응답을 두 번 할수 있다. 응답은 취소할 수 있지만, 요청을 취소할 수는 없다. 따라서 throttle() 을 사용하여 요청을 제한하기도 한다.(대부분의 경우는 takeLatest()를 쓴다.)
</p>
<hr/>

<h2> 🌟 그럼 프론트에서만 구성하면 사가를 어떻게 확인하나요? 🌟 </h2>

<p>간단하게 saga의 login function을 살펴 보자</p>

```js
function loginAPI(data) {
  return axios.post('/api/login', data);
}

function* logIn(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAIULURE',
      data: err.response.data,
    });
  }
}
```

<p>watchLogIN을 통해 감지된 사용자의 요청이 logIn 함수를 발생시키면, action.data(사용자가 요청 보낸 이메일 패스워드가 담겨잇겠죠?)를 loginAPI로 보내고 결과를 반환받을 때까지 기다린다(call 함수에 의해), 하지만 front와 backend 작업을 따로 진행한다면 백엔드에 위 action.data를 보내줄 수 없기 때문에 delay 함수를 이용하여 성공된 결과를 반환하는 형식으로 미리 구성해본다.
</p>

```js
function loginAPI(data) {
  return axios.post('/api/login', data);
}

function* logIn(action) {
  try {
    // const result = yield call(loginAPI, action.data);
    yield delay(2000);
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAIULURE',
      data: err.response.data,
    });
  }
}
```

<p>loginAPI는 자동적으로 실행되지 않을 것이고, try catch문에 의해 감싸져 있으므로 action은 2초 뒤에 LOG_IN_SUCCESS 함수를 실행(put)시킬 것이다. 이 delay 함수를 통해 마치 백엔드와 소통하여 데이터를 성공적으로 반환받은 효과를 낼 수 있다.</p>

## 7. 📁 downloaded dependencies

- eslint-config-airbnb
- shortid
- immer

<h2> 🌟 shortId를 사용하여 데이터 중복 없애기 🌟 </h2>
<p> 우리는 서버와의 통신없이 더미 데이터, 더미 포스트, 더미 유저 등을 통해 데이터를 그려주고 있습니다. mainPosts를 매핑하여 post라는 props로 하여금 포스트 게시물을 하나씩 나열하는 상황입니다. 각각의 포스트와 유저, 댓글(comment) 들은 모두 id를 가지고 있습니다. 이 아이디를 추적하여 게시글을 지우거나 추가하는 등의 모든 행동들이 실행될 수 있기 때문입니다. 따라서 서버와의 소통 이전단계에서는 shortId를 사용하여 절대 겹치지 않는 id를 generate 할 수 있습니다. </p>

```js
import shortId from 'shortid';
...
export const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '제로초',
  },
});

```

<p>shortid 라이브러리를 import 시켜 필요한 id 속성 값에 shortId.generate()로 실행시키면 id는 랜덤한 문자열로 나타납니다.</p>

<h2>🌟 Immer 라이브러리를 사용하여 불변성을 없앤 간단한 리듀서 만들기 🌟</h2>
<p>immer 라이브러리는 react의 특징인 불변성 유지 없이 코드를 변환할 수 있도록 만들어주는 라이브러리 입니다. immer 라이브러리를 그대로 불러와 'produce'라는 변수명으로 import 시켜 사용합니다.</p>

<h3>기존 불변성을 지킨 코드</h3>

```js
    case ADD_COMMENT_SUCCESS: {
      // action.data.content, postId, userId 가 들어옴 > ADD_POST_SUCCESS로 전달됨

      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;

      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
```

<p>
불변성을 지키기 위해서 reducer에서 사용한 코드이다.이 불변성 때문에 spread 연산자를 통해 객체의 값을 복사해 오는데 더 깊은 복사를 하게 될 수록 오류가 날 확률이 높아진다.따라서 immer를 통해 오류를 줄이고 더 보기 쉬운 코드로 만들어줄 수 있다.
</p>

```js
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    draft;
  });
};
==
 const reducer = (state = initialState, action) => produce(state, (draft) => {});

```

<p>
위와 같이 화살표 함수 뒤에 바로 붙는 함수는 return이 생략된 것이다! 🌟 immer에서는 state 대신 draft라는 값을 사용하는데, 기존의 불변성의 법칙을 깨고 사용하더라도 immer가 이 draft를 감지하여 자동으로 다음 상태(state, 여기서는 draft)로 만들어준다.
</p>

<h3>immer를 통해 불변성을 지키지 않은 코드</h3>

```js
  case ADD_COMMENT_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.postId);
      post.Comments.unshift(dummyComment(action.data.content));
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      break;
    }


```

<p> 기존의 ADD_COMMENT_SUCCESS문을 불변성을 지키기위해 사용했던 것에 비해, immer를 통해 불변성을 지키지 않고 코드를 처리하면 훨씬 더 간결하고 가독성이 좋게 만들어 줄 수 있다. 따라서 immer를 처음부터 도입한 후에 그에 맞춰 작업하는 것이 더 효율적일 수 있다.</p>

<h2>🌟 인피니티 스크롤링 구현하기 🌟</h2>
<p>인피니티 스크롤링은 프론트 엔지니어가 구현해야 하는 가장 주요한 기술 중 하나이다. 백엔드에서 넘어온 데이터들을 로딩 시간을 최소화하여 사용자에게 빠르게 보여주는 것이 중요하다. 현재 진행 상황에서는 백엔드 서버와의 연동이 되어있지 않기 때문에, 더미 데이터를 활용하여 데이터를 불러올 것이다. </p>

```js
useEffect(() => {
  dispatch({ type: LOAD_POSTS_REQUEST });
}, []);

useEffect(() => {
  function onScroll() {
    // console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (hasMorePosts && !loadPostsLoading) {
        dispatch({
          type: LOAD_POSTS_REQUEST,
        });
      }
    }
  }
  window.addEventListener('scroll', onScroll);
  return () => {
    window.removeEventListener('scroll', onScroll);
  };
}, [hasMorePosts, loadPostsLoading]);
```

<p>처음 페이지가 렌더링된 상황에서 첫 번째 useEffect는 아무 것도 없는 mainPosts의 상태를 감지하고, LOAD_POSTS_REQUEST를 통해 데이터를 불러온다. 후에 두 번째 useEffect는 일정한 규칙 (우리 화면이 300 픽셀정도 남기고 밑에 까지 내려갔을 때)에 따라 LOAD_POSTS_REQUEST를 실행시킨다. 하지만, 'scroll' 이라는 이벤트는 엄청나게 많이 발생하기 때문에 REQUEST를 한 번만 실행할 수 있도록 조건을 걸어줘야 한다. 우선 더 불러올 포스트가 있는 지에 대한 'hasMorePosts' 상태가 있고, 현재 포스트를 불러오는 상태가 아닐 때만 포스트를 불러오도록 하는 'loadPostsLoading' 상태가 있다. 또한 saga에서 이 요청이 혹여나 더 넘어올 것을 대비하여 takeLatest, throttle 사가 이펙트를 사용하여 특정 상황에서 가장 최신에 넘어오는 요청만 받아주거나, 일정 기간동안 넘어오는 요청 중 오직 하나에만 답하는 속성을 통해 request에 제한을 걸어주었다.  </p>

<p>reducer의 처리 방식은 다음과 같다.</p>

```js
 case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        // 더미데이터와 기존데 이터를 합쳐줌
        draft.hasMorePosts = draft.mainPosts.length < 50;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
```

<p>현재 더미데이터로 진행되고 있기 때문에 최대 mainPosts를 50개로 제한해 두었고, 기존 mainPosts에 mainPosts를 concat하여 기존 데이터 밑에(뒤에) 붙여주는 형식으로 인피니티 스크롤링을 완성하였다.</p>

<p>saga에서의 처리 방식은 다음과 같다.</p>

```js
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
...

function* watchloadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}
```

<p>watchloadPosts로 넘어오는 LOAD_POSTS_REQUEST 요청을 감지하여 loadPosts 함수를 실행시킨다. 현재 상태에서는 백엔드서버에게 정보를 달라는 요청을 할 수 없기 때문에 delay로 대체하였고, 후에 성공하면 우리가 만든 함수에 의해 10개의 더미포스트가 생성된다.</p>

```js
export const generateDummyPost = (number) =>
  Array(number)
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
    }));
```

<p>generateDummyPost는 파라미터로 숫자를 받는데, 안의 데이터는 faker 라이브러리와 shortId 라이브러리를 이용하여 채워주었다.안의 내용보다는 mainPosts의 속성과 값에 집중해야 한다. 위의 데이터를 현재는 10개만 받아오지만, 프론트 엔지니어로써 수백 수천개의 데이터를 받아 왔을 때 그 데이터를 얼마나 간결하게 받아올 수 잇는 지에 대해 더 공부해야 할 것이다.</p>

<h2>🌟 팔로우 버튼 만들기 🌟</h2>

<p> 구현하고자 하는 팔로우 언팔로우 버튼의 완성된 모습은 다음과 같다.</p>

<img  width="80%" src="./images/followButton.png" title="followButton">

<p> 큰 틀의 디자인은 antd의 모습을 따라가고 있기 때문에 우리는 antd에서 제공하는 속성들에 어떻게 로직을 만들어줘야 할 지를 고민하면 된다.</p>

```js

const id = useSelector((state) => state.user.me?.id);
...

  <Card
        extra={id && <FollowButton post={post} />}
        cover={post.Images[0] && <PostImages images={post.Images} />}
        ...
  />
```

<p>antd에서는 'extra'라는 속성을 통해 image 위에 버튼을 구성할 수 있도록 제공하였다. 따라서 우리는 extra 속성에 id && (id가 존재하면) FollowButton을 누를 수 있는 로직을 제일 처음 짰다. 알다시피 post는 mainPosts를 매핑한 값인데, 이 값에 post와 user에 대한 전체적인 속성값이 들어 있으므로 props로 내려준다. follow request를 보내거나 unfollow request를 보내려면 누구를 팔로우하고 누구를 언팔로우할 지를 데이터로 보내줘야 하기 때문에 이때 post.User.id를 사용하여 데이터에 접근하여 saga에 전달한다.</p>

<p>FollowButton 컴포넌트의 로직은 다음과 같다.</p>

```js
const isFollowing = me && me.Followings.find((v) => v.id == post.User.id);
...

return (
  <Button loading={followLoading || unfollowLoading} onClick={onFollowButton}>
    {isFollowing ? '언팔로우' : '팔로우'}
  </Button>
);
```

<p>isFollowing이라는 변수에 그 사람이 내가 팔로우한 사람인지를 찾기 위한 find((v) => v.id == post.User.id)의 결과 값을 넣어준다. 이미 로그인 상태에서만 팔로우 언팔로우 상태를 볼 수 있으므로 이 결과값은 후에 db에 저장된 데이터에서 불러오게 될 것이다. 현재는 더미 상태이므로 항상 비어 있을 수밖에 없다. 따라서 isFollowing 상태에 따라 <Button></Button>에 언팔로우 또는 팔로우를 보여지게 만들어준다. 결과적으로 주목해야할 것은 ' mainPosts의 post.User.id에 접근하여 isFollowing의 상태를 가져올 수 있느냐 '이다. 프론트 엔지니어라 할 지라도 데이터에 접근하는 방법에 대해 공부해야 할 것이다. </p>

<h1> 🌟 백엔드서버와 소통하는 프론트 구성하기 🌟 </h1>

<p>지금까지 작업한 코드들은 가짜(더미)로 데이터를 만들어 구성하고, 보여주는 방법을 사용했습니다. 지금부터는 실제 프로젝트라고 생각하고 백엔드 작업과 api를 공휴하면서 작업하는 형식으로 문서를 작성하겠습니다. 📁prepare/backend 는 제가 기존에 작성했던 제로초님의 강의 <a href="https://github.com/junh0328/nextjs-sns/tree/master/prepare/backend">리액트 노드버드</a>를 클론 받아 사용합니다. 백엔드의 주요 기능에 대한 설명은 해당 레포지토리에 있으므로 부족한 부분은 링크의 설명 부분을 참고해주세요</p>

<p>우리가 만든 더미 포스트를 통해 작업해야 할 내용은 다음과 같습니다.</p>
<ol>
  <li>회원가입</li>
  <li>로그인</li>
  <li>게시글 블러오기</li>
  <li>게시글 작성</li>
  <li>게시글 제거</li>
  <li>댓글 작성</li>
  <li>닉네임 변경</li>
  <li>팔로잉</li>
  <li>이미지 업로드</li>
  <li>해시태그 등록</li>
  <li>리트윗 </li>
</ol>

<p>회원가입과 로그인을 우선 다루고 axios를 통해 데이터를 어떻게 전달하고 처리받아 virtual DOM이 리렌더링 하는 지까지의 과정을 공부하겠습니다.</p>

<h2>🌟 api로 실제 데이터를 통해 회원가입하기 🌟</h2>

<p>redux-saga를 통해 데이터를 넘기기 위해서는 반드시 post, put, patch를 사용해야 한다. (GET METHOD는 안돼요) 브라우저에서 사용자의 회원가입 요청을 백엔드 서버로 보내게 되면 서로 다른 포트에서 소통을 하게 되므로 <a href="https://developer.mozilla.org/ko/docs/Web/HTTP/CORS">cors(Cross-Origin Resource Sharing)</a> 문제가 발생한다. 따라서 우리는 같은 포트를 사용하는 프론트서버에게 요청을 보내고, 프론트 서버가 백엔드 서버에게 요청을 보내는 방식, <a href="https://react.vlpt.us/redux-middleware/09-cors-and-proxy.html">프록시 방식(proxy)</a>을 사용할 것입니다.</p>

<p> pages/signup 에서 정보를 입력하고 회원가입을 누르면 onsubmit 함수를 실행시킵니다.</p>

```js
const onsubmit = () => {
  // dispatch로 SIGN_UP_REQUEST action을 실행시킴
  dispatch({
    type: SIGN_UP_REQUEST,
    data: { email, password, nickname },
  });
};
```

<p>onsubmit 함수는 SIGN_UP_REQUEST 액션을 실행시키는데, 데이터에는 우리가 input 안에 useState로 주었던 value 값을 action.data로 담아줍니다.</p>

```js
function signUpAPI(data) {
  return axios.post('http://localhost:3065/user', data);
  // data : { email: ... , password: ..., nickname: .... }
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    // action.data = { email, password, nickname }
    console.log(result);
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      data: err.response.data,
    });
  }
}

...

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

```

<p>watchSignUp을 통해 dispatch된 액션인 SIGN_UP_REQUEST 요청을 받은 뒤에, signUp 메소드를 실행시킵니다. signUp 액션은 파라미털 (action)을 받는데 이 액션은 SIGN_UP_REQUEST입니다. 안에 있는 data인 {email, password, nickname} 속성을 call 함수를 통해 signUpAPI로 보내고 결과값을 기다렸다 result에 저장합니다. 백엔드에서 라우팅 처리에 의해 결과값이 반환되고, 성공 시에 SIGN_UP_SUCCESS를 반환하면서 result.data(backend에서 json 형식으로 넘겨준 반환 값)를 함께 넘겨줍니다. 이 상황을 리듀서는 동시에 감지하고 있으며, 성공적으로 데이터가 넘어 왔을 때 signUpDone이 실행되면서 useEffect를 통해 감지되어 ('/') 로그인 페이지로 넘어가게 됩니다. </p>

<h2>🌟 api로 실제 데이터를 통해 로그인하기 🌟</h2>

<p>회원가입 로직을 바탕으로 우리는 컴포넌트에서 보내는 액션을 사가와 리듀서로 하여금 감지하고 서버로 보낸 뒤, 서버에서 판별한 결과 값을 다시 프론트에서 렌더링하는 과정을 살펴보았습니다. 이를 바탕으로 로그인로직을 구현해보겠습니다. </p>

```js
useEffect(() => {
  if (me) {
    alert('로그인 성공 메인페이지로 이동합니다!');
    Router.replace('/main');
  }
}, [me]);

const onSubmitForm = useCallback(() => {
  dispatch(loginRequestAction({ email, password }));
}, [email, password]);

...

 <Form
      style={{ marginRight: 30 }}
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onSubmitForm}
      />
```

<p>onSubmitForm은 form 태그의 onFinish 속성에 해당하는 상황에 발생됩니다. button 태그를 누르면 실행할 수 있도록 onFinish라는 속성을 이용합니다. loginRequestAction 함수는 다음과 같습니다.</p>

```js
export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data, // email, password가 들어있음
  };
};
```

<p> LOG_IN_REQUEST 액션의 데이터에는 당연히 email과 password가 들어있겠죠? 이 LOG_IN_REQUEST를 사가에서 감지하고 서버로 action.data를 넘겨줍니다.</p>

```js
function loginAPI(data) {
  return axios.post('user/login', data);
}

function* logIn(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      data: err.response.data,
    });
  }
}
...

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
```

<p>백엔드에서 어떤 일이 일어나는지 몰라도 괜찮습니다.(알면 좋아요) 프론트엔드에서는 백엔드에서 결과적으로 처리된 result를 다시 front에 컴포넌트로 반환해줍니다. 이때 리듀서도 동시에 결과에 따라 동작하겠죠?  </p>

```js
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.me = action.data;
        draft.logInDone = true;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
```

<p>기존에 더미데이터를 통해 draft.me = dummyUser(action.data)를 넣어줬던 것과 다르게 실제 백엔드에서 처리한 data를 리듀서에 넣어줬습니다. 이제 데이터가 성공적으로 들어 있엇다면, pages/index에서 리듀서에 의해 logInDone=true 인 상황을 감지하고 routing을 통해 pages/main 으로 라우팅해줄 것입니다. 현재 우리는 회원가입을 통해 직접 정보를 입력해야지만 로그인을 할 수 있지만, 백엔드와의 작업을 통해 다양한 로그인 전략(strategy)를 짜서 '카카오로 로그인', '네이버로 로그인', '애플로 로그인' 등 다양한 로그인 방법을 추가할 수 있습니다.</p>

<h2>🌟 axios로 baseURL 설정하기🌟</h2>
<p> saga에서 서버로 데이터를 보낼 때, 우리는 프론트 서버에서 백엔드 서버로 데이터를 넘겨주는 것이기 때문에 cors를 지켜줘야 합니다. 그래서 프론트서버(3000)에서 백엔드 서버(3065)번으로 보내주기 위해서 api에 <b>return axios.post('http://localhost:3065/****', data);</b> 와 같은 형식으로 데이터를 보내주는 것을 알 수 있습니다. 그렇다면 모든 사가에서의 작업에 이런 localhost:3065를 붙여줘야 할까요? 우리는 axios 모듈을 통해 백엔드 포트번호를 사전에 지정해줄 수 있습니다. </p>

```js
📁 sagas/index.js

import axios from 'axios'
...
axios.defaults.baseURL = 'http://localhost:3065';
```

<p>다음과 같이 axios.defaults.baseURL을 통해 같은 로컬 내의 3065번 포트로 보내겠다는 약속을 해줬습니다. 그렇기 때문에 앞으로 saga에서 보내는 작업에서 포트번호를 생략할 수 있습니다.</p>

```js
function loginAPI(data) {
  return axios.post('user/login', data);
}
```
