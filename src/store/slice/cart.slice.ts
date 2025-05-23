import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItems, Coupon } from "../../utils/types";

interface CartState {
  cartItems: CartItems[];
  coupon: Coupon | null;
  availableCoupons: Coupon[];
}

const initialState: CartState = {
  cartItems: [],
  coupon: null,
  availableCoupons: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setSelectedItems: (state, action: PayloadAction<CartItems[]>) => {
      state.cartItems = action.payload;
    },
    addItemToCart: (state, action: PayloadAction<CartItems>) => {
      state.cartItems.push(action.payload);
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    addAppliedCoupon: (state, action: PayloadAction<Coupon | null>) => {
      state.coupon = action.payload;
    },
    setAvailableCouponsForUser : (state, action: PayloadAction<Coupon[]>) => {
      state.availableCoupons = action.payload;
    },
  },
});

export const {
  setSelectedItems,
  clearCart,
  removeItemFromCart,
  addItemToCart,
  setAvailableCouponsForUser,
  addAppliedCoupon,
} = cartSlice.actions;
export default cartSlice.reducer;
