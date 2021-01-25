import React, { useCallback, useState, useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppContext } from '../../AppProvider';
import { ReactComponent as PokeLupa } from '../../assets/pokelupa.svg';
import TipTool from '../TipTool';
import HeaderContainer, { NavContainer, SearchForm } from './style';
import FogoLogo from '../../assets/header_fogo.png';
import { ReactComponent as AguaSVG } from '../../assets/water.svg';
import { ReactComponent as GramaSVG } from '../../assets/grass.svg';
import { ReactComponent as EletricoSVG } from '../../assets/electric.svg';
import { ReactComponent as FogoSVG } from '../../assets/fire.svg';
import { ReactComponent as ShopBagSVG } from '../../assets/bagred.svg';

interface HeaderProps {
  typeId: number;
}

const Header: React.FC<HeaderProps> = ({ typeId }) => {
  const location = useLocation();
  const history = useHistory();
  const { appContext, searchTerms, setSearchTerms } = useContext(AppContext);
  const [showOrdersTipTool, setShowOrdersTipTool] = useState(false);

  const handleSubmit = useCallback(() => {
    if (location.pathname !== '/fogo') {
      history.push('/fogo');
    }
  }, [history, location.pathname]);

  const handleSearchChange = useCallback(
    (newTerms: string) => {
      setSearchTerms(newTerms.slice(0, 100));
    },
    [setSearchTerms],
  );

  return (
    <>
      <HeaderContainer>
        <div className="container">
          <Link to="/fogo" className="logo" onClick={() => setSearchTerms('')}>
            <img src={FogoLogo} alt="Poke Store" />
          </Link>

          <SearchForm
            action=""
            onSubmit={e => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              type=""
              maxLength={100}
              name="search"
              placeholder="Qual pokémon você procura?"
              value={searchTerms}
              onChange={e => handleSearchChange(e.target.value)}
            />
            <button type="submit">
              <PokeLupa />
            </button>
          </SearchForm>

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
          {!(
            location.pathname === '/' ||
            location.pathname === '/fogo' ||
            location.pathname.startsWith('/fogo/')
          ) && (
            <Link to="/fogo" className="fogo">
              <FogoSVG />
              <span>Loja Fogo</span>
            </Link>
          )}
          {!(
            location.pathname === '/agua' ||
            location.pathname.startsWith('/agua/')
          ) && (
            <Link to="/agua" className="agua">
              <AguaSVG />
              <span>Loja Água</span>
            </Link>
          )}
          {!(
            location.pathname === '/grama' ||
            location.pathname.startsWith('/grama/')
          ) && (
            <Link to="/grama" className="grama">
              <GramaSVG />
              <span>Loja Grama</span>
            </Link>
          )}
          {!(
            location.pathname === '/eletrico' ||
            location.pathname.startsWith('/eletrico/')
          ) && (
            <Link to="/eletrico" className="eletrico">
              <EletricoSVG />
              <span>Loja Elétrico</span>
            </Link>
          )}
        </div>
      </NavContainer>
    </>
  );
};

export default Header;
