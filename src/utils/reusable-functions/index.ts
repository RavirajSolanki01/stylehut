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

export const getDateRange = (option: string) => {
  const endDate = new Date();
  let startDate;

  switch (option) {
    case "Last 30 days":
      startDate = new Date();
      startDate.setDate(endDate.getDate() - 30);
      break;

    case "Last 6 Months":
      startDate = new Date();
      startDate.setMonth(endDate.getMonth() - 6);
      break;

    case "Last Year":
      startDate = new Date();
      startDate.setFullYear(endDate.getFullYear() - 1);
      break;

    case "Anytime":
    default:
      startDate = null;
      break;
  }

  return { startDate, endDate: option === "Anytime" ? "" : endDate };
};
