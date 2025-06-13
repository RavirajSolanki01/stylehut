import React, { useEffect } from "react";
import { toast } from "react-toastify";
import {
  styled,
  TextField,
  FormControl,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import {
  getUserProfile,
  updateUserProfile,
} from "../../../services/userService";
import { addUserProfileData } from "../../../store/slice/users.slice";
import { setLoading } from "../../../store/slice/loading.slice";

type FormInputData = {
  full_name: string;
  email: string;
  mobile: string;
  birth_date: string;
  gender_id: number;
};

export const ProfileDetails: React.FC = () => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormInputData>({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      full_name: "",
      email: "",
      mobile: "",
      birth_date: "",
      gender_id: 0,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormInputData) => {
    const [first_name, ...rest] = data.full_name.trim().split(" ");
    const last_name = rest.join(" ");
    const updatedData = {
      first_name,
      last_name,
      email: data.email,
      mobile: data.mobile,
      birth_date: data.birth_date,
      gender_id: data.gender_id,
    };
    dispatch(setLoading({ key: "profile", value: true }));
    updateUserProfile(updatedData)
      .then((res) => {
        if (res.data.data) {
          const userData = res.data.data;
          reset(userData);
          toast.success("Profile updated successfully");
        }
      })
      .catch((err) => {
        const errorMessage =
          err?.response?.data?.message ||
          err?.response?.data ||
          err.message ||
          "Something went wrong.";

        toast.error(`Update user profile Failed: ${errorMessage}`);
      })
      .finally(() => {
        dispatch(setLoading({ key: "profile", value: false }));
      });
  };

  useEffect(() => {
    dispatch(setLoading({ key: "get-profile", value: true }));
    getUserProfile()
      .then((res) => {
        if (res) {
          const userData = res.data.data;
          const fullName = [userData.first_name, userData.last_name]
            .filter(Boolean)
            .join(" ");
          const updatedData = {
            full_name: fullName,
            email: userData.email,
            mobile: userData.mobile,
            birth_date: userData.birth_date,
            gender_id: userData.gender_id,
          };
          reset(updatedData);
          dispatch(addUserProfileData(updatedData));
          reset(updatedData);
        }
      })
      .catch((err) => {
        const errorMessage =
          err?.response?.data?.message ||
          err?.response?.data ||
          "Something went wrong.";

        toast.error(`Fetch user profile data Failed: ${errorMessage}`);
      })
      .finally(() => {
        dispatch(setLoading({ key: "get-profile", value: false }));
      });
  }, [reset]);

  return (
    <div className="max-w-[810px] w-full h-fit border border-[#d2d2d2] p-[40px] pt-0 sm:pt-[40px] mt-0 sm:mt-[20px] custom-box-shadow">
      <p className="flex justify-start text text-lg sm:text-[20px] font-[700] text-[#282C3F] pb-0 sm:pb-[10px] ml-[20px]">
        Edit Details
      </p>
      <hr className="border-t-[1px] w-full border-[#d2d2d2] mt-[10px] sm:mt-[15px] mb-[15px]" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-[20px] mx-[20px] py-[20px] justify-center">
          <Controller
            name="full_name"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                id="full_name"
                label="Full Name"
                fullWidth
                error={Boolean(errors.full_name)}
                helperText={errors.full_name?.message}
                variant="outlined"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (inputValue.length <= 30) {
                    field.onChange(inputValue);
                  }
                }}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                id="email"
                disabled
                label="Email Address*"
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                variant="outlined"
              />
            )}
          />

          <Controller
            name="mobile"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/\D/g, "");
                  if (onlyDigits.length <= 10) {
                    field.onChange(onlyDigits);
                  }
                }}
                id="mobile"
                label="Mobile Number*"
                placeholder="Enter Mobile Number"
                fullWidth
                error={Boolean(errors.mobile)}
                helperText={errors.mobile?.message}
                variant="outlined"
              />
            )}
          />

          <Controller
            name="gender_id"
            control={control}
            render={({ field }) => (
              <div className="flex justify-start">
                <ToggleButtonGroup
                  {...field}
                  exclusive
                  className="w-full border-gray-300 mb-[20px]"
                  value={field.value}
                  onChange={(_e, newValue) => {
                    if (newValue !== null) field.onChange(newValue);
                  }}
                  fullWidth
                >
                  <CustomToggleButton
                    value={1}
                    disableRipple
                    className="w-1/2 text-black font-medium py-2 focus:outline-none normal-case"
                  >
                    {field.value === 1 && <CheckIcon />} Male
                  </CustomToggleButton>

                  <CustomToggleButton
                    value={2}
                    disableRipple
                    className="w-1/2 text-black font-medium py-2 focus:outline-none normal-case"
                  >
                    {field.value === 2 && <CheckIcon />} Female
                  </CustomToggleButton>
                </ToggleButtonGroup>
              </div>
            )}
          />

          <Controller
            name="birth_date"
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                id="birth_date"
                label="Birth Date (DD/MM/YYYY)*"
                placeholder="DD/MM/YYYY"
                fullWidth
                error={Boolean(errors.birth_date)}
                helperText={errors.birth_date?.message}
                variant="outlined"
              />
            )}
          />
          <button
            type="submit"
            className="cursor-pointer bg-primary text-center px-[12px] py-[12px] text-[#fff] text-[14px] font-[700] rounded-none uppercase continue-login-button"
          >
            Save Details
          </button>
        </div>
      </form>
    </div>
  );
};

const schema = Yup.object().shape({
  full_name: Yup.string()
    .required("Full name is required.")
    .matches(
      /^[A-Za-z\s]+$/,
      "Full name should only contain letters and spaces."
    )
    .test("not-only-spaces", "Full name cannot be only spaces.", (value) => {
      return !!value && value.trim().length > 0;
    })
    .min(3, "Full name must be at least 3 characters."),

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

  mobile: Yup.string()
    .required("Mobile number is required.")
    .matches(/^\d{10}$/, "Enter a valid 10-digit mobile number.")
    .test("numeric-only", "Mobile number must contain only digits.", (value) =>
      /^\d+$/.test(value || "")
    ),

  birth_date: Yup.string()
    .required("Birth date is required.")
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Birth date must be in DD/MM/YYYY format."
    )
    .test("is-valid-date", "Enter a valid date", (value) => {
      if (!value) return false;
      const [day, month, year] = value.split("/").map(Number);
      const date = new Date(`${year}-${month}-${day}`);
      return (
        date.getFullYear() === year &&
        date.getMonth() + 1 === month &&
        date.getDate() === day
      );
    })
    .test("not-in-future", "Birth date cannot be in the future", (value) => {
      if (!value) return false;
      const [day, month, year] = value.split("/").map(Number);
      const selectedDate = new Date(`${year}-${month}-${day}`);
      const today = new Date();
      return selectedDate <= today;
    }),

  gender_id: Yup.number()
    .required("Gender is required.")
    .oneOf([1, 2], "Invalid gender selection"),
});

const CustomToggleButton = styled(ToggleButton)({
  borderRadius: 0,
  textTransform: "capitalize",
  border: "1px solid #d2d2d2",
  "&.Mui-selected": {
    color: "#3880FF",
    fontWeight: "bold",
    backgroundColor: "transparent",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "transparent",
  },
});

const CustomInput = styled(TextField)({
  width: "100%",
  height: "40px",
  borderRadius: 4,
  marginBottom: 20,
  "& .Mui-error": {
    margin: 0,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "0px",
  },
  "& .MuiOutlinedInput-input": {
    height: "12px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderRadius: "0px",
    border: "1px solid #3880FF",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderRadius: "0px",
    border: "1px solid #3880FF",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
    "&:hover fieldset": {
      border: "1px solid #3880FF",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #3880FF",
    },
  },
});

export const CustomFormControl = styled(FormControl)({
  maxWidth: 400,
  width: "100%",
  height: "40px",
  marginBottom: 8,
});

export const CustomSelect = styled(Select)({
  "& .MuiOutlinedInput-root": {
    height: "40px",
    padding: "10px 12px",
    alignItems: "center",
  },
  "& .MuiSelect-select": {
    padding: "10px 15px !important",
    display: "flex",
    alignItems: "center",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: 0,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderRadius: 0,
    border: "1px solid #3880FF",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderRadius: 0,
    border: "1px solid #3880FF",
  },
  "& .MuiSelect-placeholder": {
    color: "#999",
  },
  "& em": {
    color: "#999",
    fontStyle: "normal",
  },
});

export const CheckIcon = () => (
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
    <g
      id="active"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <path
        d="M16.7746405,8.22735801 C16.478929,7.91934842 16.0050049,7.92494859 15.716079,8.24015841 L10.3732719,14.0147382 C10.3368437,14.0543394 10.2772014,14.0547394 10.240416,14.0155382 L8.27793445,11.9086726 C7.98579433,11.5966629 7.51151306,11.5962629 7.21937294,11.9078726 C6.92687569,12.2194823 6.92687569,12.723498 7.21937294,13.0351077 L9.78399176,15.7767931 C9.92434758,15.9263977 10.1147029,16 10.3132725,16 L10.3175582,16 C10.5175563,16 10.7089831,15.9227976 10.8486246,15.7699928 L16.7867832,9.35379308 C17.0757091,9.03858326 17.070352,8.5353676 16.7746405,8.22735801"
        id="Fill-1"
        fill="#3880FF"
      ></path>
    </g>
  </svg>
);
