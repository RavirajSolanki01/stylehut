import api from "./api";
import "axios";
import { GET_HEADER_SEARCH_API_ENDPOINT } from "./endpoints";

declare module "axios" {
  export interface AxiosRequestConfig {
    withAuth?: boolean;
  }
}

export const getheaderSearch = (search: string) => {
  return api.get(`${GET_HEADER_SEARCH_API_ENDPOINT}${search}`, {
    withAuth: true,
  });
};
