import "axios";

import api from "./api";
import {
  GET_ORDERS_API_ENDPOINT,
} from "./endpoints";
declare module "axios" {
  export interface AxiosRequestConfig {
    withAuth?: boolean;
  }
}

export const getOrders = (params: { page?: number; pageSize?: number }) => {
  return api.get(GET_ORDERS_API_ENDPOINT, { params, withAuth: true });
};
