import "axios";

import api from "./api";
import { GET_BRAND_LIST_API_ENDPOINT } from "./endpoints";
declare module "axios" {
  export interface AxiosRequestConfig {
    withAuth?: boolean;
  }
}

export const getBrandList = () => {
  return api.get(GET_BRAND_LIST_API_ENDPOINT, { withAuth: true });
};
