import "axios";

import api from "./api";
import { GET_LANDING_PAGE_SHOP_BY_CATEGORY_API_ENDPOINT } from "./endpoints";

declare module "axios" {
  export interface AxiosRequestConfig {
    withAuth?: boolean;
  }
}

export const getLandingPageShopByCategory = () => {
  return api.get(GET_LANDING_PAGE_SHOP_BY_CATEGORY_API_ENDPOINT);
};
