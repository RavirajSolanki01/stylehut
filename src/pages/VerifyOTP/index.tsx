import React, { useEffect, useRef, useState } from "react";
import { Header } from "../../components/Header";
import { Verify_Otp } from "../../assets";
import { OutlinedInput, styled, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { registerUser, verifyOtp } from "../../services/userService";
import { toast } from "react-toastify";
import { addAuthToken } from "../../store/slice/auth.slice";
import { useNavigate } from "react-router-dom";

type FormData = {
  digit1: string;
  digit2: string;
  digit3: string;
  digit4: string;
};

export const VerifyOtpPage: React.FC = () => {
  const { users } = useSelector((state: RootState) => ({
    users: state.users.user,
  }));

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [timer, setTimer] = useState<number>(30);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);

  useEffect(() => {
    let countdown: number | null = null;

    if (isResendDisabled && timer > 0) {
      countdown = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
    }

    return () => {
      if (countdown) window.clearInterval(countdown);
    };
  }, [timer, isResendDisabled]);

  const handleResendOtp = () => {
    registerUser({ email: users.email })
      .then((res) => {
        if (res.status === 200 && res.data.message === "OTP sent to email.") {
          toast.success(res.data.message);
          navigate("/verify-otp");
        }
      })
      .catch((err) => {
        const errorMessage =
          err?.response?.data?.message ||
          err?.response?.data ||
          "Something went wrong.";

        toast.error(`Login Failed: ${errorMessage}`);
      });

    setTimer(30);
    setIsResendDisabled(true);
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
    verifyOtp(payload)
      .then((res) => {
        if (res.data.message === "OTP verified successfully") {
          toast.success(res.data.message);
          dispatch(addAuthToken({ token: res.data.token }));
          navigate("/home");
        }
      })
      .catch((err) => {
        const errorMessage =
          err?.response?.data?.message ||
          err?.response?.data ||
          "Something went wrong.";

        toast.error(`Verification Failed: ${errorMessage}`);
      });
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

  return (
    <React.Fragment>
      <Header />
      <div className="bg-gradient-to-br from-[#feedf6] mt-[80px] to-[#fcf0e2] min-h-[820px] flex justify-center items-center bottom-container">
        <div className="flex flex-col m-[30px] h-full max-h-[497px] mx-auto w-full max-w-[400px] p-[60px] bg-[#fff] md:bg-amber-950  responsive-verify-otp-component">
          <div className="flex flex-col justify-start ">
            <img
              src={Verify_Otp}
              alt="offers_banner"
              className="h-full w-full max-h-[90px] max-w-[90px] text-start"
            />
            <CustomTypography className="text-start pt-[20px] font-bold font-assistant text-lg">
              Verify with OTP
            </CustomTypography>
            <p className="text-[#787878] text-justify text-[12px] pb-[20px]">
              Sent to {users.email}
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-x-[18px]">
                {[0, 1, 2, 3].map((index) => (
                  <CustomInput
                    key={index}
                    maxLength={1}
                    type="text"
                    {...register(`digit${index + 1}` as any)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e.target.value.replace(/[^0-9]/g, ""), index)
                    }
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    className="text-center text-2xl max-w-12 max-h-14 w-full h-full"
                  />
                ))}
              </div>
              {!isResendDisabled ? (
                <p
                  onClick={handleResendOtp}
                  className="text-[#fb527b] text-justify font-[700] text-[12px] hover:text-[#fb527b] cursor-pointer uppercase"
                >
                  Resend OTP
                </p>
              ) : (
                <p
                  className={`text-[#787878] text-justify font-[500] text-[12px] cursor-pointer opacity-70`}
                  onClick={!isResendDisabled ? handleResendOtp : undefined}
                >
                  {`Resend OTP in 00:${timer.toString().padStart(2, "0")}`}
                </p>
              )}
              <p className="py-[5px] text-start text-[12px] text-[#424553] font-normal">
                Having trouble logging in? {""}
                <span className="text-[#fb527b] text-justify font-[700] text-[12px] hover:text-[#fb527b] cursor-pointer">
                  Get Help
                </span>
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
