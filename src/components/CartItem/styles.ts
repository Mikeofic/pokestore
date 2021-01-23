import styled from 'styled-components';

const CartItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  padding: 20px 0;

  :before {
    content: '';
    position: absolute;
    bottom: 0;
    left: -15px;
    right: -15px;
    height: 1px;
    background-color: #e9e9e9;
  }

  .cart-container {
    display: flex;
    width: 100%;
    padding-bottom: 10px;

    img {
      width: 70px;
      height: 70px;
      object-fit: cover;
      background-color: #ffe3e3;
      border-radius: 12px;
    }

    .data-container {
      flex-grow: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding-left: 15px;
    }

    .name-container {
      font-size: 1.8rem;
      margin-bottom: 5px;
      font-weight: 500;
      /* border-bottom: 1px solid #e8e8e8;
      padding-bottom: 5px; */
    }

    .price-container {
      font-size: 1.5rem;
      font-weight: 300;

      span {
        font-weight: 600;
        color: red;
        font-size: 1.7rem;
      }
    }
  }

  .buy-container {
    display: flex;
    width: 100%;

    .quantity-container {
      display: flex;
      align-items: center;
      justify-content: space-around;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      box-shadow: 0 10px 7px -12px rgba(0, 0, 0, 0.3);
      padding: 5px;
      flex-grow: 1;
      background-color: white;

      > span {
        font-size: 1.5rem;
        font-weight: 500;
      }

      > button {
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100px;

        > svg {
          width: 20px;
          height: 20px;
        }

        :hover,
        :focus {
          background-color: #f0f0f0;
        }
      }
    }

    > button {
      margin-left: 10px;
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

      :disabled,
      :disabled:hover,
      :disabled:focus {
        background-color: #f7f7f7;
        border: 2px solid transparent;
        color: transparent;
        box-shadow: unset;
        transition: unset;
        cursor: unset;
      }

      :hover,
      :focus {
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

    @media (max-width: 1049px) {
      flex-direction: column;

      > button {
        margin-left: 0;
        margin-top: 10px;
      }
    }
  }
`;

export default CartItemContainer;
