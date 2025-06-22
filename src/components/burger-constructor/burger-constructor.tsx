import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';
import {
  createOrder,
  clearOrder
} from '../../services/slices/order-slice/order-slice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedItems, selectedBun } = useSelector(
    (state) => state.ingredients
  );

  const { user } = useSelector((state: RootState) => state.auth);

  const {
    orderData,
    isLoading: orderRequest,
    error
  } = useSelector((state: RootState) => state.order);

  const constructorItems = useMemo(
    () => ({
      bun: selectedBun,
      ingredients: selectedItems
    }),
    [selectedBun, selectedItems]
  );
  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientsIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderData?.order!}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
      user={user}
    />
  );
};
