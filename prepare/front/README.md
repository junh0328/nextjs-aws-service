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
