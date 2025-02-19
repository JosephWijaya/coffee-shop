import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
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
      state.data = [...state.data, action.payload];
    },
    editItem: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...action.payload };
      }
    },
    deleteItem: (state, action) => {
      const data = state.data.filter((item) => item.id !== action.payload.id);
      state.data = data;
    },
    editStock: (state, action) => {
      const arr = action.payload.arrRecipe;
      const newData = state.data.map((item) => ({ ...item })); // Create a shallow copy of the data
      arr.map((obj, idx) => {
        const index = newData.findIndex(item => item.id === obj.id);
        if (index !== -1) {
          let qty = 0;
          if (obj.uom === "g") {
            qty = obj.qty / 1000;
          } else if (obj.uom === "ml") {
            qty = obj.qty / 1000;
          } else {
            qty = obj.qty;
          }
    
          // Ensure that the quantity does not go negative
          if (newData[idx].qty >= qty) {
            newData[idx].qty -= qty;
          } else {
            console.warn(`Cannot reduce stock for ${newData[idx].item_name}. Insufficient stock.`);
          }
        }
      });
      state.data = newData;
    },
    clear: (state = initialState) => {
      return initialState;
    },
  },
});

export const itemAction = itemSlice.actions;

export default itemSlice.reducer;
