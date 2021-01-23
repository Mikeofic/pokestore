import styled from 'styled-components';
import { widthContainer } from '../../styles/global';

const PageContainer = styled.main`
  display: flex;
  ${widthContainer}
  flex-grow: 1;
`;

export const PokemonSection = styled.section`
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
  flex-grow: 1;
  padding-right: 15px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const CarrinhoSection = styled.section`
  display: flex;
  width: 300px;
  min-width: 300px;
  border-left: 1px solid #ececec;
  background-color: #f7f7f7;
  border-right: 1px solid #ececec;
  padding: 15px;
`;

export default PageContainer;
