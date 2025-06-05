import "axios";

import {
  FETCH_OTP_EXPIRY_LIMIT,
  GET_USER_PROFILE_API_ENDPOINT,
  REGISTER_API_ENDPOINT,
  RESEND_OTP_API_ENDPOINT,
  UPDATE_USER_PROFILE_API_ENDPOINT,
  VERIFY_OTP_API_ENDPOINT,
} from "./endpoints";
import api from "./api";
declare module "axios" {
  export interface AxiosRequestConfig {
    withAuth?: boolean;
  }
}

type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  birth_date: string;
  gender_id: number;
};

export const registerUser = (payload: { email: string }) => {
  return api.post(REGISTER_API_ENDPOINT, payload);
};

export const verifyOtp = (payload: { email: string; otp: string }) => {
  return api.post(VERIFY_OTP_API_ENDPOINT, payload);
};

export const getUserProfile = () => {
  return api.get(GET_USER_PROFILE_API_ENDPOINT, { withAuth: true });
};

export const updateUserProfile = (payload: FormData) => {
  return api.patch(UPDATE_USER_PROFILE_API_ENDPOINT, payload, {
    withAuth: true,
  });
};

export const resendOtp = (params: { email: string }) => {
  return api.get(`${RESEND_OTP_API_ENDPOINT}?email=${params.email}`);
};

export const resendOtpWithPayload = (payload: { email: string }) => {
  return api.post(RESEND_OTP_API_ENDPOINT, payload);
};

export const getOtpExpiryLimit = (params: {email: string}) => {
  return api.get(`${FETCH_OTP_EXPIRY_LIMIT}?email=${params.email}`, { withAuth: true });
};