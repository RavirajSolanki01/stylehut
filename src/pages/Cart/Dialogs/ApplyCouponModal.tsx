import React, { useEffect, useState } from "react";
import { Dialog, styled, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { setLoading } from "../../../store/slice/loading.slice";
import { useDispatch, useSelector } from "react-redux";
import { getCouponsForUser } from "../../../services/cartService";
import { Coupon } from "../../../utils/types";
import { RootState } from "../../../store";

interface ApplyCouponModalProps {
  openCouponDialog: boolean;
  totalAmount: number;
  handleCloseCouponDialog: () => void;
  onApplyCoupon: (coupon: Coupon | null) => void;
}

export const ApplyCouponModal: React.FC<ApplyCouponModalProps> = ({
  openCouponDialog,
  totalAmount,
  onApplyCoupon,
  handleCloseCouponDialog,
}) => {
  const { appliedCoupon } = useSelector((state: RootState) => ({
    appliedCoupon: state.cart.coupon,
  }));
  const [enteredCode, setEnteredCode] = useState("");
  const [selectedCode, setSelectedCode] = useState<string | null>(appliedCoupon?.code as string);
  const [error, setError] = useState("");
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);

  const dispatch = useDispatch();

  const handleCheck = () => {
    const matched = availableCoupons.find(
      (coupon) => coupon.code === enteredCode.trim().toUpperCase()
    );

    if (matched) {
      const isExpired = new Date(matched.expiry_date) < new Date();
      if (isExpired) {
        setError("This coupon has expired");
        setSelectedCode(null);
      } else {
        setSelectedCode(matched.code);
        setError("");
      }
    } else {
      setError("Invalid coupon code");
      setSelectedCode(null);
    }
  };

  const selectedCoupon = availableCoupons.find((c) => c.code === selectedCode);

  useEffect(() => {
    const selected = availableCoupons.find((c) => c.code === selectedCode);
    if (selected && new Date(selected.expiry_date) < new Date()) {
      setSelectedCode(null);
    }
  }, [selectedCode]);

  useEffect(() => {
    const cart_amount = totalAmount - 20;
    if (cart_amount < 0) return;

    dispatch(setLoading({ key: "get-coupons", value: true }));
    getCouponsForUser({ cart_amount })
      .then((res) => {
        if (res?.data) {
          setAvailableCoupons(res.data?.data?.couponForUser);
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
  }, [totalAmount]);

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
            onChange={(e) => setEnteredCode(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 px-[8px] py-2 text-sm border-none focus:outline-none font-[400] text-[16px]"
          />
          <button
            type="submit"
            className="text-sm text-[#ff3f6c] px-4 py-2 font-semibold cursor-pointer"
          >
            Check
          </button>
        </form>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

      <div className="py-6 px-7">
        {availableCoupons.map((coupon) => {
          const isExpired = new Date(coupon.expiry_date) < new Date();
          return (
            <label
              key={coupon.code}
              className={`flex items-start gap-2 mb-4 ${
                isExpired ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selectedCode === coupon.code}
                onChange={(e) => {
                  if (!isExpired) {
                    setSelectedCode(e.target.checked ? coupon.code : null);
                  }
                }}
                className="cursor-pointer"
                disabled={isExpired}
                style={{ accentColor: "#ff3f6c" }}
              />
              <div>
                <div className="text-[#ff3f6c] border border-dashed px-2 py-1 text-xs font-semibold inline-block mb-1">
                  {coupon.code}
                </div>
                <p className="text-sm font-medium text-black">
                  Save ₹{coupon.max_savings_amount}
                </p>
                <p className="text-xs text-gray-700 mt-1">
                  {coupon.discount_text}
                </p>
                <p className="text-xs text-gray-500">
                  Expires on:{" "}
                  {new Date(coupon.expiry_date).toLocaleDateString()}
                </p>
                {isExpired && (
                  <p className="text-xs text-red-500 font-medium mt-1">
                    This coupon has expired
                  </p>
                )}
              </div>
            </label>
          );
        })}
      </div>

      <div className="shadow-inner px-4 py-3 bg-white flex justify-between items-center">
        <div>
          <div className="text-sm text-gray-600">Maximum savings:</div>
          <div className="text-sm text-gray-600">
            ₹{selectedCoupon?.max_savings_amount || 0}
          </div>
        </div>
        <button
          className="bg-[#ff3f6c] text-white px-6 py-2 font-semibold disabled:opacity-50 max-w-[360px] w-full cursor-pointer"
          onClick={() => onApplyCoupon(selectedCoupon ?? null)}
        >
          APPLY
        </button>
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
