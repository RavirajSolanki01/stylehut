import React from "react";
import {
  OutlinedInput,
  styled,
  Typography,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import { registerUser } from "../../services/userService";
import { addLoggedInUser } from "../../store/slice/users.slice";
import { setLoading } from "../../store/slice/loading.slice";
import { Offers_Banner } from "../../assets";
import { RootState } from "../../store";

type FormData = {
  email: string;
};

export const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onTouched",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((state: RootState) => state.loading["login"]);

  const onSubmit = (data: FormData) => {
    dispatch(addLoggedInUser(data));
    dispatch(setLoading({ key: "login", value: true }));
    registerUser(data)
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
      })
      .finally(() => {
        dispatch(setLoading({ key: "login", value: false }));
      });
  };

  return (
    <div className="flex flex-col h-full justify-center items-center bottom-container">
      <div className="flex flex-col dialog-container">
        <img
          src={Offers_Banner}
          alt="offers_banner"
          className=" h-full w-full max-h-[160px] max-w-[400px] offer-image-container"
        />
        <div className="h-full max-h-[350px] w-full max-w-[400px] px-[35px] bg-[#fff] login-container">
          <CustomTypography className="text-[#282c3f] text-start font-bold font-assistant text-lg py-[20px]">
            Login <span className="text-gray">or</span> Signup
          </CustomTypography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              placeholder="Email Address*"
              {...register("email")}
              error={Boolean(errors.email)}
            />

            {errors.email && (
              <FormHelperText error>{errors.email.message}</FormHelperText>
            )}

            <p className="py-[10px] text-start text-xs text-[#424553]">
              By continuing, I agree to the{" "}
              <a
                href="/termsofuse"
                className="text-[#3880FF] font-[700] text-xs hover:text-[#3880FF] cursor-pointer"
              >
                Terms of Use
              </a>{" "}
              &{" "}
              <a
                href="/privacypolicy"
                className="text-[#3880FF] font-[700] text-xs hover:text-[#3880FF] cursor-pointer"
              >
                Privacy Policy
              </a>
            </p>

            <button
              type="submit"
              className="cursor-pointer bg-[#3880FF] text-center px-[12px] w-[345px] py-[12px] text-[#fff] text-[14px] font-[700] rounded-none uppercase continue-login-button"
            >
              {isLoading ? (
                <CircularProgress size={20} style={{ color: "#fff" }} />
              ) : (
                "Continue"
              )}
            </button>
          </form>

          <p className="py-[15px] text-start text-xs text-[#424553]">
            Have trouble logging in?{" "}
            <span className="text-[#3880FF] font-[700] text-xs cursor-pointer">
              Get help
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Enter valid email address")
    .required("Email is required.")
    .test(
      "no-trim",
      "Email should not have leading or trailing spaces.",
      (value) => value === value?.trim()
    )
    .test("valid-domain", "Invalid email format", (value) =>
      value
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && /\.com$/.test(value)
        : false
    ),
});

const CustomTypography = styled(Typography)({
  fontSize: "20px",
  fontWeight: 700,
  color: "#424553",
  span: {
    fontSize: "14px",
    fontWeight: "normal",
    color: "#535766",
  },
});

const CustomInput = styled(OutlinedInput)({
  maxWidth: 345,
  width: "100%",
  height: "40px",
  borderRadius: 4,
  marginBottom: 8,
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "0px",
  },
  "& .MuiOutlinedInput-input": {
    height: "7px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderRadius: "0px",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderRadius: "0px",
  },
});
