import styled from 'styled-components';
import { widthContainer } from '../../styles/global';

const PageContainer = styled.main`
  display: flex;
  ${widthContainer}
  flex-grow: 1;

  &.cart-on-left {
    flex-direction: row-reverse;
  }

  > a.cart-container {
    display: none;
    @media (max-width: 767px) {
      display: flex;
    }

    bottom: 20px;
    right: 20px;
    position: fixed;
    width: 60px;
    height: 60px;
    border-radius: 40px;
    align-items: center;
    justify-content: center;
    padding: 14px;
    background: linear-gradient(
      90deg,
      var(--logo-focus-color-lighter) 0%,
      var(--header-color) 100%
    );
    box-shadow: 0 4px 10px -6px var(--logo-focus-color);

    &:hover {
      background: linear-gradient(
        90deg,
        var(--header-color) 0%,
        var(--header-color) 100%
      );
      box-shadow: 0 4px 10px -6px var(--logo-focus-color),
        0 0 0 3px var(--default-color-darkest-transparent);
    }
    &:focus-visible {
      background: linear-gradient(
        90deg,
        var(--light-text-color) 0%,
        var(--light-text-color) 100%
      );
      box-shadow: 0 4px 10px -6px var(--logo-focus-color),
        0 0 0 3px var(--default-color-darkest-transparent);
    }
    &:active {
      background: linear-gradient(
        90deg,
        var(--light-text-color) 0%,
        var(--light-text-color) 100%
      );
      box-shadow: 0 4px 10px -6px var(--logo-focus-color),
        0 0 0 3px var(--default-color-darkest-transparent);
    }

    svg {
      width: 100%;
      height: 100%;
      color: white;
    }

    > div {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 100px;
      width: 27px;
      height: 27px;
      transform: translate(-35%, -35%);
      background-color: var(--button-icon-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      font-weight: 500;
      box-shadow: 0 4px 10px -6px black;
    }
  }
`;

export const PokemonSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 15px;
  flex-grow: 1;
  padding-right: 15px;
  position: relative;

  &.cart-on-left {
    padding-right: 0;
    padding-left: 15px;
  }

  @media (max-width: 767px) {
    padding-right: 0;
    margin-top: 0;

    &.cart-on-left {
      padding-right: 0;
      padding-left: 0;
    }

    > form {
      display: flex;
    }
  }

  @media (min-width: 767px) {
    > form {
      display: none;
    }
  }

  > div.search {
    justify-content: center;
    margin-bottom: 15px;
    font-size: 1.7rem;
    font-weight: 300;

    p {
      padding: 7px 12px;
      background-color: #f1f1f1;
      border-radius: 4px;
      color: #676767;
      text-align: center;

      span {
        font-weight: 600;
        font-size: 1.9rem;
        color: var(--button-icon-color);
      }
    }
  }

  > form {
    position: sticky;
    top: 0;
    min-width: calc(100% + 20px);
    width: calc(100% + 10px);
    margin-left: -10px;
    margin-bottom: 15px;
    border-bottom: 1px solid #d0d0d0;
    border-radius: 0;
    padding: 5px;
    height: 58px;
    box-shadow: 0 8px 8px -10px rgba(0, 0, 0, 0.5);

    &:focus-within {
      box-shadow: 0 8px 8px -10px rgba(0, 0, 0, 0.5);
    }
  }

  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  > p {
    padding-bottom: 60px;
    display: flex;
    justify-content: center;

    button {
      margin-left: 6px;
      padding: 9px 21px;
      font-size: 1.7rem;
      border-radius: 5px;
      background-color: var(--button-filled-background-color);
      color: white;
      border-color: 2px solid transparent;
      box-shadow: 0 10px 7px -12px rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      font-weight: 500;
      justify-content: center;

      &:disabled,
      &:disabled:hover,
      &:disabled:focus {
        background-color: #f7f7f7;
        border: 2px solid transparent;
        color: transparent;
        box-shadow: unset;
        transition: unset;
        cursor: unset;
      }

      &:hover {
        box-shadow: 0 10px 10px -12px var(--button-box-shadow-color),
          0 0 0 3px var(--button-hover-outline-color);
      }
      &:focus-visible {
        box-shadow: 0 10px 10px -12px var(--button-box-shadow-color),
          0 0 0 3px var(--button-hover-outline-color);
      }
      &:active {
        background-color: var(--button-active-background-color);
        box-shadow: 0 10px 10px -12px var(--button-box-shadow-color),
          0 0 0 3px var(--button-hover-outline-color);
      }

      svg {
        margin-left: 4px;
        height: 28px;
        width: 28px;
      }
    }
  }

  > span {
    display: flex;
    justify-content: center;

    span {
      display: flex;
      flex-direction: column;
      padding: 16px;
      background-color: white;
      border-radius: 4px;
      border: 2px solid var(--button-border-color-light);
      margin: 0 -5px;
      box-shadow: 0 10px 14px -12px rgba(0, 0, 0, 0.3);
      color: var(--light-text-color);
      font-size: 1.5rem;
      font-weight: 500;
    }
  }

  .loader {
    color: #fff;
    position: absolute;
    width: 100%;
    height: 100%;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 20px;
    overflow: hidden;
    opacity: 0.8;

    @media (max-width: 1149px) {
      transform: scale(0.75);
    }
  }
  .loader:after,
  .loader:before {
    display: block;
  }
  .loader-pokeball:before {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    top: calc(50% - 6px);
    left: calc(50% - 6px);
    margin: -50px 0 0 -50px;
    background: linear-gradient(180deg, red 42%, #000 0, #000 58%, #fff 0);
    background-repeat: no-repeat;
    background-color: #fff;
    border-radius: 50%;
    z-index: 1;
    animation: movePokeball 1s linear infinite both;
    border: 7px solid black;
  }
  .loader-pokeball:after {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    top: 50%;
    left: 50%;
    margin: -12px 0 0 -12px;
    background-color: #fff;
    border-radius: 50%;
    z-index: 2;
    animation: movePokeball 1s linear infinite both,
      flashPokeball 0.5s infinite alternate;
    border: 2px solid #000;
    box-shadow: 0 0 0 5px #fff, 0 0 0 10px #000;
  }
  @keyframes movePokeball {
    0% {
      transform: translateX(0) rotate(0);
    }
    15% {
      transform: translatex(-10px) rotate(-5deg);
    }
    30% {
      transform: translateX(10px) rotate(5deg);
    }
    45% {
      transform: translatex(0) rotate(0);
    }
  }
  @keyframes flashPokeball {
    0% {
      background-color: #fff;
    }
    to {
      background-color: #fd0;
    }
  }
`;

export const CartSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 300px;
  min-width: 300px;
  border: 1px solid #e4e4e4;
  background-color: #f7f7f7;
  margin: 15px 0;
  border-radius: 5px;

  > div {
    display: flex;
    flex-direction: column;
    padding: 15px;
    flex-grow: 1;
  }

  @media (min-width: 768px) and (max-width: 1149px) {
    width: 250px;
    min-width: 250px;
  }

  @media (max-width: 767px) {
    width: 100%;
    position: fixed;
    top: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    margin: 0;
    border: 0;
    border-radius: 0;
    transition: top 0.5s ease-in-out;
    margin-bottom: -60px;
    padding-bottom: 60px;

    > div {
      display: flex;
      flex-direction: column;
      padding: 15px;
      overflow: hidden;
      overflow-y: auto;
      min-height: 100%;

      &:after {
        content: '';
        width: 100%;
        min-height: 89px;
        max-height: 90px;
        display: flex;
      }
    }

    &.show-on-mobile {
      top: 0%;
    }
  }
`;

export const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  background-color: white;
  border-radius: 4px;
  border: 2px solid var(--button-border-color-light);
  margin: 0 -5px;
  box-shadow: 0 10px 14px -12px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 4;

  @media (max-width: 767px) {
    padding: 5px;
  }

  h3 {
    font-size: 1.8rem;
    margin-bottom: 8px;
    border-bottom: 1px dashed #d6d6d6;
    padding-top: 6px;
    padding-bottom: 10px;
    text-align: center;

    @media (max-width: 767px) {
      margin-bottom: 5px;
      padding-top: 4px;
      padding-bottom: 7px;
    }
  }

  .checkout-container {
    display: flex;
    flex-direction: column;
    margin: 5px 0;
  }

  .checkout-data {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    font-size: 1.5rem;
    justify-content: space-around;
    padding: 0 6px;

    > div {
      margin-bottom: 8px;

      @media (max-width: 767px) {
        margin-bottom: 5px;
      }
    }

    .quantity,
    .price,
    .cashback {
      font-weight: 300;
      font-size: 1.5rem;

      span {
        font-weight: 600;
        font-size: 1.6rem;
      }
    }

    .price > span {
      color: var(--button-icon-color);
    }

    .cashback span span {
      color: black;
      font-weight: 300;
      font-size: 1.5rem;
    }

    .price span {
      font-size: 1.85rem;
    }
  }

  a {
    margin-left: 0;
    padding: 13px 16px;
    @media (max-width: 767px) {
      padding-top: 11px;
      padding-bottom: 11px;
    }
    font-size: 1.7rem;
    border-radius: 5px;
    background-color: var(--button-filled-background-color);
    color: white;
    border-color: 2px solid transparent;
    box-shadow: 0 10px 7px -12px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    font-weight: 500;
    justify-content: center;

    &:disabled,
    &:disabled:hover,
    &:disabled:focus {
      background-color: #f7f7f7;
      border: 2px solid transparent;
      color: transparent;
      box-shadow: unset;
      transition: unset;
      cursor: unset;
    }

    &:hover {
      box-shadow: 0 10px 10px -12px var(--button-box-shadow-color),
        0 0 0 3px var(--button-hover-outline-color);
    }
    &:focus-visible {
      box-shadow: 0 10px 10px -12px var(--button-box-shadow-color),
        0 0 0 3px var(--button-hover-outline-color);
    }
    &:active {
      background-color: var(--button-active-background-color);
      box-shadow: 0 10px 10px -12px var(--button-box-shadow-color),
        0 0 0 3px var(--button-hover-outline-color);
    }

    svg {
      margin-left: 4px;
      height: 20px;
      width: 20px;
    }
  }

  @media (max-width: 1149px) {
    flex-direction: column;
  }

  .empty-cart {
    font-size: 1.6rem;
    font-weight: 500;
    color: #5f5f5f;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--light-text-color);
    padding: 10px 0;

    svg {
      height: 38px;
      width: 38px;
      padding: 6px;
      background-color: var(--default-color-lightest);
      border-radius: 30px;
      color: var(--button-icon-color);
      margin-right: 10px;
    }
  }
`;

export const ModalContainer = styled.div`
  background: white;
  padding: 60px 30px;
  @media (max-width: 767px) {
    padding: 40px 20px;
  }

  display: flex;
  flex-direction: column;
  border-radius: 5px;
  align-items: center;
  overflow: hidden;
  position: relative;

  * {
    position: relative;
    z-index: 2;
  }

  img {
    position: absolute;
    z-index: 1;
    bottom: -1px;
    left: -1px;
    width: 200px;
    height: 200px;
    object-fit: contain;
    object-position: left bottom;

    @media (max-width: 767px) {
      display: none;
    }
  }

  h2 {
    font-size: 2.8rem;
    margin-bottom: 15px;
    text-align: center;
  }

  > div {
    display: block;
    padding: 20px 0;
    font-size: 1.6rem;
    align-items: baseline;
    > svg {
      margin-bottom: -3px;
    }

    @media (max-width: 767px) {
      display: block;
      text-align: center;
      line-height: 2.2rem;
    }

    & + div {
      border-top: 2px dashed #d0d0d0;
    }

    span {
      font-weight: 600;
      font-size: 1.7rem;
      color: var(--button-icon-color);
    }

    > svg {
      display: inline-flex;
      height: 1.8rem;
      width: 1.8rem;
      margin-right: 5px;
    }
  }

  .btn-container > a {
    padding: 10px;
    font-size: 1.5rem;
    border-radius: 5px;
    color: white;
    border: 2px solid var(--button-border-color);
    color: var(--button-icon-color);
    box-shadow: 0 10px 7px -12px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    font-weight: 500;
    justify-content: center;

    &:disabled,
    &:disabled:hover,
    &:disabled:focus {
      background-color: #f7f7f7;
      border: 2px solid transparent;
      color: transparent;
      box-shadow: unset;
      transition: unset;
      cursor: unset;
    }

    &:hover {
      background-color: var(--default-color-lightest);
    }
    &:focus-visible {
      background-color: var(--default-color-lightest);
    }
    &:active {
      background-color: var(--button-filled-background-color);
      border-color: transparent;
      color: white;
    }

    &.gray-style {
      border-color: #d4d4d4;
      color: #757575;

      &:hover {
        background-color: #efefef;
      }
      &:focus-visible {
        background-color: #efefef;
      }
      &:active {
        background-color: #d4d4d4;
        border-color: transparent;
        color: white;
      }
    }

    svg {
      margin-right: 5px;
      height: 20px;
      width: 20px;
    }

    &.icon-on-right svg {
      margin-right: 0;
      margin-left: 5px;
    }
  }
`;

export default PageContainer;
