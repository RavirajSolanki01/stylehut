import "axios";

import api from "./api";
import {
  DELETE_FROM_CART_API_ENDPOINT,
  GET_CART_PRODUCTS_API_ENDPOINT,
  GET_COUPONS_API_ENDPOINT,
  MOVE_All_FROM_CART_TO_WISHLIST_API_ENDPOINT,
  PLACE_ORDER_API_ENDPOINT,
  POST_CART_API_ENDPOINT,
  REMOVE_All_FROM_CART_API_ENDPOINT,
} from "./endpoints";
declare module "axios" {
  export interface AxiosRequestConfig {
    withAuth?: boolean;
  }
}

export const getCartProducts = (params: {
  page?: number;
  pageSize?: number;
}) => {
  return api.get(GET_CART_PRODUCTS_API_ENDPOINT, { params, withAuth: true });
};

export const placeOrderApiCall = (payload: {
  shipping_address_id: number;
  billing_address_id: number;
  payment_method: string;
}) => {
  return api.post(PLACE_ORDER_API_ENDPOINT, payload, { withAuth: true });
};

export const postAddToCart = (payload: {
  product_id?: number;
  quantity?: number;
  size_quantity_id?: number;
  color?: string;
}) => {
  return api.post(POST_CART_API_ENDPOINT, payload, { withAuth: true });
};

export const removeFromCart = (product_id: number) => {
  return api.delete(`${DELETE_FROM_CART_API_ENDPOINT}/${product_id}`, {
    withAuth: true,
  });
};

export const removeAllFromCart = (product_ids: number[]) => {
  return api.put(
    REMOVE_All_FROM_CART_API_ENDPOINT,
    { product_ids: product_ids },
    {
      withAuth: true,
    }
  );
};

export const moveAllFromCartToWishlist = (product_ids: number[]) => {
  return api.put(
    MOVE_All_FROM_CART_TO_WISHLIST_API_ENDPOINT,
    { product_ids: product_ids },
    {
      withAuth: true,
    }
  );
};

export const getCouponsForUser = (params: { cart_amount: number }) => {
  return api.get(GET_COUPONS_API_ENDPOINT, { params, withAuth: true });
};
