import { FC } from 'react';
import { useDispatch } from '../../services/store';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {
  moveSelectedIngredient,
  removeSelectedIngredient
} from '../../services/slices/ingridients/ingridients-slice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = ({
  ingredient,
  index,
  totalItems
}) => {
  const dispatch = useDispatch();

  const handleMoveDown = () => {
    if (index < totalItems - 1) {
      dispatch(
        moveSelectedIngredient({
          dragIndex: index,
          hoverIndex: index + 1
        })
      );
    }
  };

  const handleMoveUp = () => {
    if (index > 0) {
      dispatch(
        moveSelectedIngredient({
          dragIndex: index,
          hoverIndex: index - 1
        })
      );
    }
  };

  const handleClose = () => {
    dispatch(removeSelectedIngredient(ingredient.id));
  };

  return (
    <BurgerConstructorElementUI
      ingredient={ingredient}
      index={index}
      totalItems={totalItems}
      handleMoveUp={handleMoveUp}
      handleMoveDown={handleMoveDown}
      handleClose={handleClose}
    />
  );
};
