import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { CustomRadioButton } from "../../../components/UserProfile/Addresses";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type Props = {
  totalPrice: string;
  placeOrder: (method: string) => void;
};

const CheckoutScreen: React.FC<Props> = ({ totalPrice, placeOrder }) => {
  const [paymentMethod, setPaymentMethod] =
    useState<string>("CASH_ON_DELIVERY");

  const getMethodOptions = () => {
    return {
      upi: true,
      card: true,
      netbanking: true,
      wallet: true,
    };
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      toast.error("Razorpay SDK failed to load.");
      return;
    }

    const options: any = {
      key: "rzp_test_1DP5mmOlF5G5ag",
      amount: parseInt(totalPrice) * 100,
      currency: "INR",
      name: "Stylehut",
      description: "Stylehut Shopping",
      image: "/logo.png",
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      handler: (_response: any) => {
        console.log(_response);
        placeOrder("ONLINE");
      },
      theme: { color: "#3880ff" },
      method: getMethodOptions(),
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = () => {
    if (paymentMethod === "CASH_ON_DELIVERY") {
      placeOrder("CASH_ON_DELIVERY");
    } else {
      handleRazorpayPayment();
    }
  };

  const handlePaymentMethodChange = (value: "CASH_ON_DELIVERY" | "ONLINE") => {
    setPaymentMethod(value);
  };

  return (
    <Box className="p-4 flex flex-col md:flex-row gap-6">
      <Box className="flex-1">
        <Paper className="p-4 !border-none !shadow-none">
          <Box className="mb-4 border border-gray-200 rounded p-4">
            <Box
              sx={{
                width: "80%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CustomRadioButton
                size="small"
                value={"CASH_ON_DELIVERY"}
                sx={{
                  fontFamily: "Assistant,Helvetica,Arial,sans-serif !important",
                }}
                checked={paymentMethod === "CASH_ON_DELIVERY"}
                onChange={(event) =>
                  handlePaymentMethodChange(
                    event.target.value as "CASH_ON_DELIVERY" | "ONLINE"
                  )
                }
              />
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px !important",
                    color: "#000",
                  }}
                >
                  Cash on Delivery (Cash/UPI)
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "80%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CustomRadioButton
                size="small"
                value={"ONLINE"}
                sx={{
                  fontFamily: "Assistant,Helvetica,Arial,sans-serif !important",
                }}
                checked={paymentMethod === "ONLINE"}
                onChange={(event) =>
                  handlePaymentMethodChange(
                    event.target.value as "CASH_ON_DELIVERY" | "ONLINE"
                  )
                }
              />
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px !important",
                    color: "#000",
                  }}
                >
                  Online Payment
                </Typography>
              </Box>
            </Box>
          </Box>
          <button
            onClick={handleSubmit}
            className="w-full max-w-sm mt-4 cursor-pointer rounded-[4px] bg-[#3880FF] text-white text-xs sm:text-sm font-semibold py-2 disabled:bg-[#ffeaef]"
          >
            {paymentMethod === "CASH_ON_DELIVERY" && "Place Order"}
            {paymentMethod === "ONLINE" && "Pay Now"}
          </button>
        </Paper>
      </Box>
    </Box>
  );
};

export default CheckoutScreen;
