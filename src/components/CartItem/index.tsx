import React, { useCallback, useEffect, useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import { FiMinus } from 'react-icons/fi';
import { IoMdCloseCircle } from 'react-icons/io';
import { v4 as uuid } from 'uuid';
import CartItemContainer from './styles';
import { useAppContext } from '../../AppProvider';
import { typeIds, TypeNames, CartItemType } from '../../services/interfaces';

interface CartItemProps extends TypeNames {
  data: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({
  data: { id, name, quantity, totalPrice, imgurl },
  typeName,
}) => {
  const {
    appContext,
    setAppContext,
    getStoredContext,
    minusOneOnCart,
    plusOneOnCart,
  } = useAppContext();

  const [typeId] = useState(typeIds[typeName].id);
  const [itemQuantity, setItemQuantity] = useState(quantity.toString());
  const [input_id] = useState(uuid());

  useEffect(() => {
    if (itemQuantity !== '') {
      setItemQuantity(quantity.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  const handlePlusClick = useCallback(() => {
    plusOneOnCart(typeId, quantity, id, (newQuantity: number) => {
      setItemQuantity(newQuantity.toString());
    });
  }, [id, plusOneOnCart, quantity, typeId]);

  const handleMinusClick = useCallback(() => {
    minusOneOnCart(typeId, quantity, id, (newQuantity: number) => {
      setItemQuantity(newQuantity.toString());
    });
  }, [id, minusOneOnCart, quantity, typeId]);

  const handleQuantityChange = useCallback(
    (newVal: string) => {
      const newIntVal = parseInt(newVal, 10);

      let newQuantity = newIntVal;

      if (newQuantity > 999) {
        newQuantity = 999;
      } else if (newQuantity < 1) {
        newQuantity = 1;
      }

      if (Number.isNaN(newIntVal) || Number.isNaN(newQuantity)) {
        newQuantity = 1;
      }

      const cart = appContext[typeId].cart.slice(0);
      const itemIndex = cart.findIndex(cartItem => cartItem.id === id);

      cart[itemIndex] = {
        ...cart[itemIndex],
        quantity: newQuantity,
        totalPrice: newQuantity * cart[itemIndex].unitaryPrice,
      };

      setItemQuantity(newVal.trim() === '' ? '' : newQuantity.toString());

      const storedContext = getStoredContext();

      const newAppContext = {
        ...storedContext,
        [typeId]: {
          ...storedContext[typeId],
          cart,
        },
      };
      setAppContext(newAppContext);
    },
    [appContext, id, setAppContext, typeId, getStoredContext],
  );

  const handleRemoveItem = useCallback(() => {
    const cart = appContext[typeId].cart.filter(cartItem => cartItem.id !== id);

    const storedContext = getStoredContext();

    const newAppContext = {
      ...storedContext,
      [typeId]: {
        ...storedContext[typeId],
        cart,
      },
    };
    setAppContext(newAppContext);
  }, [appContext, id, setAppContext, typeId, getStoredContext]);

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
          <button
            aria-label="Reduce Quantity"
            type="button"
            onClick={handleMinusClick}
          >
            <FiMinus />
          </button>
          <form
            action="/"
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <input
              type="number"
              id={`cart_quantity_${input_id}`}
              min={1}
              max={999}
              step={1}
              value={itemQuantity}
              onChange={e => handleQuantityChange(e.target.value)}
              onBlur={() => {
                if (!itemQuantity.trim()) {
                  setItemQuantity('1');
                }
              }}
            />
            <label htmlFor={`cart_quantity_${input_id}`}>Quantidade</label>
          </form>
          <button
            aria-label="Increase Quantity"
            type="button"
            onClick={handlePlusClick}
          >
            <HiPlus />
          </button>
        </div>
        <button
          aria-label="Remove Item"
          type="button"
          onClick={handleRemoveItem}
        >
          <IoMdCloseCircle />
          Remover
        </button>
      </div>
    </CartItemContainer>
  );
};

export default CartItem;
