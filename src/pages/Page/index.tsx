import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';
import { FaAngleDoubleRight } from 'react-icons/fa';
import PokeCard from '../../components/PokeCard';
import Header from '../../components/Header';
import PageContainer, {
  PokemonSection,
  CartSection,
  CheckoutContainer,
} from './styles';
import api from '../../services/api';
import { AppContext } from '../../AppProvider';
import CartItem from '../../components/CartItem';
import Modal from '../../components/Modal';

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

interface PageDataType {
  offset: number;
  quantity: number;
}

const Page: React.FC<PageProps> = ({ typeId, pageTitle }) => {
  const location = useLocation();
  const { appContext, setAppContext } = useContext(AppContext);
  const [pageData, setPageData] = useState<PageDataType | null>(null);
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

        setPageData({
          offset: 0,
          quantity: 28,
        });
      } catch (error) {
        // TODO: show connection error
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeId]); // só é necessário atualizar quando o typeId mudar

  return (
    <>
      <Header />
      <PageContainer>
        <PokemonSection>
          <div>
            {pageData &&
              appContext[typeId].pokemon.map(
                (pokemon, index) =>
                  appContext[typeId].pokemon.length > index + 1 && (
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
              <>
                <h3>Resumo do pedido:</h3>
                <div className="checkout-container">
                  <div className="checkout-data">
                    <div className="quantity">
                      Qtd:{' '}
                      <span>
                        {appContext[typeId].cart.reduce(
                          (total, cartItem) => cartItem.quantity + total,
                          0,
                        )}{' '}
                        pokémon
                      </span>
                    </div>
                    <div className="price">
                      Total:{' '}
                      <span>
                        R${' '}
                        {appContext[typeId].cart.reduce(
                          (total, cartItem) => cartItem.totalPrice + total,
                          0,
                        )}
                      </span>
                    </div>
                  </div>
                  <Link to="#checkout">
                    Finalizar <FaAngleDoubleRight />
                  </Link>
                </div>
              </>
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
      >
        <div>Teste</div>
      </Modal>
    </>
  );
};

export default Page;
