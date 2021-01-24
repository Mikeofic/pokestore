import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { FaAngleDoubleRight } from 'react-icons/fa';
import PokeCard from '../../components/PokeCard';
import Header from '../../components/Header';
import PageContainer, {
  PokemonSection,
  CartSection,
  CheckoutContainer,
  ModalContainer,
} from './styles';
import api from '../../services/api';
import { AppContext } from '../../AppProvider';
import CartItem from '../../components/CartItem';
import Modal from '../../components/Modal';
import { ReactComponent as PokeballSVG } from '../../assets/pokeball.svg';
import { ReactComponent as MoneySVG } from '../../assets/money.svg';
import charmanderUrl from '../../assets/charmander.png';

export interface PokemonType {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
}

interface TypeData {
  pokemon: Array<PokemonType>;
}

interface PageProps {
  typeId: 10 | 11 | 12 | 13; // 10 = fogo, 11 = água, 12 = grama, 13 = elétrico
  pageTitle: string;
}

const Page: React.FC<PageProps> = ({ typeId, pageTitle }) => {
  const location = useLocation();
  const history = useHistory();
  const { appContext, setAppContext } = useContext(AppContext);
  const [pokemonToShow, setPokemonToShow] = useState(0);
  const [currentPathname, setCurrentPathname] = useState('');
  const [previousPathname, setPreviousPathname] = useState('');

  useEffect(() => {
    if (!currentPathname && !previousPathname) {
      setCurrentPathname(location.pathname);
    } else {
      setCurrentPathname(location.pathname);
      setPreviousPathname(currentPathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    document.title = pageTitle;

    async function fetchData() {
      try {
        const typeResponse = await api.get<TypeData>(`type/${typeId}`);
        const { pokemon } = typeResponse.data;

        setAppContext({
          ...appContext,
          [typeId]: {
            ...appContext[typeId],
            pokemon,
          },
        });

        setPokemonToShow(pokemon.length >= 30 ? 30 : pokemon.length);
      } catch (error) {
        // TODO: show connection error
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeId]); // só é necessário atualizar quando o typeId mudar

  const handleCloseModal = useCallback(() => {
    if (previousPathname === location.pathname) {
      history.goBack();
    } else {
      history.push(location.pathname);
    }
  }, [history, location.pathname, previousPathname]);

  const checkoutCart = useCallback(() => {
    // TODO
    console.log('CHECKOUT!!!');
  }, []);

  return (
    <>
      <Header />
      <PageContainer>
        <PokemonSection>
          <div>
            {pokemonToShow &&
              appContext[typeId].pokemon.map(
                (pokemon, index) =>
                  pokemonToShow > index && (
                    <PokeCard
                      key={pokemon.pokemon.url}
                      url={pokemon.pokemon.url}
                      typeId={typeId}
                    />
                  ),
              )}
          </div>
        </PokemonSection>
        <CartSection>
          <CheckoutContainer>
            {appContext[typeId].cart.length > 0 ? (
              (() => {
                const totalQuantity = appContext[typeId].cart.reduce(
                  (total, cartItem) => cartItem.quantity + total,
                  0,
                );
                const totalPrice = appContext[typeId].cart.reduce(
                  (total, cartItem) => cartItem.totalPrice + total,
                  0,
                );
                const cashback = Math.ceil(totalPrice * 0.05);

                return (
                  <>
                    <h3>Resumo do pedido:</h3>
                    <div className="checkout-container">
                      <div className="checkout-data">
                        <div className="quantity">
                          Qtd: <span>{totalQuantity} pokémon</span>
                        </div>
                        <div className="cashback">
                          Cashback:{' '}
                          <span>
                            R$ {cashback} <span>(5%)</span>
                          </span>
                        </div>
                        <div className="price">
                          Total: <span>R$ {totalPrice}</span>
                        </div>
                      </div>
                      <Link to="#checkout">
                        Finalizar <FaAngleDoubleRight />
                      </Link>
                    </div>
                  </>
                );
              })()
            ) : (
              <div className="empty-cart">
                <BiCart /> Carrinho Vazio
              </div>
            )}
          </CheckoutContainer>

          {appContext[typeId].cart.length > 0 &&
            appContext[typeId].cart.map(itemData => (
              <CartItem key={itemData.id} data={itemData} typeId={typeId} />
            ))}
        </CartSection>
      </PageContainer>
      <Modal
        showModal={location.hash.includes('#checkout')}
        previousPath={previousPathname}
        onClosing={checkoutCart}
      >
        {appContext[typeId].cart.length > 0 ? (
          (() => {
            const totalQuantity = appContext[typeId].cart.reduce(
              (total, cartItem) => cartItem.quantity + total,
              0,
            );
            const totalPrice = appContext[typeId].cart.reduce(
              (total, cartItem) => cartItem.totalPrice + total,
              0,
            );
            const cashback = Math.ceil(totalPrice * 0.05);

            return (
              <ModalContainer>
                <img src={charmanderUrl} alt="Pokemon" />
                <h2>Obrigado! 😍</h2>
                <div>
                  <PokeballSVG /> Você comprou{' '}
                  <span> {totalQuantity} pokémon </span> pelo valor de{' '}
                  <span>R$ {totalPrice}.</span>
                </div>
                <div>
                  <MoneySVG /> Você ganhou de volta <span>R$ {cashback}.</span>
                </div>
                <div className="btn-container">
                  <button type="button" onClick={handleCloseModal}>
                    <IoMdArrowRoundBack /> Voltar às compras
                  </button>
                </div>
              </ModalContainer>
            );
          })()
        ) : (
          <ModalContainer>
            <img src={charmanderUrl} alt="Pokemon" />
            <h2>O seu Carrinho está vazio</h2>
            <div className="btn-container">
              <button type="button" onClick={handleCloseModal}>
                <IoMdArrowRoundBack /> Voltar às compras
              </button>
            </div>
          </ModalContainer>
        )}
      </Modal>
    </>
  );
};

export default Page;
