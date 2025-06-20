import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CircularProgress, OutlinedInput, styled, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { RootState } from "../../store";
import { resendOtp, resendOtpWithPayload, verifyOtp } from "../../services/userService";
import { addAuthToken } from "../../store/slice/auth.slice";
import { setLoading } from "../../store/slice/loading.slice";
import { Verify_Otp } from "../../assets";
import OtpTimer from "../../components/OtpTimer";

type FormData = {
  digit1: string;
  digit2: string;
  digit3: string;
  digit4: string;
};

export const VerifyOtpPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { users } = useSelector((state: RootState) => ({
    users: state.users.user,
  }));

  const [resendOtpLimitExpiry, setResendOtpLimitExpiry] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResendOtp = async () => {
    try {
      setIsLoading(true);
      const res = await resendOtpWithPayload({ email: users.email });
      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        setResendOtpLimitExpiry(err.response.data.data.resend_opt_limit);
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong, please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchResendOtpExpiryLimit = async () => {
    try {
      setIsLoading(true);
      const res = await resendOtp({ email: users.email });
      if (res.status === 200) {
        setResendOtpLimitExpiry(res.data.data.resend_otp_limit_expires_at);
      }
    } catch (err: any) {
      if (!err) return;
      const errorMessage = err?.response?.data?.message || err?.response?.data || "Something went wrong.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const { register, setValue, handleSubmit, getValues } = useForm<FormData>({
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    const otp = `${data.digit1}${data.digit2}${data.digit3}${data.digit4}`;
    const payload = {
      email: users.email,
      otp: otp,
    };
    dispatch(setLoading({ key: "verify-otp", value: true }));
    verifyOtp(payload)
      .then((res) => {
        if (res.data.message === "OTP verified successfully") {
          toast.success(res.data.message);
          dispatch(addAuthToken({ token: res.data.token }));
          navigate("/home");
        }
      })
      .catch((err) => {
        const errorMessage = err?.response?.data?.message || err?.response?.data || "Something went wrong.";

        toast.error(`Verification Failed: ${errorMessage}`);
      })
      .finally(() => dispatch(setLoading({ key: "verify-otp", value: false })));
  };

  const handleChange = (value: string, index: number) => {
    const digits = value.replace(/[^0-9]/g, "");
    if (digits.length === 4) {
      digits.split("").forEach((digit, i) => {
        const key = `digit${i + 1}` as keyof FormData;
        setValue(key, digit);
        if (inputRefs.current[i]) {
          inputRefs.current[i].value = digit;
        }
      });
      if (digits.length > 0 && inputRefs.current[digits.length - 1]) {
        inputRefs.current[digits.length - 1]!.focus();
      }
      handleSubmit(onSubmit)();
      return;
    }

    const trimmed = digits.slice(0, 1);
    const key = `digit${index + 1}` as keyof FormData;
    setValue(key, trimmed);
    if (trimmed && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    const currentValues = getValues();
    const allFilled = Object.values({
      ...currentValues,
      [key]: trimmed,
    }).every((val) => val && val.length === 1);

    if (allFilled) {
      handleSubmit(onSubmit)();
    }
  };

  const handleKeyDown = (e: any, index: number) => {
    const field = `digit${index + 1}` as keyof FormData;
    if (e.key === "Backspace") {
      const currentValue = getValues(field);
      if (!currentValue && index > 0) {
        setValue(`digit${index}` as keyof FormData, "");
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  useEffect(() => {
    fetchResendOtpExpiryLimit();
  }, []);

  return (
    <React.Fragment>
      {isLoading && (
        <div className="absolute inset-0 z-50 top-[80px] flex items-center justify-center bg-black opacity-30">
          <CircularProgress size={60} color="secondary" />
        </div>
      )}
      <div className="flex flex-col h-full justify-center items-center bottom-container">
        <div className="flex flex-col m-[30px] max-h-[497px] w-full max-w-[400px] p-[40px] bg-white overflow-y-auto">
          <div className="flex flex-col justify-start ">
            <img src={Verify_Otp} alt="offers_banner" className="h-full w-full max-h-[90px] max-w-[90px] text-start" />
            <CustomTypography className="text-start pt-[20px] font-bold font-assistant text-lg">Verify with OTP</CustomTypography>
            <p className="text-[#787878] text-justify text-xs pb-[20px]">Sent to {users.email}</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-x-[18px]">
                {[0, 1, 2, 3].map((index) => (
                  <CustomInput
                    key={index}
                    maxLength={1}
                    type="text"
                    {...register(`digit${index + 1}` as any)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value.replace(/[^0-9]/g, ""), index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    className="text-center text-2xl max-w-12 max-h-14 w-full h-full"
                  />
                ))}
              </div>

              <OtpTimer otpLimitExpiry={resendOtpLimitExpiry} handleResendOtp={handleResendOtp} />

              <p className="py-[5px] text-start text-xs text-[#424553] font-normal">
                Having trouble logging in? {""}
                <span className="text-[#3880FF] text-justify font-[700] text-xs hover:text-[#3880FF] cursor-pointer">Get Help</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const CustomTypography = styled(Typography)({
  fontSize: "20px",
  fontWeight: 700,
  color: "inherit",
});

const CustomInput = styled(OutlinedInput)({
  maxWidth: 35,
  width: "100%",
  height: "40px",
  borderRadius: 4,
  marginBottom: 15,
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "0px",
    border: "none",
  },
  "& .MuiOutlinedInput-input": {
    height: "7px",
    padding: "16px 12px",
    border: "1px solid #d4d5d9",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderRadius: "0px",
    border: "none",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderRadius: "0px",
    border: "none",
  },
  "& .MuiOutlinedInput-root": {
    border: "none",
  },
});
