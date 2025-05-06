import api from "./api";
import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    withAuth?: boolean;
  }
}

import {
  POST_PRODUCT_TO_CART_API_ENDPOINT,
  GET_CART_PRODUCTS_API_ENDPOINT,
  DELETE_CART_PRODUCT_API_ENDPOINT,
  UPDATE_CART_PRODUCT_API_ENDPOINT
} from "./endpoints";
import { FormAddressData } from "../utils/types";

export const getCartProducts = (params: { page?: number; pageSize?: number }) => {
  return api.get(GET_CART_PRODUCTS_API_ENDPOINT, { params, withAuth: true });
};

export const postCartProduct = (payload: {product_id: number, quantity: number}) => {
  return api.post(POST_PRODUCT_TO_CART_API_ENDPOINT, payload, { withAuth: true });
};

export const updateCartProduct = (payload: {
  product_id: number;
  data: FormAddressData;
}) => {
  return api.put(
    `${UPDATE_CART_PRODUCT_API_ENDPOINT}/${payload.product_id}`,
    payload.data,
    { withAuth: true }
  );
};

export const deleteCartProduct = (payload: { product_id: number }) => {
  return api.delete(`${DELETE_CART_PRODUCT_API_ENDPOINT}/${payload.product_id}`, {
    withAuth: true,
  });
};

