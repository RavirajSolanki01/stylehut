import { toast } from "react-toastify";

import { AppDispatch } from "../../store";
import { setLoading } from "../../store/slice/loading.slice";

export const getRatingColor = (rating: number) => {
  if (rating <= 1) return "#f16565";
  if (rating <= 2) return "#fcb301";
  if (rating <= 3) return "#72bfbc";
  if (rating <= 5) return "#14958f";
  return "#14958f"; // fallback
};

export const withLoading = async (
  dispatch: AppDispatch,
  key: string,
  callback: () => Promise<void>
): Promise<void> => {
  try {
    dispatch(setLoading({ key, value: true }));
    await callback();
  } catch (error) {
    toast.error("Something went wrong!");
  } finally {
    dispatch(setLoading({ key, value: false }));
  }
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN").format(price);
};
