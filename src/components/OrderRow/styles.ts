import styled from 'styled-components';

const OrderRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  background-color: white;
  border-radius: 4px;
  border: 2px solid #ffaeae;
  box-shadow: 0 10px 14px -12px rgba(0, 0, 0, 0.3);

  .title {
    padding: 10px;
    width: 100%;
    background-color: #ffefef;
    border-radius: 4px;
    border: 1px solid #ffaeae;
    box-shadow: 0 10px 14px -12px rgba(0, 0, 0, 0.3);
    margin-left: -10px;
    width: calc(100% + 20px);
    margin-bottom: 5px;
    margin-top: -10px;

    p {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 2.2rem;

      span {
        font-size: 1.6rem;
        font-weight: 600;
        color: #fb0000;
      }
    }
  }
`;

export const PokemonRow = styled.div`
  display: flex;
  border-bottom-width: 2px;
  padding: 10px 0;

  img {
    height: 104px;
    width: 104px;
    border-radius: 12px;
    background-color: #ffdcdc;
    margin-right: 20px;
    padding: 4px;
  }

  & + div {
    border-top: 2px dashed rgb(216, 216, 216);
  }

  > div {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;

    p {
      font-size: 1.3rem;
      font-weight: 400;

      & + p {
        margin-top: 3px;
      }

      span {
        font-weight: 600;
        font-size: 1.4rem;
      }
    }
    .name {
      font-weight: 400;
      font-size: 2.2rem;
      margin-bottom: 4px;
      padding-bottom: 4px;
      border-bottom: 1px solid #ffaeae;
    }
  }
`;

export default OrderRowContainer;
