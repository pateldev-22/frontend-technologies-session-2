import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CartItem{
    id:number,
    quantity:number,
    price:number,
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(action.payload);
      }

      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    updateItem: (state, action: PayloadAction<{ id: number, quantity: number }>) => {
    const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
    if (itemIndex !== -1) {
      state.items[itemIndex].quantity = action.payload.quantity;

      state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  },

  removeItem: (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(item => item.id !== action.payload);

        state.total = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
  },

});

export const { addItem ,updateItem,removeItem} = cartSlice.actions;
export default cartSlice.reducer;