import styled from 'styled-components';

const OrderRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  background-color: white;
  border-radius: 4px;
  border: 2px solid var(--button-border-color-light);
  box-shadow: 0 10px 14px -12px rgba(0, 0, 0, 0.3);

  @media (max-width: 767px) {
    padding: 10px;
  }

  .title {
    padding: 10px;
    width: 100%;
    background-color: var(--default-color-ever-lightest);
    border-radius: 4px;
    border: 1px solid var(--button-border-color-light);
    box-shadow: 0 10px 14px -12px rgba(0, 0, 0, 0.3);
    margin-left: -10px;
    width: calc(100% + 20px);
    margin-bottom: 5px;
    margin-top: -10px;

    @media (max-width: 767px) {
      margin-left: 0;
      width: 100%;
      margin-bottom: 0;
      margin-top: 0;
    }

    p {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 2.2rem;

      @media (max-width: 767px) {
        font-size: 1.3rem;
        line-height: 1.8rem;
      }

      span {
        font-size: 1.6rem;
        font-weight: 600;
        color: var(--button-filled-background-color);

        @media (max-width: 767px) {
          font-size: 1.5rem;
        }
      }

      & + p {
        @media (max-width: 767px) {
          border-top: 1px dashed var(--button-border-color-light);
          margin-top: 6px;
          padding-top: 6px;
        }
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
    background-color: var(--default-color-lightest);
    margin-right: 20px;
    padding: 4px;

    @media (max-width: 767px) {
      margin-right: 10px;
      height: 96px;
      width: 96px;
      padding: 0;
    }
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
      @media (max-width: 767px) {
        font-size: 1.2rem;
      }

      & + p {
        margin-top: 3px;
      }

      span {
        font-weight: 600;
        font-size: 1.4rem;

        @media (max-width: 767px) {
          font-size: 1.3rem;
        }
      }
    }
    .name {
      font-weight: 400;
      font-size: 2.2rem;
      margin-bottom: 4px;
      padding-bottom: 4px;
      border-bottom: 1px solid var(--button-border-color-light);

      @media (max-width: 767px) {
        font-size: 1.8rem;
      }
    }
  }
`;

export default OrderRowContainer;
