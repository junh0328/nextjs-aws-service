# nextjs-aws-project

<br>

## 👉🏼 프로젝트 소개

- Next.js / MySQL / AWS 스택을 사용하여 사용한 SNS 서비스의 일부 서비스를 제공 사이트

<hr/>

## 👉🏼 프로젝트 기간

- 2021-01-29 ~ 2021-03-02 (세부 UI및 기능 수정 진행 중)

<hr/>

## 👉🏼 주요 기술 & 라이브러리

### 프론트엔드 부분

- Next.js (Create-next-app)
- antd (CSS 프레임워크)
- styled-componenets (CSS 스타일 관리)
- axios (서버간 데이터 송수신)
- immer (데이터 불변성 관리)
- moment (날짜 관리)
- react-slick (이미지 캐루셀)
- swr (상태 관리)
- redux (비동기 처리)
- redux-saga (비동기 처리 +)
- redux-devtools-extension (크롬 브라우저 외부 서비스 사용하여 상태 관리, 추적)

### 백엔드 부분

- node.js
- nodemon
- express
- express-session
- sequelize
- mysql2
- multer
- cors
- cookie-parser
- passport

### aws 부분

- multer-s3
- hpp
- helmet

### 공통 상태 관리

- cross-env
- dotenv
- pm2

<hr/>

## 👉🏼 프로젝트 구현

1. SSR과 리덕스-사가를 이용한 비동기처리
   > 처음 빈 게시물에서 SSR을 통해 서버에서 데이터를 받아 채워놓는다.

```js
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_POSTS_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);
```

2. useDispatch() 훅 함수를 활용해 LOAD_POSTS_REQUEST와 같은 액션이 호출되면 리덕스-사가에서 이를 처리하고 결과값을 LOAD_POSTS_SUCCESS / LOAD_POSTS_FAILURE 로 반환한다.

```js
unction loadPostsAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`);
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

function* watchloadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

export default function* postSaga() {
  yield all([
    fork(watchloadPosts),
    ....
  ])
}
```

3. 리덕스-사가에서 얻은 정보를 바탕으로 리듀서에서 처리

```js
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.hasMorePosts = action.data.length === 10;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
        ...
      default:
      break;
    }
  });
};

```

4. 리듀서에서 처리된 값을 바탕으로 Virtual DOM이 이를 비교하교 렌더링한다. 후에 상황은 아래 결과를 참조

<hr/>

## 👉🏼 프로젝트 결과

<a href="https://junheedot.com/main" target="_blank">결과물 바로가기</a>

<h2>메인기능</h2>
<img src="./prepare/front/public/main.gif" width="80%" alt="main gif">
<h2>다이나믹 라우팅</h2>
<img src="./prepare/front/public/dynamic.gif" width="80%" alt="main gif">
<hr/>

## 👉🏼 보완할 점 및 느낀 점

### 1. 비동기 구조및 처리 과정

<p>책을 통해 처음 javascript를 배울 때 promise나, async await와 같은 비동기 문법들은 단지 책속의 문자들로만 나열되어있어서 쉽게 와닫지 않았다. 하지만, 코드를 작성하면서 실제로 경험해보니 데이터 송수신에 있어서 비동기처리가 절대 빠지면 안된다는 것을 알게 되었다. 비동기 처리가 없다면, 백엔드 서버와의 소통이 일방향적으로 전달되고 결과값 또는 에러값을 마음대로 뽑아올지도 모른다.(리턴을 제대로 받지 못 할 것이다.) 완벽하진 않지만, 다른 토이프로젝트를 더 진행하면서 redux, redux-saga의 비동기 처리 함수 뿐만 아니라 js의 기본 문법에서 제공하는 비동기 처리 함수에 대해 공부해야겠다</p>

### 2. CORS 정책으로 생기는 오류들 찾기

<p>풀스택으로 강의를 들으며 다시 만들어보면서, CORS 문제를 너무 많이 겪었다. 아마존 웹 서비스에 배포를 하는 과정에서도 리눅스 명령어를 통해 리눅스 서버에서 새롭게 pull 을 해야 하고, axios로 사용자 요청을 백엔드 서버에 넘겨줄 때도 잘못 설정한다면 CORS 문제가 발생하기 다반사였다. (커밋 푸쉬와 풀의 무한 반복...) 상대적으로 프론트에서는 설정해야할 것이 적지만, 내가 처리해 본 사항 외에도 발생할 오류들에 대비해 조금 더 딥한 공부의 필요성을 느꼈다.</p>

### 3. CSS FRAMEWORK

<p>CSS 프레임워크는 정말 독이 든 성배이다. 지금 리액트와 넥스트에서는 함수형 컴포넌트를 통해 작성하지만, CSS FRAMEWORK의 예제들을 클래스형 컴포넌트가 아직도 많이 존재한다. 다시 바꿔서 사용하는 법도 공부를 해야 했고, 'antd'의 글로벌 스타일링 등 세부적으로 접근하여 요소에 스타일링을 주기가 매우 까다로웠다. (모바일 버전을 위해 미디어 쿼리를 쓰는 부분은 아직 매우 많이 부족한듯 하다...) 간편하게 컴포넌트 ui를 제공받는 입장이기 때문에 프론트 개발자 입장에서도 놓치면 안되는 부분인 것 같다.</p>

### 4. javascript 문법

<p>여태까지의 공부 방향이 javascript의 event Listener, DOM, BOM 위주로 공부를 하고 리액트에서 넥스트로 넘어왔다. 그래서 인지, 배열의 프로토타입 함수들(push, filter, concat, find) 등 쓰고 싶을 때 제대로 못쓰는 상황이 발생했다. 내가 생각하는 프론트 개발자의 가장 큰 덕목은 '머릿속으로 구현한 로직을 코드를 통해 나타낼 수 있느냐'인 것 같다. react와 next를 통해 토이프로젝트를 진행하기 전에, js에 대한 좀 더 탄탄한 실력을 갖춘 후에 프레임워크를 공부한다면 훨씬 더 간결하고 가독성 좋은 코드를 작성할 수 있을 것이다. </p>

### 5. AWS

<p>정말 애증의 아마존 웹 서비스이다. 프론트만 가지고 휘발되는 메모리도 좋지만, DB를 포함하여 조금 더 완성된 프로젝트를 다른 사람들에게 보여주고 싶어서 어떻게 끝까지 놓지 않고 AWS를 통해 배포하였다. 기존 강의를 바탕으로 따라만 치는데도, 강의와는 다르게 터미널에서 또다른 요류들이 발생하기도 하였고, 그 오류들을 구글링하는데만 해도 며칠을 쏟아 부은 것 같지만, 해놓고 보니 매우 뿌듯했다. 이렇다 할 결과물을 내 본 적 없이, 계속 인터넷 강의들의 course들을 통해서 공부하다가 이번에야 말로 큰 프로젝트를 만들게 되었다. 프론트와 백엔드를 모두 다뤄 보면서, 한 곳에만 편향될 수 있는 시야를 어느정도 벗어났다고 생각한다. 백엔드 프로그래머와 소통하기 위해 api 처리를 어떻게 RestFul하게 처리할 지, 또는 DB를 만들 때 어떤 관계로 만들어야 프론트나 백에서 소통할 때 편할 지에 대한 고민이 많이 들어 간 것 같다. </p>
<p>도메인을 사서 연결하고, lambda 처리를 통해 이미지를 리사이징하고, 탄력적 IP를 받아서 도메인에 연결하는 작업들이 너무 새롭고 재밌었다. 이런 다양한 경험들이 나중에 나의 발전에 큰 무기가 되리라 믿어 의심치 않는다.</p>
<hr/>
