import React, { useCallback, useContext } from 'react';
import { HiPlus } from 'react-icons/hi';
import { FiMinus } from 'react-icons/fi';
import { IoMdCloseCircle } from 'react-icons/io';
import CartItemContainer from './styles';
import { AppContext } from '../../AppProvider';

export interface CartItemType {
  id: number;
  name: string;
  quantity: number;
  unitaryPrice: number;
  totalPrice: number;
  imgurl: string;
}

interface CartItemProps {
  data: CartItemType;
  typeId: number;
}

const CartItem: React.FC<CartItemProps> = ({
  data: { id, name, quantity, totalPrice, imgurl },
  typeId,
}) => {
  const { appContext, setAppContext } = useContext(AppContext);

  const handlePlusClick = useCallback(() => {
    let newQuantity = quantity + 1;

    if (newQuantity > 999) {
      newQuantity = 999;
    } else if (newQuantity < 1) {
      newQuantity = 1;
    }

    if (Number.isNaN(newQuantity)) {
      newQuantity = 1;
    }

    const cart = appContext[typeId].cart.slice(0);
    const itemIndex = cart.findIndex(cartItem => cartItem.id === id);

    cart[itemIndex] = {
      ...cart[itemIndex],
      quantity: newQuantity,
      totalPrice: newQuantity * cart[itemIndex].unitaryPrice,
    };

    setAppContext({
      ...appContext,
      [typeId]: {
        ...appContext[typeId],
        cart,
      },
    });
  }, [appContext, id, setAppContext, quantity, typeId]);

  const handleMinusClick = useCallback(() => {
    let newQuantity = quantity - 1;

    if (newQuantity > 999) {
      newQuantity = 999;
    } else if (newQuantity < 1) {
      newQuantity = 1;
    }

    if (Number.isNaN(newQuantity)) {
      newQuantity = 1;
    }

    const cart = appContext[typeId].cart.slice(0);
    const itemIndex = cart.findIndex(cartItem => cartItem.id === id);

    cart[itemIndex] = {
      ...cart[itemIndex],
      quantity: newQuantity,
      totalPrice: newQuantity * cart[itemIndex].unitaryPrice,
    };

    setAppContext({
      ...appContext,
      [typeId]: {
        ...appContext[typeId],
        cart,
      },
    });
  }, [appContext, id, setAppContext, quantity, typeId]);

  const handleQuantityChange = useCallback(
    (newVal: number) => {
      let newQuantity = newVal;

      if (newQuantity > 999) {
        newQuantity = 999;
      } else if (newQuantity < 1) {
        newQuantity = 1;
      }

      if (Number.isNaN(newVal) || Number.isNaN(newQuantity)) {
        newQuantity = 1;
      }

      const cart = appContext[typeId].cart.slice(0);
      const itemIndex = cart.findIndex(cartItem => cartItem.id === id);

      cart[itemIndex] = {
        ...cart[itemIndex],
        quantity: newQuantity,
        totalPrice: newQuantity * cart[itemIndex].unitaryPrice,
      };

      setAppContext({
        ...appContext,
        [typeId]: {
          ...appContext[typeId],
          cart,
        },
      });
    },
    [appContext, id, setAppContext, typeId],
  );

  const handleRemoveItem = useCallback(() => {
    const cart = appContext[typeId].cart.filter(cartItem => cartItem.id !== id);
    setAppContext({
      ...appContext,
      [typeId]: {
        ...appContext[typeId],
        cart,
      },
    });
  }, [appContext, id, setAppContext, typeId]);

  return (
    <CartItemContainer>
      <div className="cart-container">
        <img src={imgurl} alt={name} />
        <div className="data-container">
          <div className="name-container">{name}</div>
          <div className="price-container">
            Preço: <span>R$ {totalPrice}</span>
          </div>
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
            }}
          >
            <input
              type="number"
              min={1}
              max={999}
              step={1}
              value={quantity}
              onChange={e => handleQuantityChange(parseInt(e.target.value, 10))}
            />
          </form>
          <button type="button" onClick={handlePlusClick}>
            <HiPlus color="red" />
          </button>
        </div>
        <button type="button" onClick={handleRemoveItem}>
          <IoMdCloseCircle />
          Remover
        </button>
      </div>
    </CartItemContainer>
  );
};

export default CartItem;
