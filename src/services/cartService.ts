import api from "./api";
import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    withAuth?: boolean;
  }
}

import {
  DELETE_FROM_CART_API_ENDPOINT,
  GET_CART_PRODUCTS_API_ENDPOINT,
  POST_CART_API_ENDPOINT,
} from "./endpoints";

export const getCartProducts = (params: {
  page?: number;
  pageSize?: number;
}) => {
  return api.get(GET_CART_PRODUCTS_API_ENDPOINT, { params, withAuth: true });
};

export const postAddToCart = (payload: {
  product_id?: number;
  quantity?: number;
}) => {
  return api.post(POST_CART_API_ENDPOINT, payload, { withAuth: true });
};

export const removeFromCart = (product_id: number) => {
  return api.delete(`${DELETE_FROM_CART_API_ENDPOINT}/${product_id}`, {
    withAuth: true,
  });
};
