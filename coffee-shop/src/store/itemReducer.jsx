import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: [
    {
      id: 1,
      item_name: "Aren Sugar",
      qty: 1,
      uom: "kg",
      price: 60000,
    },
    {
      id: 2,
      item_name: "Milk",
      qty: 1,
      uom: "liter",
      price: 30000,
    },
    {
      id: 3,
      item_name: "Ice Cube",
      qty: 1,
      uom: "kg",
      price: 15000,
    },
    {
      id: 4,
      item_name: "Plastic",
      qty: 10,
      uom: "pcs",
      price: 5000,
    },
    {
      id: 5,
      item_name: "Coffee Bean",
      qty: 1,
      uom: "kg",
      price: 100000,
    },
    {
      id: 6,
      item_name: "Mineral Water",
      qty: 1,
      uom: "liter",
      price: 5000,
    },
  ],
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.item = [...state.item, action.payload];
    },
    editItem: (state, action) => {
      const index = state.item.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.item[index] = { ...state.item[index], ...action.payload };
      }
    },
    deleteItem: (state, action) => {
      const data = state.item.filter((item) => item.id !== action.payload.id);
      state.item = data;
    },
    clear: (state = initialState) => {
      return initialState;
    },
  },
});

export const itemAction = itemSlice.actions;

export default itemSlice.reducer;
