import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../AppProvider';
import { typeIds, TypeNames } from '../../services/interfaces';
import TipTool from '../TipTool';
import HeaderContainer, { NavContainer } from './style';
import fogoLogo from '../../assets/header_fogo.png';
import aguaLogo from '../../assets/header_agua.png';
import gramaLogo from '../../assets/header_grama.png';
import eletricoLogo from '../../assets/header_eletrico.png';
import { ReactComponent as AguaSVG } from '../../assets/water.svg';
import { ReactComponent as GramaSVG } from '../../assets/grass.svg';
import { ReactComponent as EletricoSVG } from '../../assets/electric.svg';
import { ReactComponent as FogoSVG } from '../../assets/fire.svg';
import { ReactComponent as RedShopBagSVG } from '../../assets/bagred.svg';
import { ReactComponent as BlueShopBagSVG } from '../../assets/bagblue.svg';
import { ReactComponent as GreenShopBagSVG } from '../../assets/baggreen.svg';
import { ReactComponent as YellowShopBagSVG } from '../../assets/bagyellow.svg';
import SearchBar from '../SearchBar';

const Header: React.FC<TypeNames> = ({ typeName }) => {
  const { appContext, setSearchBarTerms } = useAppContext();

  const [typeId, setTypeId] = useState(typeIds[typeName].id);
  const [showOrdersTipTool, setShowOrdersTipTool] = useState(false);

  useEffect(() => {
    setTypeId(typeIds[typeName].id);
    setShowOrdersTipTool(false);
  }, [typeName]);

  return (
    <>
      <HeaderContainer>
        <div className="container">
          <Link
            to={`/${typeName}`}
            className="logo"
            onClick={() => setSearchBarTerms('')}
          >
            <img
              src={(() => {
                if (typeName === 'agua') return aguaLogo;
                if (typeName === 'grama') return gramaLogo;
                if (typeName === 'eletrico') return eletricoLogo;
                return fogoLogo;
              })()}
              alt="Poké Store"
            />
          </Link>

          <SearchBar typeName={typeName} />

          <Link
            className="my-orders"
            to={`/${typeName}/orders`}
            onMouseEnter={() => setShowOrdersTipTool(true)}
            onMouseLeave={() => setShowOrdersTipTool(false)}
          >
            {typeName === 'fogo' && <RedShopBagSVG />}
            {typeName === 'agua' && <BlueShopBagSVG />}
            {typeName === 'grama' && <GreenShopBagSVG />}
            {typeName === 'eletrico' && <YellowShopBagSVG />}
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
