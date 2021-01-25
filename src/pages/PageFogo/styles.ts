import styled from 'styled-components';
import { widthContainer } from '../../styles/global';

const PageContainer = styled.main`
  display: flex;
  ${widthContainer}
  flex-grow: 1;
`;

export const PokemonSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 15px;
  flex-grow: 1;
  padding-right: 15px;
  position: relative;

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
      background-color: #ff3838;
      color: white;
      border-color: 2px solid transparent;
      box-shadow: 0 10px 7px -12px rgba(0, 0, 0, 0.3);
      transition: border-color 0.2s, background-color 0.2s, color 0.2s;
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

      &:hover,
      &:focus {
        background-color: #ff6a6a;
        box-shadow: 0 10px 10px -12px rgba(236, 0, 0, 0.7);
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
      border: 2px solid #ffaeae;
      margin: 0 -5px;
      box-shadow: 0 10px 14px -12px rgba(0, 0, 0, 0.3);
      color: #f95656;
      font-size: 1.5rem;
      font-weight: 500;
    }
  }

  .loader {
    color: #fff;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    overflow: hidden;
    opacity: 0.8;
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
  padding: 15px;
  margin: 15px 0;
  border-radius: 5px;
`;

export const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  background-color: white;
  border-radius: 4px;
  border: 2px solid #ffaeae;
  margin: 0 -5px;
  box-shadow: 0 10px 14px -12px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 4;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 8px;
    border-bottom: 1px dashed #d6d6d6;
    padding-top: 6px;
    padding-bottom: 10px;
    text-align: center;
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
      color: red;
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
    margin-left: 6px;
    padding: 13px 16px;
    font-size: 1.7rem;
    border-radius: 5px;
    background-color: #ff3838;
    color: white;
    border-color: 2px solid transparent;
    box-shadow: 0 10px 7px -12px rgba(0, 0, 0, 0.3);
    transition: border-color 0.2s, background-color 0.2s, color 0.2s;
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

    &:hover,
    &:focus {
      background-color: #ff6a6a;
      box-shadow: 0 10px 10px -12px rgba(236, 0, 0, 0.7);
    }

    svg {
      margin-left: 4px;
      height: 20px;
      width: 20px;
    }
  }

  @media (max-width: 1049px) {
    flex-direction: column;
  }

  .empty-cart {
    font-size: 1.6rem;
    font-weight: 500;
    color: #5f5f5f;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #f95656;
    padding: 10px 0;

    svg {
      height: 38px;
      width: 38px;
      padding: 6px;
      background-color: #ffdfdf;
      border-radius: 30px;
      color: red;
      margin-right: 10px;
    }
  }
`;

export const ModalContainer = styled.div`
  background: white;
  padding: 60px 30px;
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

    @media (max-width: 767px) {
      display: none;
    }
  }

  h2 {
    font-size: 2.8rem;
    margin-bottom: 15px;
  }

  > div {
    display: flex;
    padding: 20px 0;
    font-size: 1.6rem;
    align-items: baseline;

    & + div {
      border-top: 2px dashed #d0d0d0;
    }

    span {
      font-weight: 600;
      font-size: 1.7rem;
      color: red;
      margin: 0 5px;
    }

    > svg {
      display: inline-flex;
      height: 1.8rem;
      width: 1.8rem;
      margin-right: 5px;
    }
  }

  button {
    padding: 10px;
    font-size: 1.5rem;
    border-radius: 5px;
    color: white;
    border: 2px solid #ff8686;
    color: red;
    box-shadow: 0 10px 7px -12px rgba(0, 0, 0, 0.3);
    transition: border-color 0.2s, background-color 0.2s, color 0.2s;
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

    &:hover,
    &:focus {
      background-color: #ff3838;
      border-color: transparent;
      color: white;
    }

    svg {
      margin-right: 5px;
      height: 20px;
      width: 20px;
    }
  }
`;

export default PageContainer;
