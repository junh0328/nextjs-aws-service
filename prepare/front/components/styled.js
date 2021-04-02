import styled from 'styled-components';

export const CreateModal = styled.div`
  position: fixed;
  text-align: center;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 1022;

  & > div {
    text-align: left;
    margin-bottom: 10px;
    margin-top: 200px;
    display: inline-block;
    width: 350px;
    height: auto;
    background: white;
    --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
    box-shadow: 0 0 0 1px var(--saf-0), 0 4px 12px 0 rgba(0, 0, 0, 0.12);
    background-color: rgba(var(--sk_foreground_min_solid, 248, 248, 248), 1);
    border-radius: 6px;
    user-select: none;
    max-width: 440px;
    padding: 30px 40px;
    z-index: 1012;
    position: relative;
  }
  /* & > div > form {
    margin-bottom: 20px;
  } */
  & > div > form > div > input {
    margin-bottom: 10px;
    margin-top: 10px;
  }

  & div > form > .ant-btn {
    margin-top: 30px;
    margin-left: 100px;
  }

  & div > form > div:last-child {
    margin-left: 90px;
  }
`;

export const CloseModalButton = styled.button`
  position: absolute;
  right: 10px;
  top: 6px;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;
