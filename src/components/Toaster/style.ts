import styled from 'styled-components';

const ToastContainer = styled.div`
  position: fixed;
  display: flex;
  top: 20px;
  right: 20px;
  width: 80vw;
  max-width: 300px;

  @media (max-width: 767px) {
    top: 5px;
    right: 5px;
  }

  z-index: 9;

  &.remove {
    max-width: 0 !important;
    max-height: 0 !important;
    overflow: hidden !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  > div {
    background-color: rgba(0, 0, 0, 0.88);
    border-radius: 6px;
    box-shadow: 0 5px 10px -7px rgba(0, 0, 0, 1);
    text-align: center;
    transition: opacity 0.25s;
    padding: 16px;
    padding-right: 22px;
    color: white;
    font-size: 1.3rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    line-height: 1.8rem;

    @media (max-width: 767px) {
      padding: 10px;
      padding-right: 16px;
    }

    &.show {
      opacity: 1;
    }

    &.hide {
      opacity: 0;
    }

    svg {
      min-width: 24px;
      min-height: 24px;
      width: 24px;
      height: 24px;
      color: #ff2e2e;
      margin-right: 10px;

      @media (max-width: 767px) {
        margin-right: 10px;
      }
    }
  }
`;

export default ToastContainer;
