import "axios";

import api from "./api";
import {
  GET_WISHLIST_API_ENDPOINT,
  POST_WISHLIST_API_ENDPOINT,
} from "./endpoints";
declare module "axios" {
  export interface AxiosRequestConfig {
    withAuth?: boolean;
  }
}

export const getWishlist = (params: { page?: number; pageSize?: number }) => {
  return api.get(GET_WISHLIST_API_ENDPOINT, { params, withAuth: true });
};

export const postWishlist = (payload: { product_id?: number, isSoftAdd?: boolean }) => {
  return api.post(POST_WISHLIST_API_ENDPOINT, payload, { withAuth: true });
};
