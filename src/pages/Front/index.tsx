import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';
import { IoMdArrowRoundBack } from 'react-icons/io';
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
import { AppContext } from '../../AppProvider';
import { typeIds, TypeNames, PokemonType } from '../../services/interfaces';
import CartItem from '../../components/CartItem';
import Modal from '../../components/Modal';
import { ReactComponent as PokeballSVG } from '../../assets/pokeball.svg';
import { ReactComponent as MoneySVG } from '../../assets/money.svg';
import charmanderUrl from '../../assets/charmander.png';
import SearchBar from '../../components/SearchBar';

interface TypeData {
  pokemon: PokemonType[];
}

const Page: React.FC<TypeNames> = ({ typeName }) => {
  const searchTimeout = useRef<number | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [typeId] = useState(typeIds[typeName]);
  const location = useLocation();
  const history = useHistory();
  const {
    appContext,
    setAppContext,
    getStoredContext,
    searchTerms,
    setToastMessage,
  } = useContext(AppContext);
  const [pokemonToShow, setPokemonToShow] = useState(0);
  const [searchedPokemon, setSearchedPokemon] = useState<PokemonType[]>([]);
  const [currentCheckout, setCurretCheckout] = useState({
    totalQuantity: 0,
    totalPrice: 0,
    cashback: 0,
  });

  const runPokemonSeach = useCallback(
    (pokemon: PokemonType[]) => {
      if (!searchTerms.trim()) {
        setSearchedPokemon(pokemon);
        setPokemonToShow(pokemon.length >= 30 ? 30 : pokemon.length);
      } else {
        const newSearchedPokemon = pokemon.filter(poke =>
          poke.pokemon.name
            .toLowerCase()
            .includes(searchTerms.trim().toLowerCase()),
        );
        setSearchedPokemon(newSearchedPokemon);
        setPokemonToShow(
          newSearchedPokemon.length >= 30 ? 30 : newSearchedPokemon.length,
        );
      }
      setShowLoading(false);
      setHasLoaded(true);
    },
    [searchTerms],
  );

  useEffect(() => {
    document.title = 'Poké Store Fogo - Temos que pegar!';

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

        if (searchTimeout.current !== null) {
          clearTimeout(searchTimeout.current);
        }

        if (!searchTerms.trim()) {
          setSearchedPokemon(pokemon);
          setPokemonToShow(pokemon.length >= 30 ? 30 : pokemon.length);
          setShowLoading(false);
          setHasLoaded(true);
        } else {
          runPokemonSeach(pokemon);
        }
      } catch (error) {
        setToastMessage('Não foi possível buscar os dados da API!');
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeId]);

  useEffect(() => {
    if (searchTimeout.current !== null) {
      clearTimeout(searchTimeout.current);
    }
    setPokemonToShow(0);
    setShowLoading(true);

    searchTimeout.current = setTimeout(() => {
      runPokemonSeach(appContext[typeId].pokemon);
    }, 800);

    return () => {
      if (searchTimeout.current !== null) {
        clearTimeout(searchTimeout.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerms]);

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
    const psQuery = new URLSearchParams(location.search).get('ps');
    if (psQuery !== null) {
      // const searchQuery = psQuery.trim().toLowerCase();
      // TODO
    }
  }, [location.search]);

  useEffect(() => {
    if (location.hash.includes('cart')) {
      document.body.classList.add('no-scroll-on-mobile');
    } else {
      document.body.classList.remove('no-scroll-on-mobile');
    }
  }, [location.hash]);

  // voltar com o scroll normal sempre que sair da Front Page
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('no-scroll-on-mobile');
    };
  }, []);

  return (
    <>
      <Header typeName={typeName} />
      <PageContainer>
        <PokemonSection>
          <SearchBar typeName={typeName} />
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
          {showLoading && <div className="loader loader-pokeball" />}
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
