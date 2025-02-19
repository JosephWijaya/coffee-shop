import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipe: [
    {
      id: 1,
      qty: 15,
    },
    {
      id: 2,
      qty: 150,
    },
    {
      id: 3,
      qty: 20,
    },
    {
      id: 4,
      qty: 1,
    },
    {
      id: 5,
      qty: 20,
    },
    {
      id: 6,
      qty: 50,
    },
  ],
  report: [
    {
      id: 1,
      order: 2,
      date: "9/30/2023, 10:30:00 AM",
      total: 16900,
      recipe: [
        {
          id: 1,
          item_name: "Aren Sugar",
          qty: 15,
          uom: "g",
          price: 1800,
          subTotal: 1800,
        },
        {
          id: 2,
          item_name: "Milk",
          qty: 150,
          uom: "ml",
          price: 9000,
          subTotal: 9000,
        },
        {
          id: 3,
          item_name: "Ice Cube",
          qty: 20,
          uom: "g",
          price: 600,
          subTotal: 600,
        },
        {
          id: 4,
          item_name: "Plastic",
          qty: 1,
          uom: "pcs",
          price: 1000,
          subTotal: 1000,
        },
        {
          id: 5,
          item_name: "Coffee Bean",
          qty: 20,
          uom: "g",
          price: 4000,
          subTotal: 4000,
        },
        {
          id: 6,
          item_name: "Mineral Water",
          qty: 50,
          uom: "ml",
          price: 500,
          subTotal: 500,
        },
      ],
    },
  ],
};

export const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    editRecipe: (state, action) => {
      const index = state.recipe.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.recipe[index] = { ...state.recipe[index], ...action.payload };
      }
    },
    addReport: (state, action) => {
      state.report = [...state.report, action.payload];
    },
    clear: (state = initialState) => {
      return initialState;
    },
  },
});

export const reportAction = reportSlice.actions;

export default reportSlice.reducer;
