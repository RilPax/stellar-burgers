import { FC, useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { fetchOrderByNumber } from '../../services/slices/order-slice/order-slice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();
  const location = useLocation();

  const ingredients = useSelector(
    (state: RootState) => state.ingredients.items
  );
  const isLoading = useSelector((state: RootState) => state.order.isLoading);
  const currentOrder = useSelector(
    (state: RootState) => state.order.currentOrder
  );

  const isFeed = location.pathname.includes('feed');

  const orders = useSelector((state: RootState) =>
    isFeed ? state.feeds.orders : state.order.userOrders
  );

  const orderFromList = useMemo(
    () => orders.find((order) => order.number === Number(number)),
    [orders, number]
  );

  useEffect(() => {
    if (!orderFromList && number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
  }, [dispatch, number, orderFromList]);

  const orderData = orderFromList || currentOrder;

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = { ...ingredient, count: 1 };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {} as { [key: string]: TIngredient & { count: number } }
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo || isLoading) return <Preloader />;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
