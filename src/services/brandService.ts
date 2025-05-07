import api from "./api";
import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    withAuth?: boolean;
  }
}

import { GET_BRAND_LIST_API_ENDPOINT } from "./endpoints";

export const getBrandList = () => {
  return api.get(GET_BRAND_LIST_API_ENDPOINT, { withAuth: true });
};
