import ingredientsReducer, {
  addSelectedIngredient,
  removeSelectedIngredient,
  moveSelectedIngredient,
  fetchIngredients
} from './ingridients-slice';

import { TIngredient } from '../../../utils/types';

const initialState = {
  items: [],
  selectedItems: [],
  selectedBun: null,
  loading: false,
  error: null
};

const ingredient: TIngredient = {
  _id: '123',
  name: 'Test Ingredient',
  type: 'main',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 100,
  image: '',
  image_mobile: '',
  image_large: '',
};

const bun: TIngredient = {
  ...ingredient,
  _id: 'bun-1',
  name: 'Test Bun',
  type: 'bun'
};

describe('Логика ingridients-slice', () => {
  test('Должен обрабатывать добавление булки', () => {
    const state = ingredientsReducer(undefined, addSelectedIngredient(bun));

    expect(state.selectedBun).toMatchObject({ ...bun });
    expect(state.selectedItems).toEqual([]);
  });

  test('Должен обрабатывать добавление "не-булки"', () => {
    const state = ingredientsReducer(undefined, addSelectedIngredient(ingredient));

    expect(state.selectedItems.length).toBe(1);
    expect(state.selectedItems[0]).toMatchObject({ ...ingredient });
    expect(state.selectedItems[0]).toHaveProperty('id'); 
  });

  test('Должен обрабатывать удаление ингредиента по id', () => {
    const initialState = {
      ...ingredientsReducer(undefined, addSelectedIngredient(ingredient)),
    };

    const idToRemove = initialState.selectedItems[0].id;

    const state = ingredientsReducer(
      initialState,
      removeSelectedIngredient(idToRemove)
    );

    expect(state.selectedItems.length).toBe(0);
  });

  test('Должен обрабатывать перемещение ингредиента в списке', () => {
    const first = { ...ingredient, _id: '1' };
    const second = { ...ingredient, _id: '2' };

    const withFirst = ingredientsReducer(undefined, addSelectedIngredient(first));
    const withSecond = ingredientsReducer(withFirst, addSelectedIngredient(second));

    const idFirst = withSecond.selectedItems[0].id;
    const idSecond = withSecond.selectedItems[1].id;

    const moved = ingredientsReducer(
      withSecond,
      moveSelectedIngredient({ dragIndex: 0, hoverIndex: 1 })
    );

    expect(moved.selectedItems[0].id).toBe(idSecond);
    expect(moved.selectedItems[1].id).toBe(idFirst);
  });
});

describe('Ассинхронные операции ingridients-slice', () => {
  test('Должен обрабатывать fetchIngredients.pending', () => {
    const state = ingredientsReducer(initialState, fetchIngredients.pending('', undefined));
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('Должен обрабатывать fetchIngredients.fulfilled', () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Test Ingredient',
        type: 'main',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 100,
        image: '',
        image_mobile: '',
        image_large: ''
      }
    ];

    const state = ingredientsReducer(initialState, fetchIngredients.fulfilled(mockIngredients, '', undefined));
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
  });

  test('Должен обрабатывать fetchIngredients.rejected', () => {
    const errorMessage = 'Failed to fetch';
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(new Error(), '', undefined, errorMessage)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});