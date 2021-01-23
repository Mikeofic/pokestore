import React, { useEffect, useState, useContext } from 'react';
import PokeCard from '../../components/PokeCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageContainer, { PokemonSection, CarrinhoSection } from './styles';
import api from '../../services/api';
import { AppContext } from '../../AppProvider';
import CartItem from '../../components/CartItem';

export interface PokemonType {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
}

export interface CartItemType {
  id: number;
  name: string;
  quantity: number;
  unitaryPrice: number;
  totalPrice: number;
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
  const { appContext, setAppContext } = useContext(AppContext);
  const [pageData, setPageData] = useState<PageDataType | null>(null);

  useEffect(() => {
    document.title = pageTitle;

    async function fetchData() {
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
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeId]); // só é necessário atualizar quando o typeId mudar

  return (
    <>
      <Header />
      <PageContainer>
        <PokemonSection>
          {pageData &&
            appContext[typeId].pokemon.map(
              (pokemon, index) =>
                pageData.offset + pageData.quantity > index + 1 && (
                  <PokeCard
                    key={pokemon.pokemon.url}
                    url={pokemon.pokemon.url}
                    typeId={typeId}
                  />
                ),
            )}
        </PokemonSection>
        <CarrinhoSection>
          {appContext[typeId].cart.length > 0 ? (
            appContext[typeId].cart.map(itemData => (
              <CartItem key={itemData.id} data={itemData} typeId={typeId} />
            ))
          ) : (
            <div>Carrinho Vazio</div>
          )}
        </CarrinhoSection>
      </PageContainer>
      <Footer />
    </>
  );
};

export default Page;
