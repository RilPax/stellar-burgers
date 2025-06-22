import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { RootState, useSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  /** TODO: взять переменную из стора */
  const burgerConstructor = useSelector(
    (state: RootState) => state.ingredients
  );

  const ingredientsCounters = useMemo(() => {
    const { selectedBun, selectedItems } = burgerConstructor;
    const counters: { [key: string]: number } = {};
    selectedItems.forEach((selectedItem: TIngredient) => {
      if (!counters[selectedItem._id]) counters[selectedItem._id] = 0;
      counters[selectedItem._id]++;
    });
    if (selectedBun) counters[selectedBun._id] = 2;
    return counters;
  }, [burgerConstructor]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
