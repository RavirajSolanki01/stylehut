import api from "./api";
import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    withAuth?: boolean;
  }
}

import { GET_PRODUCT_LIST_API_ENDPOINT } from "./endpoints";

export const getProductList = (params: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  order?: string;
  maxPrice?: number;
}) => {
  return api.get(GET_PRODUCT_LIST_API_ENDPOINT, { params, withAuth: true });
};
