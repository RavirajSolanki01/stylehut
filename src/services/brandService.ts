import "axios";

import api from "./api";
import { GET_BRAND_LIST_API_ENDPOINT, GET_BRAND_LIST_RELATED_SUB_CATEGORY_API_ENDPOINT } from "./endpoints";
declare module "axios" {
  export interface AxiosRequestConfig {
    withAuth?: boolean;
  }
}

export const getBrandList = () => {
  return api.get(`${GET_BRAND_LIST_API_ENDPOINT}`, { withAuth: false });
};

export const getBrandListRelatedSubCategory = (sub_category_id: string) => {
  return api.get(`${GET_BRAND_LIST_RELATED_SUB_CATEGORY_API_ENDPOINT}/${sub_category_id}`, { withAuth: false });
};
