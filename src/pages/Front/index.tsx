import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
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
import { useAppContext } from '../../AppProvider';
import { typeIds, TypeNames, PokemonType } from '../../services/interfaces';
import CartItem from '../../components/CartItem';
import Modal from '../../components/Modal';
import { ReactComponent as PokeballSVG } from '../../assets/pokeball.svg';
import { ReactComponent as MoneySVG } from '../../assets/money.svg';
import charmanderUrl from '../../assets/charmander.png';
import pikachuUrl from '../../assets/pikachu.png';
import bulbasaurUrl from '../../assets/bulbasaur.png';
import squirtleUrl from '../../assets/squirtle.png';
import SearchBar from '../../components/SearchBar';

const Front: React.FC<TypeNames> = ({ typeName }) => {
  const location = useLocation();
  const history = useHistory();

  const {
    appContext,
    setAppContext,
    getStoredContext,
    searchBarTerms,
    fetchPokemonTypeData,
  } = useAppContext();

  const searchTimeout = useRef<number | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [typeId, setTypeId] = useState(() => {
    Object.keys(typeIds).forEach(key =>
      document.documentElement.classList.remove(key),
    );
    document.documentElement.classList.add(typeName);
    return typeIds[typeName].id;
  });
  const [pokemonToShow, setPokemonToShow] = useState(0);
  const [searchedPokemon, setSearchedPokemon] = useState<PokemonType[]>([]);
  const [currentCheckout, setCurretCheckout] = useState({
    totalQuantity: 0,
    totalPrice: 0,
    cashback: 0,
  });

  useEffect(() => {
    setCurretCheckout({
      cashback: 0,
      totalPrice: 0,
      totalQuantity: 0,
    });
    setSearchedPokemon([]);
    setPokemonToShow(0);
    setShowLoading(false);
    setHasLoaded(false);
    if (searchTimeout.current !== null) {
      clearTimeout(searchTimeout.current);
    }

    (async () => {
      const pokemondata = await fetchPokemonTypeData(typeId);
      runPokemonSearch(pokemondata);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeId]);

  useEffect(() => {
    Object.keys(typeIds).forEach(key =>
      document.documentElement.classList.remove(key),
    );
    document.documentElement.classList.add(typeName);
    document.title = typeIds[typeName].title;

    setTypeId(typeIds[typeName].id);
  }, [typeName]);

  const runPokemonSearch = useCallback(
    (allPokemon: PokemonType[] | null = null, pushHistory = false) => {
      if (searchTimeout.current !== null) {
        clearTimeout(searchTimeout.current);
      }

      const storedPokemon =
        allPokemon !== null ? allPokemon : appContext[typeId].pokemon;

      const query = new URLSearchParams(location.search).get('ps');
      const searchedTerms = query ? query.trim().toLowerCase() : '';

      if (!searchedTerms.trim()) {
        setSearchedPokemon(storedPokemon);
        setPokemonToShow(
          storedPokemon.length >= 30 ? 30 : storedPokemon.length,
        );
      } else {
        const newSearchedPokemon = storedPokemon.filter(pokemon =>
          pokemon.pokemon.name.toLowerCase().includes(searchedTerms),
        );
        setSearchedPokemon(newSearchedPokemon);
        setPokemonToShow(
          newSearchedPokemon.length >= 30 ? 30 : newSearchedPokemon.length,
        );
      }
      setShowLoading(false);
      setHasLoaded(true);
      if (pushHistory) {
        if (searchBarTerms.trim()) {
          history.push(`/${typeName}/?ps=${searchBarTerms.trim()}`);
        } else {
          history.push(`/${typeName}`);
        }
      }
    },
    [appContext, location.search, typeId, history, searchBarTerms, typeName],
  );

  useEffect(() => {
    if (searchTimeout.current !== null) {
      clearTimeout(searchTimeout.current);
    }
    setPokemonToShow(0);
    setShowLoading(true);

    searchTimeout.current = setTimeout(() => {
      runPokemonSearch(null, true);
    }, 800);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchBarTerms]);

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

      const newAppContext = {
        ...storedContext,
        [typeId]: {
          ...storedContext[typeId],
          myOrders: newMyOrders,
          cart: [],
        },
      };
      setAppContext(newAppContext);
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
    const pokemonLength = searchedPokemon.length;
    if (pokemonLength <= pokemonToShow) return;

    const newLimit = pokemonToShow + 30;
    setPokemonToShow(
      newLimit > pokemonLength
        ? newLimit - (newLimit - pokemonLength)
        : newLimit,
    );
  }, [pokemonToShow, searchedPokemon.length]);

  useEffect(() => {
    runPokemonSearch(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    if (location.hash.includes('cart')) {
      document.body.classList.add('no-scroll-on-mobile');
    } else {
      document.body.classList.remove('no-scroll-on-mobile');
    }
  }, [location.hash]);

  /**
   * Run when component will unmount
   */
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('no-scroll-on-mobile');

      if (searchTimeout.current !== null) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  return (
    <>
      <Header typeName={typeName} />
      <PageContainer
        className={
          typeName === 'agua' || typeName === 'eletrico' ? 'cart-on-left' : ''
        }
      >
        <PokemonSection
          className={
            typeName === 'agua' || typeName === 'eletrico' ? 'cart-on-left' : ''
          }
        >
          <SearchBar typeName={typeName} />
          {(() => {
            const query = new URLSearchParams(location.search).get('ps');
            const browserQuery = query ? query.trim().toLowerCase() : '';

            if (pokemonToShow > 0 && !!browserQuery) {
              return (
                <div className="search">
                  <p>
                    Resultados para{' '}
                    <span>
                      {browserQuery === searchBarTerms.trim().toLowerCase()
                        ? searchBarTerms.trim()
                        : browserQuery}
                    </span>
                  </p>
                </div>
              );
            }
            return false;
          })()}
          <div>
            {searchedPokemon.map(
              (pokemon, index) =>
                pokemonToShow > index && (
                  <PokeCard
                    key={pokemon.pokemon.url}
                    url={pokemon.pokemon.url}
                    typeName={typeName}
                  />
                ),
            )}
          </div>
          {pokemonToShow > 0 && searchedPokemon.length > pokemonToShow && (
            <p>
              <button type="button" onClick={handleLoadMore}>
                Ver mais <CgChevronDoubleDown />
              </button>
            </p>
          )}
          {((appContext[typeId].pokemon.length === 0 && !showLoading) ||
            showLoading) && <div className="loader loader-pokeball" />}
          {appContext[typeId].pokemon.length > 0 &&
            hasLoaded &&
            searchedPokemon.length === 0 &&
            !showLoading && (
              <span className="not-found">
                <span>Nenhum pokémon encontrado!</span>
              </span>
            )}
        </PokemonSection>
        <CartSection
          className={location.hash.includes('#cart') ? 'show-on-mobile' : ''}
        >
          <div>
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
                <CartItem
                  key={itemData.id}
                  data={itemData}
                  typeName={typeName}
                />
              ))}
          </div>
        </CartSection>
        <Link
          className="cart-container"
          to={location.hash.includes('#cart') ? location.pathname : '#cart'}
        >
          <BiCart />
          {appContext[typeId].cart.length > 0 && (
            <div>
              {appContext[typeId].cart.length > 9
                ? '9+'
                : appContext[typeId].cart.length}
            </div>
          )}
        </Link>
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
            <img
              src={(() => {
                if (typeName === 'agua') return squirtleUrl;
                if (typeName === 'grama') return bulbasaurUrl;
                if (typeName === 'eletrico') return pikachuUrl;
                return charmanderUrl;
              })()}
              alt="Pokemon"
            />
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
              <button
                type="button"
                onClick={() => {
                  history.push(`/${typeName}`);
                }}
              >
                <IoMdArrowRoundBack /> Voltar às compras
              </button>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="icon-on-right gray-style"
                onClick={() => {
                  history.push(`/${typeName}/orders`);
                }}
              >
                Ver compras realizadas <IoMdArrowRoundForward />
              </button>
            </div>
          </ModalContainer>
        ) : (
          <ModalContainer>
            <img src={charmanderUrl} alt="Pokemon" />
            <h2>O seu Carrinho está vazio</h2>
            <div className="btn-container">
              <button
                type="button"
                onClick={() => {
                  history.push(`/${typeName}`);
                }}
              >
                <IoMdArrowRoundBack /> Voltar às compras
              </button>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="icon-on-right gray-style"
                onClick={() => {
                  history.push(`/${typeName}/orders`);
                }}
              >
                Ver compras realizadas <IoMdArrowRoundForward />
              </button>
            </div>
          </ModalContainer>
        )}
      </Modal>
    </>
  );
};

export default Front;
