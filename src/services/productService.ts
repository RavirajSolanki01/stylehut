import "axios";

import {
  GET_PRODUCT_DETAIL_API_ENDPOINT,
  GET_PRODUCT_LIST_API_ENDPOINT,
} from "./endpoints";
import api from "./api";

declare module "axios" {
  export interface AxiosRequestConfig {
    withAuth?: boolean;
  }
}

export const getProductList = (params: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  order?: string;
  minPrice?: number;
  maxPrice?: number;
  category_id?: number;
  sub_category_id?: number;
  sub_category_type_id?: number;
  brand_id?: number;
  minDiscount?: number;
  maxDiscount?: number;
}) => {
  return api.get(GET_PRODUCT_LIST_API_ENDPOINT, { params, withAuth: true });
};

export const getProductDetails = (id: number) => {
  return api.get(`${GET_PRODUCT_DETAIL_API_ENDPOINT}/${id}`, {
    withAuth: true,
  });
};
