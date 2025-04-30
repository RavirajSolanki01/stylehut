import api from "./api";
import "axios";
import { GET_CATEGORY_DATA } from "./endpoints";

declare module "axios" {
  export interface AxiosRequestConfig {
    withAuth?: boolean;
  }
}

export const getCategories = () => {
  return api.get(GET_CATEGORY_DATA, { withAuth: true });
};
