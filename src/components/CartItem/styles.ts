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
    left: -5px;
    right: -5px;
    height: 0;
    border-bottom: 2px dashed #e4e4e4;
  }

  .cart-container {
    display: flex;
    width: 100%;
    padding-bottom: 10px;

    img {
      width: 70px;
      height: 70px;
      object-fit: contain;
      background-color: var(--default-color-lightest);
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
    }

    .price-container {
      font-size: 1.5rem;
      font-weight: 300;

      span {
        font-weight: 600;
        color: var(--button-icon-color);
        font-size: 1.7rem;
      }
    }
  }

  .buy-container {
    display: flex;
    width: 100%;

    .quantity-container {
      display: flex;
      align-items: stretch;
      justify-content: space-around;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      box-shadow: 0 10px 7px -12px rgba(0, 0, 0, 0.3);
      padding: 3px;
      flex-grow: 1;
      background-color: white;

      form label {
        overflow: hidden;
        margin: 0;
        padding: 0;
        max-width: 0;
        max-width: 0;
        position: absolute;
      }

      form input {
        font-size: 1.6rem;
        font-weight: 500;
        width: 4.5ch;
        text-align: center;
        height: 100%;
      }

      > button {
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100px;

        > svg {
          width: 20px;
          height: 20px;
          color: var(--button-icon-color);
        }

        &:hover {
          background-color: #efefef;
        }
        &:focus-visible {
          background-color: #efefef;
        }
        &:active {
          background-color: var(--default-color-lightest);
        }
      }
    }

    > button {
      margin-left: 10px;
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

      svg {
        margin-right: 5px;
        height: 20px;
        width: 20px;
      }
    }

    @media (min-width: 768px) and (max-width: 1149px) {
      flex-direction: column;

      > button {
        margin-left: 0;
        margin-top: 10px;
      }
    }

    @media (max-width: 767px) {
      flex-direction: row;

      > button {
        padding: 12px 16px;
      }
    }
  }
`;

export default CartItemContainer;
