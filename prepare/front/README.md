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

## 3. 📁 downloaded dependencies

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
                {id && post.User.id === id ? ((<Button>수정</Button>), (<Button type="danger">삭제</Button>)) : <Button>신고</Button>}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta avatar={<Avatar>{post.User.nickname[0]}</Avatar>} title={post.User.nickname} description={post.content} />
      </Card>
      {/* <CommentForm /> */}
      {/* <Comments /> */}
    </div>
  );
};
```

<p>위의 PostCard 컴포넌트처럼 우리는 css framework를 사용하지 않더라도, 미리 넣고싶은 기능들을 상상하여 컴포넌트 형식으로 넣어놓고, 존재하는 부분은 css framework에서 참고하여 속성들을 채우고 없는 부분은 따로 컴포넌트를 더 추가하여 만들어주는 식으로 작성하면 된다. (인스타그램의 포스트카드, 트위터의 포스트카드의 레이아웃을 참고하여 구성하는 편이 하나하나 다 만드는 것보다 더 빠르고 효율적일 것)</p>
