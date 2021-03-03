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

<hr/>
