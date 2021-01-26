import styled from 'styled-components';
import { widthContainer } from '../../styles/global';

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  ${widthContainer}
  flex-grow: 1;
`;

export const OrdersSection = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  border: 1px solid #e4e4e4;
  background-color: #f7f7f7;
  padding: 15px;
  border-radius: 5px;
  margin-top: 15px;

  h1 {
    font-size: 2.2rem;
    display: inline-flex;
    margin: 0 auto;
    padding: 10px 15px 0;
    border-radius: 0;

    @media (max-width: 767px) {
      padding-top: 3px;
    }

    &.no-orders {
      margin-bottom: 15px;
      padding: 10px 15px;
    }
  }

  > p {
    display: block;
    text-align: right;
    margin-bottom: 9px;
    padding-right: 5px;
    font-weight: 300;
    font-size: 1.5rem;
    color: #6d6d6d;

    @media (max-width: 767px) {
      text-align: center;
      margin-top: 8px;
      margin-bottom: 14px;
    }

    span {
      font-weight: 500;
    }
  }

  > p.load-more {
    display: unset;
    text-align: unset;
    margin-bottom: unset;
    padding-right: unset;
    font-weight: unset;
    font-size: unset;
    color: unset;
    padding-bottom: 60px;
    display: flex;
    justify-content: center;

    span {
      font-weight: unset;
    }

    button {
      margin-left: 6px;
      padding: 9px 21px;
      font-size: 1.7rem;
      border-radius: 5px;
      background-color: #ff3838;
      color: white;
      border-color: 2px solid transparent;
      box-shadow: 0 10px 7px -12px rgba(0, 0, 0, 0.3);
      /* transition: border-color 0.05s, background-color 0.05s, color 0.05s; */
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
        box-shadow: 0 10px 10px -12px rgba(236, 0, 0, 0.7),
          0 0 0 3px rgba(255, 0, 0, 0.19);
      }
      &:focus-visible {
        box-shadow: 0 10px 10px -12px rgba(236, 0, 0, 0.7),
          0 0 0 3px rgba(255, 0, 0, 0.19);
      }
      &:active {
        background-color: #ff6a6a;
        box-shadow: 0 10px 10px -12px rgba(236, 0, 0, 0.7),
          0 0 0 3px rgba(255, 0, 0, 0.19);
      }

      svg {
        margin-left: 4px;
        height: 28px;
        width: 28px;
      }
    }
  }

  .empty-orders {
    display: flex;
    flex-direction: column;
    padding: 30px;
    margin-bottom: 20px;
    width: 100%;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 10px 14px -12px rgba(0, 0, 0, 0.3);
    align-items: center;

    p {
      font-size: 1.8rem;
      font-weight: 500;
      margin-bottom: 30px;
    }

    a {
      padding: 10px;
      font-size: 1.5rem;
      border-radius: 5px;
      color: white;
      border: 2px solid #ff8686;
      color: red;
      box-shadow: 0 10px 7px -12px rgba(0, 0, 0, 0.3);
      /* transition: border-color 0.05s, background-color 0.05s, color 0.05s; */
      display: inline-flex;
      align-items: center;
      font-weight: 500;
      justify-content: center;

      svg {
        margin-right: 5px;
        height: 20px;
        width: 20px;
      }

      &:hover {
        background-color: #ffe5e5;
      }
      &:focus-visible {
        background-color: #ffe5e5;
      }
      &:active {
        background-color: #ff3838;
        border-color: transparent;
        color: white;
      }
    }
  }
`;

export default PageContainer;
