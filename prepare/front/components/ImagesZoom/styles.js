/*
  index.js에서 분리된 styled-components 들은 export 시켜 index.js에서 사용할 수 있도록 한다.
  후에 index.js에서 import 시킨다.
*/

import styled, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

// 'n 개의 사진 더보기를 눌렀을 때 오버레이되면서'
export const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Header = styled.header`
  height: 55px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;

  & h1 {
    margin: 0;
    font-size: 14px;
    color: #333;
    line-height: 55px;
  }
`;

// antd 컴포넌트를 스타일링 하기위해 스타일드 컴포넌트로 button >> CloseBtn으로 만들어 주었다.
export const CloseBtn = styled(CloseOutlined)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  line-height: 24px;
  font-size: 22px;
  cursor: pointer;

  &:hover {
    color: #1890ff;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-property: all;
    transition-duration: 0.3s;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-delay: 0s;
  }
`;

export const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  background: #090909;
`;

export const ImgWrapper = styled.div`
  padding: 32px;
  text-align: center;

  & img {
    margin: 0 auto;
    max-height: 600px;
    vertical-align: middle;
  }
`;

export const Indicator = styled.div`
  text-align: center;

  & > div {
    width: 75px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    background: #313131;
    display: inline-block;
    text-align: center;
    color: white;
    font-size: 15px;
  }
`;

export const Global = createGlobalStyle`
  .slick-slide{
    display: inline-block;  
  }
  .ant-card-cover{
    transform: none !important;
  }

  @media (max-width: 420px) {
    & img{
      width: 100%;
  }
  @media (max-width:1080px){
    & img{
      width: 100%;
    }
  }
}

`;
