import React, { useCallback, useEffect, useState, useContext } from 'react';
import { HiPlus } from 'react-icons/hi';
import { FiMinus, FiShoppingCart } from 'react-icons/fi';
import CardContainer from './styles';
import api from '../../services/api';
import { AppContext } from '../../AppProvider';
import DefaultPokemonImg from '../../assets/default_pokemon.png';

interface PokemonApiData {
  id: number;
  base_experience: number;
  name: string;
  sprites: {
    front_default: string | null;
    other: {
      dream_world: {
        front_default: string | null;
      };
      'official-artwork': {
        front_default: string | null;
      };
    };
  };
}

interface PokemonData extends PokemonApiData {
  price: number;
  quantity: number;
  img_url: string;
}

interface PokerCardProps {
  url: string;
  typeId: number;
}

const PokeCard: React.FC<PokerCardProps> = ({ url, typeId }) => {
  const {
    appContext,
    setAppContext,
    getStoredContext,
    setToastMessage,
  } = useContext(AppContext);
  const [cardData, setCardData] = useState<PokemonData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get<PokemonApiData>(url);

        const { sprites } = response.data;

        let img_url = '';
        if (sprites.front_default) img_url = sprites.front_default;
        else if (sprites.other['official-artwork'].front_default)
          img_url = sprites.other['official-artwork'].front_default;
        else if (sprites.other.dream_world.front_default)
          img_url = sprites.other.dream_world.front_default;
        else img_url = DefaultPokemonImg;

        const newCardData = {
          quantity: 1,
          price: response.data.base_experience,
          ...response.data,
          name: response.data.name.trim(),
          img_url,
        };

        // uppercase first letter
        newCardData.name =
          newCardData.name.charAt(0).toUpperCase() + newCardData.name.slice(1);
        setCardData(newCardData);
      } catch (error) {
        setToastMessage('Não foi possível buscar os dados da API!');
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const handlePlusClick = useCallback(() => {
    if (!cardData) return;

    let quantity = cardData.quantity + 1;
    if (quantity > 99) {
      quantity = 99;
    } else if (quantity < 1) {
      quantity = 1;
    }

    if (Number.isNaN(quantity)) {
      quantity = 1;
    }

    setCardData({
      ...cardData,
      quantity,
      price: cardData.base_experience * quantity,
    });
  }, [cardData]);

  const handleMinusClick = useCallback(() => {
    if (!cardData) return;

    let quantity = cardData.quantity - 1;
    if (quantity < 1) {
      quantity = 1;
    } else if (quantity > 99) {
      quantity = 99;
    }

    if (Number.isNaN(quantity)) {
      quantity = 1;
    }

    setCardData({
      ...cardData,
      quantity,
      price: cardData.base_experience * quantity,
    });
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
        imgurl: cardData.img_url,
        unitaryPrice: cardData.base_experience,
        quantity: cardData.quantity,
        totalPrice: cardData.quantity * cardData.base_experience,
      });
    }

    const storedContext = getStoredContext();

    setAppContext({
      ...storedContext,
      [typeId]: {
        ...storedContext[typeId],
        cart: newCart,
      },
    });

    setCardData({
      ...cardData,
      quantity: 1,
      price: cardData.base_experience,
    });
  }, [appContext, cardData, setAppContext, typeId, getStoredContext]);

  const handleQuantityChange = useCallback(
    (newVal: number) => {
      if (!cardData) return;

      let quantity = newVal;
      if (newVal > 99) {
        quantity = 99;
      } else if (newVal < 1) {
        quantity = 1;
      }

      if (Number.isNaN(newVal) || Number.isNaN(quantity)) {
        quantity = 1;
      }

      setCardData({
        ...cardData,
        quantity,
        price: cardData.base_experience * quantity,
      });
    },

    [cardData],
  );

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
          <img src={cardData.img_url} alt={cardData.name} />
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
          <form
            action="/"
            onSubmit={e => {
              e.preventDefault();
              handleAddToCart();
            }}
          >
            <input
              type="number"
              min={1}
              max={99}
              step={1}
              value={cardData.quantity}
              onChange={e => handleQuantityChange(parseInt(e.target.value, 10))}
            />
          </form>
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
