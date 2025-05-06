import api from "./api";
import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    withAuth?: boolean;
  }
}

import { POST_CART_API_ENDPOINT } from "./endpoints";

// export const getCart = (params: { page?: number; pageSize?: number }) => {
//   return api.get(GET_WISHLIST_API_ENDPOINT, { params, withAuth: true });
// };

export const postAddToCart = (payload: {
  product_id?: number;
  quantity?: number;
}) => {
  return api.post(POST_CART_API_ENDPOINT, payload, { withAuth: true });
};
