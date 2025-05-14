import api from "./api";
import { GET_USER_ORDER_LIST_API_ENDPOINT } from "./endpoints";

export const getUserOrderList = (params: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  status?: string;
  order?: string;
  payment_status?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}) => {
  return api.get(GET_USER_ORDER_LIST_API_ENDPOINT, { params, withAuth: true });
};
