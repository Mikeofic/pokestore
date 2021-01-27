import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { CgChevronDoubleDown } from 'react-icons/cg';
import Header from '../../components/Header';
import PageContainer, { OrdersSection } from './styles';
import { AppContext } from '../../AppProvider';
import { typeIds, TypeNames } from '../../services/interfaces';
import OrderRow from '../../components/OrderRow';

const Orders: React.FC<TypeNames> = ({ typeName }) => {
  const { appContext } = useContext(AppContext);
  const [typeId, setTypeId] = useState(() => {
    Object.keys(typeIds).forEach(key =>
      document.documentElement.classList.remove(key),
    );
    document.documentElement.classList.add(typeName);
    return typeIds[typeName].id;
  });
  const [ordersToShow, setOrdersToShow] = useState(0);

  useEffect(() => {
    if (appContext[typeId].myOrders.length > 0) {
      setOrdersToShow(10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeId]);

  useEffect(() => {
    Object.keys(typeIds).forEach(key =>
      document.documentElement.classList.remove(key),
    );
    document.documentElement.classList.add(typeName);
    document.title = typeIds[typeName].title;

    setTypeId(typeIds[typeName].id);
  }, [typeName]);

  const handleLoadMore = useCallback(() => {
    const ordersLength = appContext[typeId].myOrders.length;
    if (ordersLength <= ordersToShow) return;

    const newLimit = ordersToShow + 10;
    setOrdersToShow(
      newLimit > ordersLength ? newLimit - (newLimit - ordersLength) : newLimit,
    );
  }, [appContext, ordersToShow, typeId]);

  return (
    <>
      <Header typeName={typeName} />
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
            appContext[typeId].myOrders.map(
              (orderData, index) =>
                ordersToShow > index && (
                  <OrderRow key={orderData.id} orderData={orderData} />
                ),
            )
          ) : (
            <div className="empty-orders">
              <p>Você ainda não tem compras!</p>
              <Link to={`/${typeName}`}>
                <IoMdArrowRoundBack />
                Voltar às compras
              </Link>
            </div>
          )}
          {ordersToShow > 0 &&
            appContext[typeId].myOrders.length > ordersToShow && (
              <p className="load-more">
                <button type="button" onClick={handleLoadMore}>
                  Ver mais <CgChevronDoubleDown />
                </button>
              </p>
            )}
        </OrdersSection>
      </PageContainer>
    </>
  );
};

export default Orders;
