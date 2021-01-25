import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Header from '../../components/Header';
import PageContainer, { OrdersSection } from './styles';
import { AppContext, typeIds } from '../../AppProvider';
import OrderRow from '../../components/OrderRow';

const Orders: React.FC = () => {
  const [typeId] = useState(typeIds.fogo);
  const { appContext } = useContext(AppContext);

  return (
    <>
      <Header typeId={typeId} />
      <PageContainer>
        <OrdersSection>
          <h1
            className={
              appContext[typeId].myOrders.length === 0 ? 'no-orders' : ''
            }
          >
            Minhas Compras:
          </h1>
          {appContext[typeId].myOrders.length > 0 && (
            <p>
              Total: <span>{appContext[typeId].myOrders.length} compra(s)</span>
            </p>
          )}
          {appContext[typeId].myOrders.length > 0 ? (
            appContext[typeId].myOrders.map(orderData => (
              <OrderRow key={orderData.id} orderData={orderData} />
            ))
          ) : (
            <div className="empty-orders">
              <p>Você ainda não tem compras!</p>
              <Link to="/fogo">
                <IoMdArrowRoundBack />
                Voltar às compras
              </Link>
            </div>
          )}
        </OrdersSection>
      </PageContainer>
    </>
  );
};

export default Orders;
