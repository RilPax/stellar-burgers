import orderReducer, {
  createOrder,
  fetchOrderByNumber,
  fetchUserOrders
} from './order-slice';
import { TOrder, TNewOrderResponse } from '../../../utils/burger-api';

describe('Редьюсеры order-slice', () => {
  const initialState = {
    orderData: null,
    currentOrder: null,
    userOrders: [],
    userOrdersLoading: false,
    userOrdersError: null,
    isLoading: false,
    error: null
  };

  test('Должен обрабатывать createOrder.pending', () => {
    const state = orderReducer(initialState, createOrder.pending('', []));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Должен обрабатывать createOrder.fulfilled', () => {
    const mockPayload: TNewOrderResponse = {
      name: 'Test Burger',
      order: { _id: '1', name: 'Test Order', status: 'done', ingredients: [], createdAt: '', updatedAt: '', number: 123 },
      success: true
    };

    const state = orderReducer(initialState, createOrder.fulfilled(mockPayload, '', []));
    expect(state.isLoading).toBe(false);
    expect(state.orderData).toEqual(mockPayload);
    expect(state.userOrders[0]).toEqual(mockPayload.order);
  });

  test('Должен обрабатывать createOrder.rejected', () => {
    const error = 'Failed to create order';
    const state = orderReducer(initialState, createOrder.rejected(new Error(), '', [], error));
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  test('Должен обрабатывать fetchOrderByNumber.pending', () => {
    const state = orderReducer(initialState, fetchOrderByNumber.pending('', 123));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Должен обрабатывать fetchOrderByNumber.fulfilled', () => {
    const mockOrder: TOrder = {
      _id: '1',
      name: 'Order #1',
      status: 'done',
      ingredients: [],
      createdAt: '',
      updatedAt: '',
      number: 1
    };

    const state = orderReducer(initialState, fetchOrderByNumber.fulfilled(mockOrder, '', 1));
    expect(state.isLoading).toBe(false);
    expect(state.currentOrder).toEqual(mockOrder);
  });

  test('Должен обрабатывать fetchOrderByNumber.rejected', () => {
    const error = 'Failed to fetch order';
    const state = orderReducer(initialState, fetchOrderByNumber.rejected(new Error(), '', 123, error));
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });

  test('Должен обрабатывать fetchUserOrders.pending', () => {
    const state = orderReducer(initialState, fetchUserOrders.pending('', undefined));
    expect(state.userOrdersLoading).toBe(true);
    expect(state.userOrdersError).toBeNull();
  });

  test('Должен обрабатывать fetchUserOrders.fulfilled', () => {
    const mockOrders: TOrder[] = [
      {
        _id: '1',
        name: 'Order 1',
        status: 'done',
        ingredients: [],
        createdAt: '',
        updatedAt: '',
        number: 1
      }
    ];

    const state = orderReducer(initialState, fetchUserOrders.fulfilled(mockOrders, '', undefined));
    expect(state.userOrdersLoading).toBe(false);
    expect(state.userOrders).toEqual(mockOrders);
  });

  test('Должен обрабатывать fetchUserOrders.rejected', () => {
    const error = 'Failed to fetch user orders';
    const state = orderReducer(initialState, fetchUserOrders.rejected(new Error(), '', undefined, error));
    expect(state.userOrdersLoading).toBe(false);
    expect(state.userOrdersError).toBe(error);
  });
});
