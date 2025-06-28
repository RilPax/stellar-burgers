import { rootReducer } from './store'; 
import ingredientsReducer from './slices/ingridients/ingridients-slice';
import feedsReducer from './slices/orders/feeds-slice';
import authReducer from './slices/auth-slice/auth-slice';
import orderReducer from './slices/order-slice/order-slice';

describe('rootReducer', () => {
  test('Должен вернуть начальное состояние всех слайсов', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('feeds');
    expect(initialState).toHaveProperty('auth');
    expect(initialState).toHaveProperty('order');

    expect(initialState.ingredients).toEqual(ingredientsReducer(undefined, { type: '@@INIT' }));
    expect(initialState.feeds).toEqual(feedsReducer(undefined, { type: '@@INIT' }));
    expect(initialState.auth).toEqual(authReducer(undefined, { type: '@@INIT' }));
    expect(initialState.order).toEqual(orderReducer(undefined, { type: '@@INIT' }));
  });
});
