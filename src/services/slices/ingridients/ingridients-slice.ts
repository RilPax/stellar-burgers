// ingredients-slice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../../utils/burger-api';
import { TIngredient, TConstructorIngredient } from '../../../utils/types';

interface IngredientsState {
  items: TIngredient[];
  selectedItems: TConstructorIngredient[];
  selectedBun: TConstructorIngredient | null;
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  items: [],
  selectedItems: [],
  selectedBun: null,
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, thunkAPI) => {
    try {
      return await getIngredientsApi();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.message || 'Error loading ingredients'
      );
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addSelectedIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;

        if (ingredient.type === 'bun') {
          state.selectedBun = ingredient;
        } else {
          state.selectedItems.push(ingredient);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = crypto.randomUUID();
        return { payload: { ...ingredient, id } };
      }
    },
    removeSelectedIngredient: (state, action: PayloadAction<string>) => {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload
      );
    },
    moveSelectedIngredient: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const dragItem = state.selectedItems[dragIndex];

      const newItems = [...state.selectedItems];
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, dragItem);

      state.selectedItems = newItems;
    },
    clearSelectedIngredients: (state) => {
      state.selectedItems = [];
      state.selectedBun = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const {
  addSelectedIngredient,
  removeSelectedIngredient,
  moveSelectedIngredient,
  clearSelectedIngredients
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
