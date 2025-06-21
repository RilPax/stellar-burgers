import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  orderBurgerApi,
  getOrderByNumberApi,
  getOrdersApi,
  TOrder,
  TNewOrderResponse
} from '../../../utils/burger-api';
import { RootState } from '../../store';

interface OrdersState {
  orderData: TNewOrderResponse | null;
  currentOrder: TOrder | null;

  userOrders: TOrder[];
  userOrdersLoading: boolean;
  userOrdersError: string | null;

  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orderData: null,
  currentOrder: null,
  userOrders: [],
  userOrdersLoading: false,
  userOrdersError: null,
  isLoading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'orders/create',
  async (ingredientIds: string[], { rejectWithValue }) => {
    try {
      return await orderBurgerApi(ingredientIds);
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to create order');
    }
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response.orders[0];
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch order');
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      return await getOrdersApi();
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch user orders');
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderData = null;
      state.currentOrder = null;
    },

    resetOrdersError: (state) => {
      state.error = null;
      state.userOrdersError = null;
    },

    clearUserOrders: (state) => {
      state.userOrders = [];
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderData = action.payload;

        if (action.payload?.order) {
          state.userOrders.unshift(action.payload.order);
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchUserOrders.pending, (state) => {
        state.userOrdersLoading = true;
        state.userOrdersError = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.userOrdersLoading = false;
        state.userOrdersError = action.payload as string;
      });
  }
});

export const { clearOrder, resetOrdersError, clearUserOrders } =
  orderSlice.actions;

export const selectOrderData = (state: RootState) => state.order.orderData;
export const selectCurrentOrder = (state: RootState) =>
  state.order.currentOrder;
export const selectOrderLoading = (state: RootState) => state.order.isLoading;
export const selectOrderError = (state: RootState) => state.order.error;

export const selectUserOrders = (state: RootState) => state.order.userOrders;
export const selectUserOrdersLoading = (state: RootState) =>
  state.order.userOrdersLoading;
export const selectUserOrdersError = (state: RootState) =>
  state.order.userOrdersError;

export default orderSlice.reducer;
