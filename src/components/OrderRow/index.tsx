import React from 'react';
import OrderRowContainer, { PokemonRow } from './styles';
import { MyOrdersType } from '../../AppProvider';
import { timeConverter } from '../../services/scripts';

interface OrderRowProps {
  orderData: MyOrdersType;
}

const OrderRow: React.FC<OrderRowProps> = ({
  orderData: { timestamp, quantity, totalPrice, cashback, order },
}) => {
  return (
    <OrderRowContainer>
      <div className="title">
        <p>
          <span>{quantity} pokémon</span> comprados por{' '}
          <span>R$ {totalPrice}</span>.
        </p>
        <p>
          Cashback de <span>R$ {cashback}</span>.
        </p>
        <p>
          Compra executada em <span>{timeConverter(timestamp)}</span>.
        </p>
      </div>
      {order.map(myOrder => (
        <PokemonRow key={myOrder.id}>
          <img src={myOrder.imgurl} alt={myOrder.name} />
          <div>
            <p className="name">{myOrder.name}</p>
            <p className="quantity">
              Quantidade: <span>{myOrder.quantity} pokémon</span>
            </p>
            <p className="unitary-price">
              Preço Unitário: <span>R$ {myOrder.unitaryPrice}</span>
            </p>
            <p className="total-price">
              Preço Total: <span>R$ {myOrder.totalPrice}</span>
            </p>
          </div>
        </PokemonRow>
      ))}
    </OrderRowContainer>
  );
};

export default OrderRow;
