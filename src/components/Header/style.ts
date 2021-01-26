import styled from 'styled-components';

import { widthContainer } from '../../styles/global';

const HeaderContainer = styled.header`
  display: flex;
  background-color: #e60014;
  height: 120px;

  > div.container {
    ${widthContainer}
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    display: flex;
    margin-right: 20px;
    position: relative;

    width: 133px;
    height: 93px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: -4px;
      right: -4px;
      background-color: #b10000;
      height: 0px;
      transition: height 0.2s;
    }

    &:focus:after {
      height: 4px;
    }
  }

  .my-orders {
    display: flex;
    color: white;
    position: relative;
    height: 51px;
    width: 49px;
    min-width: 49px;
    margin-left: 20px;

    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: -8px;
      right: -4px;
      background-color: #b10000;
      height: 0px;
      transition: height 0.2s;
    }

    &:focus:after {
      height: 4px;
    }

    .order-length {
      position: absolute;
      top: 0;
      left: 0;
      width: 30px;
      height: 30px;
      border-radius: 21px;
      background-color: #790101;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      border: 3px solid #e60014;
      font-weight: 500;
      transform: translate(-50%, -50%);
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  @media (max-width: 767px) {
    form {
      display: none;
    }
  }
`;

export const CartContainer = styled.button`
  display: flex;
  position: relative;
  margin-left: 20px;

  > div {
    position: absolute;
    z-index: 1;
    margin: 0 auto;
    bottom: 20px;
    left: 0;
    right: 0;

    img {
      position: absolute;
      width: 30px;
      height: 40px;
      object-fit: cover;
    }

    > img:nth-child(1) {
      bottom: 0;
      left: calc(100% - 18px);
      transform: translateX(-50%);
      z-index: 3;
    }

    > img:nth-child(2) {
      bottom: 4px;
      right: calc(50% - 3px);
      transform: translateX(50%);
      z-index: 2;
    }

    > img:nth-child(3) {
      bottom: 7px;
      right: calc(100% - 8px);
      transform: translateX(100%);
      z-index: 1;
    }
  }

  svg {
    position: relative;
    z-index: 2;
    width: 50px;
    height: 50px;
    color: #ffffff;
  }

  > span {
    position: absolute;
    top: 100%;
    left: calc(100% - 7px);
    transform: translate(-50%, -75%);
    z-index: 3;
    background-color: #6b0009;
    width: 34px;
    height: 34px;
    border-radius: 100px;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    border: 3px solid #e60014;
    color: #ffffff;
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

export const NavContainer = styled.nav`
  display: flex;
  height: 46px;
  background-color: #ececec;

  @media (max-width: 767px) {
    border-bottom: 1px solid #dcdcdc;
  }

  .container {
    ${widthContainer}
    display: flex;
    align-items: stretch;

    > span {
      font-weight: 600;
      font-size: 1.6rem;
      display: flex;
      align-items: center;
      margin-right: 15px;
      white-space: nowrap;
    }

    > div {
      display: flex;
      overflow: hidden;
      overflow-x: auto;
      align-items: center;
      flex-grow: 1;

      /* Hide scrollbar for Chrome, Safari and Opera */
      &::-webkit-scrollbar {
        display: none;
      }

      /* Hide scrollbar for IE, Edge and Firefox */
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }

    a {
      display: flex;
      align-items: center;
      border-radius: 100px;

      &:hover,
      &:focus {
        background-color: white;
      }

      + a {
        margin-left: 15px;
      }

      svg {
        width: 30px;
        height: 30px;
        padding: 5px;
      }

      span {
        font-size: 1.6rem;
        color: white;
        font-weight: 500;
        font-size: 1.4rem;
        margin-right: 15px;
        margin-left: 5px;
        white-space: nowrap;
      }
    }

    a.agua {
      svg {
        fill: #335bff;
      }
      span {
        color: #5a76e4;
      }
    }

    a.eletrico {
      svg {
        fill: #efd544;
      }
      span {
        color: #daba07;
      }
    }

    a.grama {
      svg {
        fill: green;
      }
      span {
        color: #0ea50e;
      }
    }

    a.fogo {
      svg {
        fill: red;
      }
      span {
        color: red;
      }
    }
  }
`;

export default HeaderContainer;
