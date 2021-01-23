import React, { useCallback, useEffect, useState, useContext } from 'react';
import { HiPlus } from 'react-icons/hi';
import { FiMinus, FiShoppingCart } from 'react-icons/fi';
import CardContainer from './styles';
import api from '../../services/api';
import { AppContext } from '../../AppProvider';

interface PokemonApiData {
  id: number;
  base_experience: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

interface PokemonData extends PokemonApiData {
  price: number;
  quantity: number;
}

interface PokerCardProps {
  url: string;
  typeId: 10 | 11 | 12 | 13; // 10 = fogo, 11 = água, 12 = grama, 13 = elétrico
}

const PokeCard: React.FC<PokerCardProps> = ({ url, typeId }) => {
  const { appContext, setAppContext } = useContext(AppContext);
  const [cardData, setCardData] = useState<PokemonData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get<PokemonApiData>(url);
      const newCardData = {
        quantity: 1,
        price: response.data.base_experience,
        ...response.data,
        name: response.data.name.trim(),
      };

      // uppercase first letter
      newCardData.name =
        newCardData.name.charAt(0).toUpperCase() + newCardData.name.slice(1);
      setCardData(newCardData);
    }
    fetchData();
  }, [url]);

  const handlePlusClick = useCallback(() => {
    if (cardData && cardData.quantity < 99) {
      const quantity = cardData.quantity + 1;

      setCardData({
        ...cardData,
        quantity,
        price: cardData.base_experience * quantity,
      });
    }
  }, [cardData]);

  const handleMinusClick = useCallback(() => {
    if (cardData && cardData.quantity > 1) {
      const quantity = cardData.quantity - 1;

      setCardData({
        ...cardData,
        quantity,
        price: cardData.base_experience * quantity,
      });
    }
  }, [cardData]);

  const handleAddToCart = useCallback(() => {
    if (!cardData) return;

    const newCart = appContext[typeId].cart.slice(0); // copying cart array
    const cartIndex = newCart.findIndex(pokemon => pokemon.id === cardData.id);

    if (cartIndex >= 0) {
      newCart[cartIndex] = {
        ...newCart[cartIndex],
        unitaryPrice: cardData.base_experience,
        quantity: cardData.quantity + newCart[cartIndex].quantity,
      };
      newCart[cartIndex].totalPrice =
        newCart[cartIndex].quantity * newCart[cartIndex].unitaryPrice;
    } else {
      newCart.push({
        id: cardData.id,
        name: cardData.name,
        imgurl: cardData.sprites.front_default,
        unitaryPrice: cardData.base_experience,
        quantity: cardData.quantity,
        totalPrice: cardData.quantity * cardData.base_experience,
      });
    }

    setAppContext({
      ...appContext,
      [typeId]: {
        ...appContext[typeId],
        cart: newCart,
      },
    });

    setCardData({
      ...cardData,
      quantity: 1,
      price: cardData.base_experience,
    });
  }, [appContext, cardData, setAppContext, typeId]);

  if (!cardData) {
    return (
      <CardContainer>
        <div className="card-container">
          <div className="img-container gradient" />
          <div className="name-container gradient">Transparent</div>
          <div className="price-container gradient">Transparent</div>
        </div>
        <div className="buy-container">
          <div className="quantity-container gradient" />
          <button type="button" className="gradient" disabled>
            <FiShoppingCart />
            Adicionar
          </button>
        </div>
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      <div className="card-container">
        <div className="img-container">
          <img src={cardData.sprites.front_default} alt={cardData.name} />
        </div>
        <div className="name-container">{cardData.name}</div>
        <div className="price-container">
          R$ <span>{cardData.price}</span>
        </div>
      </div>
      <div className="buy-container">
        <div className="quantity-container">
          <button type="button" onClick={handleMinusClick}>
            <FiMinus color="red" />
          </button>
          <span>{cardData.quantity}</span>
          <button type="button" onClick={handlePlusClick}>
            <HiPlus color="red" />
          </button>
        </div>
        <button type="button" onClick={handleAddToCart}>
          <FiShoppingCart />
          Adicionar
        </button>
      </div>
    </CardContainer>
  );
};

export default PokeCard;
