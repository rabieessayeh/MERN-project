import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "panier",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.prix * action.payload.quantity;
    },
    viderPanier: (state) =>{
      state.quantity = 0;
      state.products=[];
      state.total = 0;
    }
  },
});


export const { addProduct, viderPanier } = cartSlice.actions;


export default cartSlice.reducer;
