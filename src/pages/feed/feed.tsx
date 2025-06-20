import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchFeeds } from '../../services/slices/orders/feeds-slice';
import { RootState, useDispatch } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.feeds
  );

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchFeeds());
    }
  }, [dispatch, orders.length]);

  if (loading) return <Preloader />;
  if (error) return <div>Ошибка: {error}</div>;
  if (!orders.length) return <div>Нет заказов</div>;

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeeds());
      }}
    />
  );
};
