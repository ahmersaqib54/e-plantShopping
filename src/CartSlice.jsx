import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array of cart items
  },

  reducers: {
    // -------------------------------
    // ADD ITEM TO CART
    // -------------------------------
    addItem: (state, action) => {
      const { name, image, description, cost } = action.payload;

      // Check if item already exists
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          name,
          image,
          description,
          cost,
          quantity: 1,
        });
      }
    },

    // -------------------------------
    // REMOVE ONE ITEM COMPLETELY
    // -------------------------------
    removeItem: (state, action) => {
      const name = action.payload;

      // Filter out the item
      state.items = state.items.filter(item => item.name !== name);
    },

    // -------------------------------
    // UPDATE QUANTITY
    // -------------------------------
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;

      const item = state.items.find(item => item.name === name);

      if (item) {
        item.quantity = amount;
      }
    }
  },
});

// Export actions
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export reducer
export default CartSlice.reducer;
