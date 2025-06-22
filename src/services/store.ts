import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingridients/ingridients-slice';
import feedsReducer from './slices/orders/feeds-slice';
import authReducer from './slices/auth-slice/auth-slice';
import orderReducer from './slices/order-slice/order-slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  auth: authReducer,
  order: orderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
