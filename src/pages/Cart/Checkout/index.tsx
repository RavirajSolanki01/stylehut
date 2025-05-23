import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type Props = {
  totalPrice: string;
};

const CheckoutScreen: React.FC<Props> = ({ totalPrice }) => {
  const navigate = useNavigate();

  const getMethodOptions = () => {
    const all = {
      upi: true,
      card: true,
      netbanking: true,
      wallet: true,
      emi: true,
      cod: true,
    };

    const methodOptions: any = { ...all };

    return methodOptions;
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

  const handlePayment = async () => {
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
      handler: (response: any) => {
        toast.success(
          `Payment successful. Payment ID: ${response.razorpay_payment_id}`
        );
        navigate("/home");
      },
      theme: { color: "#3880ff" },
      method: getMethodOptions(),
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    handlePayment();
  });

  return <div>Checkout Page</div>;
};

export default CheckoutScreen;
