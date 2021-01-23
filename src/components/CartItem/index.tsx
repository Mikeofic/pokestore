import React, { useCallback, useContext } from 'react';
import { HiPlus } from 'react-icons/hi';
import { FiMinus } from 'react-icons/fi';
import { CartItemType } from '../../pages/Page';
import CartItemContainer from './styles';
import { AppContext } from '../../AppProvider';

interface CartItemProps {
  data: CartItemType;
  typeId: 10 | 11 | 12 | 13; // 10 = fogo, 11 = água, 12 = grama, 13 = elétrico
}

const CartItem: React.FC<CartItemProps> = ({
  data: { id, name, quantity, totalPrice },
  typeId,
}) => {
  const { appContext, setAppContext } = useContext(AppContext);

  const handlePlusClick = useCallback(() => {
    if (quantity < 99) {
      const newQuantity = quantity + 1;
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
    }
  }, [appContext, id, setAppContext, quantity, typeId]);

  const handleMinusClick = useCallback(() => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
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
    }
  }, [appContext, id, setAppContext, quantity, typeId]);

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
      <div>
        <div>
          <span>{quantity}x</span>
          <span>{name}</span>
        </div>
        <div>R$ {totalPrice}</div>
      </div>
      <div>
        <div>
          <button type="button" onClick={handleMinusClick}>
            <FiMinus color="red" />
          </button>
          <span>{quantity}</span>
          <button type="button" onClick={handlePlusClick}>
            <HiPlus color="red" />
          </button>
        </div>
        <button type="button" onClick={handleRemoveItem}>
          Remover
        </button>
      </div>
    </CartItemContainer>
  );
};

export default CartItem;
