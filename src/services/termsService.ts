import "axios";

import api from "./api";
import { GET_PRIVACY_POLICY_API_ENDPOINT, GET_TERMS_API_ENDPOINT } from "./endpoints";

declare module "axios" {
  export interface AxiosRequestConfig {
    withAuth?: boolean;
  }
}

export const getTerms = () => {
  return api.get(GET_TERMS_API_ENDPOINT, { withAuth: true });
};

export const getPrivacyPolicy = () => {
  return api.get(GET_PRIVACY_POLICY_API_ENDPOINT, { withAuth: true });
};
