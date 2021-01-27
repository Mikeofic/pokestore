import styled from 'styled-components';

import { widthContainer } from '../../styles/global';

const HeaderContainer = styled.header`
  display: flex;
  background-color: var(--header-color);
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

    width: 139px;
    height: 93px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &:after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: -4px;
      right: -4px;
      background-color: var(--logo-focus-color);
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
    height: 56px;
    width: 55px;
    min-width: 49px;
    margin-left: 20px;

    &:after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: -8px;
      right: -4px;
      background-color: var(--logo-focus-color);
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
      background-color: var(--default-color-darkest);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      border: 3px solid var(--header-color);
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

      &:hover {
        background-color: white;
      }
      &:focus-visible {
        background-color: white;
      }
      &:active {
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.25);
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
