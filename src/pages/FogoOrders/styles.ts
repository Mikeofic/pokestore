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
    margin-bottom: 15px;
    padding: 10px 15px;
    border-radius: 0;
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
      transition: border-color 0.2s, background-color 0.2s, color 0.2s;
      display: inline-flex;
      align-items: center;
      font-weight: 500;
      justify-content: center;

      svg {
        margin-right: 5px;
        height: 20px;
        width: 20px;
      }

      &:hover,
      &:focus {
        background-color: #ff3838;
        border-color: transparent;
        color: white;
      }
    }
  }
`;

export default PageContainer;
