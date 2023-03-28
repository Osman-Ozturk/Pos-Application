import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "Cart",
  initialState: {
    cartItems:localStorage.getItem("posAppCart") ? JSON.parse(localStorage.getItem("posAppCart")).cartItems : [],
    total: localStorage.getItem("posAppCart") ? JSON.parse(localStorage.getItem("posAppCart")).total : 0,
    tax: localStorage.getItem("posAppCart") ? JSON.parse(localStorage.getItem("posAppCart")).tax : 8,
  },
  reducers: {
    addProduct: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (findCartItem) {
        findCartItem.quantity += 1;
      } else {
        state.cartItems.push(action.payload);
      }
      state.total += Number(action.payload.price);
    },
    deleteProduct: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.quantity;
    },
    plusQuantity: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      });
      state.total += Number(action.payload.price);
    },
    minusQuantity: (state, action) => {
      if (action.payload.quantity > 1) {
        state.cartItems = state.cartItems.map((item) => {
          if (item._id === action.payload._id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
        state.total -= Number(action.payload.price);
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        state.total -= action.payload.price * action.payload.quantity;
      }
    },
    reset:(state,action)=>{
        state.cartItems=[]
        state.total=0
    }
  },
});
export const { addProduct, deleteProduct, plusQuantity, minusQuantity,reset } =
  cartSlice.actions;
export default cartSlice.reducer;
