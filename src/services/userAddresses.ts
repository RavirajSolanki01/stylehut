import api from "./api";
import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    withAuth?: boolean;
  }
}

import {
  POST_ADDRESS_API_ENDPOINT,
  GET_ADDRESS_API_ENDPOINT,
  UPDATE_ADDRESS_API_ENDPOINT,
  DELETE_ADDRESS_API_ENDPOINT,
  GET_ADDRESS_BY_ID_API_ENDPOINT,
} from "./endpoints";
import { FormAddressData } from "../utils/types";

export const getAddresses = (params: { page?: number; pageSize?: number }) => {
  return api.get(GET_ADDRESS_API_ENDPOINT, { params, withAuth: true });
};

export const postAddress = (payload: FormAddressData) => {
  return api.post(POST_ADDRESS_API_ENDPOINT, payload, { withAuth: true });
};

export const updateAddress = (payload: {
  address_id: number;
  data: FormAddressData;
}) => {
  return api.put(`${UPDATE_ADDRESS_API_ENDPOINT}/${payload.address_id}`, payload.data, { withAuth: true });
};

export const deleteAddress = (payload: { address_id: number }) => {
  return api.delete(`${DELETE_ADDRESS_API_ENDPOINT}/${payload.address_id}`, {
    withAuth: true,
  });
};

export const getAddressById = (payload: { address_id: number }) => {
  return api.get(`${GET_ADDRESS_BY_ID_API_ENDPOINT}/${payload.address_id}`, {
    withAuth: true,
  });
};

