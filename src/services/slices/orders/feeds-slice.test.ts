import reducer, { fetchFeeds } from './feeds-slice';

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

describe('Экстра-редьюсеры feedsSlice', () => {
  test('Должен обрабатывать fetchFeeds.pending', () => {
    const state = reducer(initialState, { type: fetchFeeds.pending.type });
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('Должен обрабатывать fetchFeeds.fulfilled', () => {
    const mockPayload = {
      orders: [{ id: '1' }],
      total: 10,
      totalToday: 3
    };

    const state = reducer(initialState, {
      type: fetchFeeds.fulfilled.type,
      payload: mockPayload
    });

    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockPayload.orders);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(3);
  });

  test('Должен обрабатывать fetchFeeds.rejected', () => {
    const state = reducer(initialState, {
      type: fetchFeeds.rejected.type,
      payload: 'Feed error'
    });

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Feed error');
  });
});
