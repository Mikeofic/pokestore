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

  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

export const CartSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 300px;
  min-width: 300px;
  /* border: 1px solid #ececec; */
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
  /* border: 1px solid #d4d4d4; */
  margin: 0 -5px;
  box-shadow: 0 10px 14px -12px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 4;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 8px;
    /* border-bottom: 1px dashed #ffaeae; */
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
    height: 56px;
    padding: 0 6px;
    margin-bottom: 8px;

    .quantity {
      font-weight: 300;
      font-size: 1.5rem;

      span {
        font-weight: 600;
        font-size: 1.7rem;
      }
    }

    .price {
      font-weight: 300;
      font-size: 1.5rem;

      span {
        font-weight: 600;
        font-size: 1.7rem;
        color: red;
      }
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

export default PageContainer;
