import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';
import { IoMdArrowRoundBack, IoIosArrowDown } from 'react-icons/io';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { CgChevronDoubleDown } from 'react-icons/cg';
import PokeCard from '../../components/PokeCard';
import Header from '../../components/Header';
import PageContainer, {
  PokemonSection,
  CartSection,
  CheckoutContainer,
  ModalContainer,
} from './styles';
import api from '../../services/api';
import { AppContext, typeIds } from '../../AppProvider';
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

const Page: React.FC = () => {
  const [typeId] = useState(typeIds.fogo);
  const location = useLocation();
  const history = useHistory();
  const { appContext, setAppContext, getStoredContext } = useContext(
    AppContext,
  );
  const [pokemonToShow, setPokemonToShow] = useState(0);
  const [currentCheckout, setCurretCheckout] = useState({
    totalQuantity: 0,
    totalPrice: 0,
    cashback: 0,
  });

  useEffect(() => {
    document.title = 'Poke Store Fogo - Temos que pegar!';

    async function fetchData() {
      try {
        const typeResponse = await api.get<TypeData>(`type/${typeId}`);
        const { pokemon } = typeResponse.data;

        const storedContext = getStoredContext();

        setAppContext({
          ...storedContext,
          [typeId]: {
            ...storedContext[typeId],
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
    history.push(location.pathname);
  }, [history, location.pathname]);

  const checkoutCart = useCallback(
    (totalQuantity, totalPrice, cashback) => {
      const { cart } = appContext[typeId];
      if (!cart.length) return;

      const timestamp = Date.now();

      const storedContext = getStoredContext();

      const newMyOrders = storedContext[typeId].myOrders.slice(0);
      newMyOrders.unshift({
        id: `${timestamp}.${totalQuantity}.${totalPrice}.${cashback}.${newMyOrders.length}`,
        timestamp,
        quantity: totalQuantity,
        totalPrice,
        cashback,
        order: cart,
      });

      setAppContext({
        ...storedContext,
        [typeId]: {
          ...storedContext[typeId],
          myOrders: newMyOrders,
          cart: [],
        },
      });
    },
    [appContext, typeId, setAppContext, getStoredContext],
  );

  const handleCheckoutClick = useCallback(() => {
    const totalQuantity = appContext[typeId].cart.reduce(
      (total, cartItem) => cartItem.quantity + total,
      0,
    );
    const totalPrice = appContext[typeId].cart.reduce(
      (total, cartItem) => cartItem.totalPrice + total,
      0,
    );
    const cashback = Math.ceil(totalPrice * 0.05);
    setCurretCheckout({
      totalQuantity,
      totalPrice,
      cashback,
    });

    setTimeout(() => {
      checkoutCart(totalQuantity, totalPrice, cashback);
    }, 100);
  }, [appContext, typeId, checkoutCart]);

  const handleLoadMore = useCallback(() => {
    const pokemonLength = appContext[typeId].pokemon.length;
    if (pokemonLength <= pokemonToShow) return;

    const newLimit = pokemonToShow + 30;
    setPokemonToShow(
      newLimit > pokemonLength
        ? newLimit - (newLimit - pokemonLength)
        : newLimit,
    );
  }, [appContext, pokemonToShow, typeId]);

  return (
    <>
      <Header typeId={typeId} />
      <PageContainer>
        <PokemonSection>
          <div>
            {appContext[typeId].pokemon.map(
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
          {pokemonToShow > 0 &&
            appContext[typeId].pokemon.length > pokemonToShow && (
              <p>
                <button type="button" onClick={handleLoadMore}>
                  Ver mais <CgChevronDoubleDown />
                </button>
              </p>
            )}
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
                      <Link to="#checkout" onClick={handleCheckoutClick}>
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
        afterClosing={() => {
          setCurretCheckout({
            cashback: 0,
            totalPrice: 0,
            totalQuantity: 0,
          });
        }}
      >
        {currentCheckout.totalQuantity > 0 ? (
          <ModalContainer>
            <img src={charmanderUrl} alt="Pokemon" />
            <h2>Obrigado! 😍</h2>
            <div>
              <PokeballSVG /> Você comprou{' '}
              <span> {currentCheckout.totalQuantity} pokémon </span> pelo valor
              de <span>R$ {currentCheckout.totalPrice}.</span>
            </div>
            <div>
              <MoneySVG /> Você ganhou de volta{' '}
              <span>R$ {currentCheckout.cashback}.</span>
            </div>
            <div className="btn-container">
              <button type="button" onClick={handleCloseModal}>
                <IoMdArrowRoundBack /> Voltar às compras
              </button>
            </div>
          </ModalContainer>
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
