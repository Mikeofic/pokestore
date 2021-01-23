import React, { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosCart } from 'react-icons/io';
import { ReactComponent as PokeLupa } from '../../assets/pokelupa.svg';
import HeaderContainer, {
  NavContainer,
  SearchForm,
  CartContainer,
} from './style';
import FogoLogo from '../../assets/header_fogo.png';
import Poke01 from '../../assets/01.png';
import Poke02 from '../../assets/02.png';
import Poke03 from '../../assets/03.png';
import { ReactComponent as AguaSVG } from '../../assets/water.svg';
import { ReactComponent as GramaSVG } from '../../assets/grass.svg';
import { ReactComponent as EletricoSVG } from '../../assets/electric.svg';
import { ReactComponent as FogoSVG } from '../../assets/fire.svg';

const Header: React.FC = () => {
  const location = useLocation();

  const handleSubmit = useCallback(() => {
    // retrieve pokemons from api
  }, []);

  return (
    <>
      <HeaderContainer>
        <div className="container">
          <Link to={location.pathname} className="logo">
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
              name="search"
              placeholder="Qual pokémon você quer pegar?"
            />
            <button type="submit">
              <PokeLupa />
            </button>
          </SearchForm>

          <CartContainer>
            <div>
              <img src={Poke01} alt="pokemon_name_1" />
              <img src={Poke02} alt="pokemon_name_2" />
              <img src={Poke03} alt="pokemon_name_3" />
            </div>
            <IoIosCart />
            <span>14</span>
          </CartContainer>
        </div>
      </HeaderContainer>

      <NavContainer>
        <div className="container">
          <span>Outras Lojas:</span>
          {!(location.pathname === '/' || location.pathname === '/fogo') && (
            <Link to="/fogo" className="fogo">
              <FogoSVG />
              <span>Loja Fogo</span>
            </Link>
          )}
          {location.pathname !== '/agua' && (
            <Link to="/agua" className="agua">
              <AguaSVG />
              <span>Loja Água</span>
            </Link>
          )}
          {location.pathname !== '/grama' && (
            <Link to="/grama" className="grama">
              <GramaSVG />
              <span>Loja Grama</span>
            </Link>
          )}
          {location.pathname !== '/eletrico' && (
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
