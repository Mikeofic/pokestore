import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../AppProvider';
import { typeIds, TypeNames } from '../../services/interfaces';
import TipTool from '../TipTool';
import HeaderContainer, { NavContainer } from './style';
import FogoLogo from '../../assets/header_fogo.png';
import { ReactComponent as AguaSVG } from '../../assets/water.svg';
import { ReactComponent as GramaSVG } from '../../assets/grass.svg';
import { ReactComponent as EletricoSVG } from '../../assets/electric.svg';
import { ReactComponent as FogoSVG } from '../../assets/fire.svg';
import { ReactComponent as ShopBagSVG } from '../../assets/bagred.svg';
import SearchBar from '../SearchBar';

const Header: React.FC<TypeNames> = ({ typeName }) => {
  const [typeId] = useState(typeIds[typeName]);
  const { appContext, setSearchTerms } = useContext(AppContext);
  const [showOrdersTipTool, setShowOrdersTipTool] = useState(false);

  return (
    <>
      <HeaderContainer>
        <div className="container">
          <Link to="/fogo" className="logo" onClick={() => setSearchTerms('')}>
            <img src={FogoLogo} alt="Poké Store" />
          </Link>

          <SearchBar typeName={typeName} />

          <Link
            className="my-orders"
            to="/fogo/orders"
            onMouseEnter={() => setShowOrdersTipTool(true)}
            onMouseLeave={() => setShowOrdersTipTool(false)}
          >
            <ShopBagSVG />
            {appContext[typeId].myOrders.length > 0 && (
              <div className="order-length">
                {appContext[typeId].myOrders.length > 9
                  ? '9+'
                  : appContext[typeId].myOrders.length}
              </div>
            )}
            <TipTool show={showOrdersTipTool} align="right">
              Minhas Compras
            </TipTool>
          </Link>
        </div>
      </HeaderContainer>

      <NavContainer>
        <div className="container">
          <span>Outras Lojas:</span>
          <div>
            {typeName !== 'fogo' && (
              <Link to="/fogo" className="fogo">
                <FogoSVG />
                <span>Loja Fogo</span>
              </Link>
            )}
            {typeName !== 'agua' && (
              <Link to="/agua" className="agua">
                <AguaSVG />
                <span>Loja Água</span>
              </Link>
            )}
            {typeName !== 'grama' && (
              <Link to="/grama" className="grama">
                <GramaSVG />
                <span>Loja Grama</span>
              </Link>
            )}
            {typeName !== 'eletrico' && (
              <Link to="/eletrico" className="eletrico">
                <EletricoSVG />
                <span>Loja Elétrico</span>
              </Link>
            )}
          </div>
        </div>
      </NavContainer>
    </>
  );
};

export default Header;
