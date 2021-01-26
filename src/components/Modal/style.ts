import styled from 'styled-components';

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  margin-bottom: -60px;
  padding-bottom: 60px;
  z-index: 4;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  ${props =>
    props.className?.includes('remove')
      ? `
    max-width: 0 !important;
    max-height: 0 !important;
    overflow: hidden !important;
    padding: 0 !important;
    margin: 0 !important;
  `
      : ''};

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    position: absolute;
    z-index: 4;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.35s;
  }

  > div.show {
    opacity: 1;
  }

  > div.hide {
    opacity: 0;
  }

  > div {
    .modal {
      position: relative;
      z-index: 5;
      width: 100%;
      max-width: 730px;
      border-radius: 4px;
      padding: 15px;
    }

    > button.close {
      position: fixed;
      top: 15px;
      right: 15px;
      z-index: 5;
      background: unset;
      border: 2px solid transparent;
      border-radius: 60px;
      padding: 8px;
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: rgba(255, 255, 255, 0.15);
      }

      &:focus {
        border-color: #3c3c3c;
      }

      svg {
        color: #fff;
      }
    }
  }
`;

export const Background = styled.button`
  position: absolute;
  background: rgba(0, 0, 0, 0.87);
  top: 0;
  right: 0;
  z-index: 4;
  outline: none;
  width: 100%;
  height: 100%;
`;

export default ModalContainer;
