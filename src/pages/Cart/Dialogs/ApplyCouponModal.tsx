import React, { useEffect, useState } from "react";
import { Dialog, styled, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { setLoading } from "../../../store/slice/loading.slice";
import { getCouponsForUser } from "../../../services/cartService";
import { Coupon } from "../../../utils/types";
import { RootState } from "../../../store";
import { setAvailableCouponsForUser } from "../../../store/slice/cart.slice";

interface ApplyCouponModalProps {
  openCouponDialog: boolean;
  totalAmount: number;
  handleCloseCouponDialog: () => void;
  onApplyCoupon: (coupon: Coupon | undefined, isRemove?: boolean) => void;
}

export const ApplyCouponModal: React.FC<ApplyCouponModalProps> = ({
  openCouponDialog,
  totalAmount,
  onApplyCoupon,
  handleCloseCouponDialog,
}) => {
  const dispatch = useDispatch();

  const { appliedCoupon, loading } = useSelector((state: RootState) => ({
    appliedCoupon: state.cart.coupon,
    loading: state.loading["get-coupons"],
  }));

  const [enteredCode, setEnteredCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);
  const [selectedCode, setSelectedCode] = useState<string | null>("");

  const handleCheck = () => {
    if (!enteredCode.trim()) {
      setError("Please enter a coupon code");
      return;
    }

    const matched = availableCoupons.find(
      (coupon) => coupon.code === enteredCode.trim().toUpperCase()
    );

    if (!matched) {
      setError("This coupon code is not available.");
      return;
    }

    const isExpired = new Date(matched.expiry_date) < new Date();
    if (isExpired) {
      setError("This coupon has expired!");
      return;
    }

    if (totalAmount < Number(matched.min_order_amount)) {
      setError(`Minimum order amount of ₹${matched.min_order_amount} required`);
      return;
    }

    setSelectedCode(matched.code);
    setError("");
  };

  const selectedCoupon = availableCoupons.find((c) => c.code === selectedCode);

  const formatExpiryDate = (date: string) => {
    const expiryDate = new Date(date);
    const formattedDate = expiryDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const formattedTime = expiryDate
      .toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(/am|pm/g, (match) => match.toUpperCase());

    return `${formattedDate} | ${formattedTime}`;
  };

  const now = new Date().getTime();

  const sortedCoupons = availableCoupons
    .map((coupon) => ({
      ...coupon,
      isExpired: new Date(coupon.expiry_date).getTime() < now,
    }))
    .sort((a, b) => Number(a.isExpired) - Number(b.isExpired));

  useEffect(() => {
    const selected = availableCoupons.find((c) => c.code === selectedCode);
    if (selected && new Date(selected.expiry_date) < new Date()) {
      setSelectedCode(null);
    }
  }, [selectedCode]);

  useEffect(() => {
    const cart_amount = totalAmount - 20;
    if (cart_amount < 0) return;
    setEnteredCode("");
    setError("");
    setSelectedCode("");

    dispatch(setLoading({ key: "get-coupons", value: true }));
    getCouponsForUser({ cart_amount })
      .then((res) => {
        if (res?.data) {
          setAvailableCoupons(res.data?.data?.couponForUser);
          dispatch(setAvailableCouponsForUser(res.data?.data?.couponForUser));
          const couponCode = res.data?.data?.couponForUser.find(
            (coupon: { code: string }) =>
              coupon.code.toLowerCase() === appliedCoupon?.code.toLowerCase()
          )?.code;
          setSelectedCode(couponCode);
        }
      })
      .catch((err) => {
        const errorMessage =
          err?.response?.data?.message ||
          err?.response?.data ||
          "Something went wrong.";
        toast.error(`Fetch coupons failed: ${errorMessage}`);
      })
      .finally(() => {
        dispatch(setLoading({ key: "get-coupons", value: false }));
      });
  }, [openCouponDialog]);

  return (
    <Dialog open={openCouponDialog} onClose={handleCloseCouponDialog} fullWidth>
      <h2 className="text-sm font-semibold px-6 pt-6 uppercase">
        Apply Coupon
      </h2>
      <StyledIconButton onClick={handleCloseCouponDialog}>
        <CloseIcon />
      </StyledIconButton>
      <hr className="mt-3 border-gray-300" />

      <div className="px-7">
        <form
          className="flex items-center border border-[#d4d5d9] rounded-[5px] overflow-hidden w-full mt-[16px] h-[43px]"
          onSubmit={(e) => {
            e.preventDefault();
            handleCheck();
          }}
        >
          <input
            value={enteredCode}
            onChange={(e) => {
              setEnteredCode(e.target.value);
              if (!e.target.value) {
                setError("");
              }
            }}
            placeholder="Enter coupon code"
            className="flex-1 px-[8px] py-2 text-sm border-none focus:outline-none font-[400] text-[16px]"
          />
          <button
            type="submit"
            disabled={availableCoupons.length <= 0}
            className="text-sm text-[#3880FF] px-4 py-2 font-semibold cursor-pointer"
          >
            Check
          </button>
        </form>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((index) => (
            <label
              key={index}
              className="flex items-start gap-2 animate-pulse px-7 py-3"
            >
              <div className="w-4 h-4 rounded-sm bg-gray-300 mt-1" />
              <div className="flex flex-col gap-2">
                <div className="w-24 h-5 bg-gray-300 rounded-sm" />
                <div className="w-32 h-4 bg-gray-300 rounded-sm" />
                <div className="w-48 h-3 bg-gray-300 rounded-sm" />
                <div className="w-40 h-3 bg-gray-200 rounded-sm" />
              </div>
            </label>
          ))}
        </div>
      ) : (
        <div className="max-h-[380px] h-full overflow-auto py-6 px-7">
          {sortedCoupons.map((coupon) => {
            return (
              <label
                key={coupon.code}
                className={`flex items-start gap-2 mb-4 ${
                  coupon.isExpired ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedCode === coupon.code}
                  onChange={(e) => {
                    if (!coupon.isExpired) {
                      setSelectedCode(e.target.checked ? coupon.code : "");
                    }
                  }}
                  className="cursor-pointer"
                  disabled={coupon.isExpired}
                  style={{ accentColor: "#3880FF" }}
                />
                <div>
                  <div className="text-[#3880FF] border border-dashed px-2 py-1 text-xs font-semibold inline-block mb-1">
                    {coupon.code}
                  </div>
                  <p className="text-sm font-medium text-black">
                    Save ₹{coupon.max_savings_amount}
                  </p>
                  <p className="text-xs text-gray-700 mt-1">
                    {coupon.discount_text}
                  </p>
                  <p className="text-xs text-gray-500">
                    Expires on: {formatExpiryDate(coupon.expiry_date)}
                  </p>
                  {coupon.isExpired && (
                    <p className="text-xs text-red-500 font-medium mt-1">
                      This coupon has expired
                    </p>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      )}

      <div className="shadow-inner px-4 py-3 bg-white flex justify-between items-center">
        <div>
          <div className="text-sm text-gray-600">Maximum savings:</div>
          <div className="text-sm text-gray-600">
            ₹{selectedCoupon?.max_savings_amount || 0}
          </div>
        </div>
        <div className="flex gap-2">
         
            <button
              className="bg-red-500 text-white px-4 py-2 font-semibold disabled:opacity-50 cursor-pointer"
              onClick={() => {
                onApplyCoupon(undefined, true);
                setSelectedCode(null);
                setEnteredCode("");
                setError("");
              }}
              disabled={!selectedCoupon}
            >
              REMOVE
            </button>
          <button
            className="bg-[#3880FF] text-white px-6 py-2 font-semibold disabled:opacity-50 max-w-[360px] w-full cursor-pointer"
            onClick={() => onApplyCoupon(selectedCoupon)}
          >
            APPLY
          </button>
        </div>
      </div>
    </Dialog>
  );
};

const StyledIconButton = styled(IconButton)(() => ({
  position: "absolute",
  right: 8,
  top: 8,
  color: "#282c3f",
}));
