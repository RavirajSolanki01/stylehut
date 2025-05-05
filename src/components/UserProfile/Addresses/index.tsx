import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Checkbox,
  Chip,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
  TextField,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";
import { pink } from "@mui/material/colors";
import { updatedAddresses } from "../../../utils/constants";

type AddressCardProps = {
  address: FormAddressData;
  isDefault: boolean;
  selectedIndex: number;
  onMakeDefault: () => void;
  isSelected: boolean;
  onClick: () => void;
  onEdit: () => void;
  handleDeleteClick: (index: number) => void;
};

type FormAddressData = {
  name: string;
  mobile: string;
  address: string;
  cityOrDisctrict: string;
  pincode: string;
  state: string;
  town: string;
  typeOfAddress: string;
  isOfficeOpenOnSaturday: boolean;
  isOfficeOpenOnSunday: boolean;
  makeThisAsDefaultAddress: boolean;
};

export const Addresses: React.FC = () => {
  const [defaultIndex, setDefaultIndex] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const [open, setOpen] = React.useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormAddressData>({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      mobile: "",
      address: "",
      cityOrDisctrict: "",
      pincode: "",
      state: "",
      town: "",
      typeOfAddress: "",
      isOfficeOpenOnSaturday: false,
      isOfficeOpenOnSunday: false,
      makeThisAsDefaultAddress: false,
    },
    resolver: yupResolver(schema),
  });

  const typeOfAddress = watch("typeOfAddress");

  const onSubmit = (data: FormAddressData) => {
    if (editIndex !== null) {
      updatedAddresses[editIndex] = data;
    } else {
      updatedAddresses.push(data);
    }

    setOpen(false);
    reset();
    setEditIndex(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)();
  };

  const handleClickOpen = (index?: number | undefined) => {
    if (index !== undefined) {
      const addressToEdit = updatedAddresses[index];
      reset({
        ...addressToEdit,
      });
      setEditIndex(index);
    } else {
      reset({
        name: "",
        mobile: "",
        pincode: "",
        state: "",
        cityOrDisctrict: "",
        address: "",
        isOfficeOpenOnSaturday: false,
        isOfficeOpenOnSunday: false,
        makeThisAsDefaultAddress: false,
        typeOfAddress: "Home",
      });
      setEditIndex(null);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const handleConfirmDelete = () => {
    if (selectedIndex !== undefined) {
      updatedAddresses.splice(selectedIndex, 1);
      setSelectedIndex(0);
      setOpenConfirmDialog(false);
      reset(...updatedAddresses);
    }
  };

  const handleDeleteClick = (index: number) => {
    setSelectedIndex(index);
    setOpenConfirmDialog(true);
  };

  const pincode = useWatch({ control, name: "pincode" });

  useEffect(() => {
    const fetchLocationDetails = async () => {
      if (pincode?.length === 6) {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        const data = await response.json();
        const postOffice = data[0]?.PostOffice?.[0];

        if (postOffice) {
          setValue("state", postOffice.State);
          setValue("cityOrDisctrict", postOffice.District);
        }
      }
    };
    fetchLocationDetails();
  }, [pincode, setValue]);

  return (
    <div className="py-2 pr-3 max-w-[810px] w-full responsive-address-page">
      <div className="flex justify-between items-center">
        <p className="text-[16px] font-bold">Saved Addresses</p>
        <button
          onClick={() => handleClickOpen(undefined)}
          className="cursor-pointer bg-transparent border border-[#d2d2d2] text-[#ff3f6c] text-center 
              max-w-[215px] w-full py-[10px] my-[8px] text-[14px] font-[700] rounded-[5px] uppercase 
             hover:font-[700] transition-colors duration-300
              hover:border-[#ff3f6c]  focus:outline-none add-address-new-button"
        >
          <AddIcon className="mr-1" /> Add New Address
        </button>
        <button
          onClick={() => handleClickOpen(undefined)}
          className="cursor-pointer bg-transparent border border-[#d2d2d2] text-[#ff3f6c] text-center 
              max-w-[215px] w-full py-[10px] my-[8px] text-[14px] font-[700] rounded-[5px] uppercase 
             hover:font-[700] transition-colors duration-300
              hover:border-[#ff3f6c]  focus:outline-none add-address-button"
        >
          <AddIcon className="mr-1" /> Add
        </button>
      </div>

      <div className="mt-3 mb-6">
        <h2 className="font-bold text-xs mb-3">DEFAULT ADDRESS</h2>
        <AddressCard
          address={updatedAddresses[defaultIndex]}
          isDefault={true}
          onEdit={() => handleClickOpen(defaultIndex)}
          onClick={() => setSelectedIndex(defaultIndex)}
          onMakeDefault={() => {}}
          isSelected={selectedIndex === defaultIndex}
          handleDeleteClick={handleDeleteClick}
          selectedIndex={selectedIndex}
        />
      </div>

      <div>
        <h2 className="font-bold text-xs mb-3">OTHER ADDRESSES</h2>
        {updatedAddresses.map((addr, idx) => {
          if (idx === defaultIndex) return null;
          return (
            <AddressCard
              key={idx}
              address={addr}
              isDefault={false}
              isSelected={selectedIndex === idx}
              onClick={() => setSelectedIndex(idx)}
              onEdit={() => handleClickOpen(idx)}
              handleDeleteClick={handleDeleteClick}
              selectedIndex={selectedIndex}
              onMakeDefault={() => {
                setDefaultIndex(idx);
                setSelectedIndex(idx);
              }}
            />
          );
        })}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <div>
          <div className="font-semibold text-[16px] p-6 uppercase border-b-[#d4d5d9] text-[#5c5e69]">
            {editIndex !== null ? "Edit Address" : "Add New Address"}
          </div>

          <div className="bg-[#F5F5F6] h-4"> </div>
          <div>
            <form className="space-y-1" onSubmit={handleFormSubmit}>
              <div className="flex flex-col gap-[10px] justify-center bg-[#F5F5F6]">
                <div className="bg-white mb-1 p-6 pb-2">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        id="full_name"
                        label="Name"
                        fullWidth
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
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
                        id="mobile"
                        label="Mobile"
                        onChange={(e) => {
                          const onlyDigits = e.target.value.replace(/\D/g, "");
                          if (onlyDigits.length <= 10) {
                            field.onChange(onlyDigits);
                          }
                        }}
                        fullWidth
                        error={Boolean(errors.mobile)}
                        helperText={errors.mobile?.message}
                        variant="outlined"
                      />
                    )}
                  />
                </div>
                <div className="bg-white mb-1.5 px-6 pt-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pincode-container">
                    <Controller
                      name="pincode"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          id="pincode"
                          label="Pincode"
                          fullWidth
                          error={Boolean(errors.pincode)}
                          helperText={errors.pincode?.message}
                          variant="outlined"
                        />
                      )}
                    />

                    <Controller
                      name="state"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          id="state"
                          label="State"
                          fullWidth
                          error={Boolean(errors.state)}
                          helperText={errors.state?.message}
                          variant="outlined"
                          disabled={true}
                        />
                      )}
                    />
                  </div>

                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        id="address"
                        label="Address (House No, Building , Street, Area)"
                        fullWidth
                        error={Boolean(errors.address)}
                        helperText={errors.address?.message}
                        variant="outlined"
                      />
                    )}
                  />
                  <Controller
                    name="town"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        id="town"
                        label="Locality / Town"
                        fullWidth
                        error={Boolean(errors.town)}
                        helperText={errors.town?.message}
                        variant="outlined"
                      />
                    )}
                  />
                  <Controller
                    name="cityOrDisctrict"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        id="cityOrDisctrict"
                        label="City / District"
                        fullWidth
                        error={Boolean(errors.cityOrDisctrict)}
                        helperText={errors.cityOrDisctrict?.message}
                        variant="outlined"
                        disabled={true}
                      />
                    )}
                  />
                </div>

                <div className="bg-white mb-4 p-6 pb-3">
                  <Controller
                    name="typeOfAddress"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormControl>
                        <label
                          className="text-[#535766]"
                          id="address-type-label"
                        >
                          Type of Address
                        </label>
                        <CustomRadioGroup
                          aria-labelledby="address-type-label"
                          {...field}
                          row
                          sx={{ gap: 10, marginTop: "5px" }}
                        >
                          <CustomFormControlLabel
                            value="Home"
                            control={<CustomRadioButton />}
                            label="Home"
                          />
                          <CustomFormControlLabel
                            value="Office"
                            control={<CustomRadioButton />}
                            label="Office"
                          />
                        </CustomRadioGroup>
                      </FormControl>
                    )}
                  />

                  {typeOfAddress === "Office" && (
                    <div className="mt-3 flex flex-col gap-1">
                      <label className="text-[#535766]">
                        Is your office open on weekends?
                      </label>
                      <Controller
                        name="isOfficeOpenOnSaturday"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                          <CustomFormControlLabel
                            control={
                              <CustomCheckbox
                                {...field}
                                checked={field.value}
                              />
                            }
                            label="Opens on Saturday"
                          />
                        )}
                      />
                      <Controller
                        name="isOfficeOpenOnSunday"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                          <CustomFormControlLabel
                            control={
                              <CustomCheckbox
                                {...field}
                                checked={field.value}
                              />
                            }
                            label="Opens on Sunday"
                          />
                        )}
                      />
                    </div>
                  )}

                  <hr className="my-2 border-gray-300" />

                  <Controller
                    name="makeThisAsDefaultAddress"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <CustomFormControlLabel
                        control={
                          <CustomCheckbox {...field} checked={field.value} />
                        }
                        label="Make this as my default address"
                      />
                    )}
                  />
                </div>

                <div className="bg-white">
                  <div className="flex items-center text-sm font-semibold my-3">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 text-[#636363] p-1 focus:outline-none cursor-pointer uppercase"
                    >
                      Cancel
                    </button>
                    <div className="border-l border-gray-300 h-5 mx-2" />
                    <button
                      type="submit"
                      className="flex-1 uppercase text-[#ff3f6c] p-1 focus:outline-none cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <div className="">
          <h2
            id="confirm-dialog-title"
            className="text-lg font-semibold px-6 pt-6"
          >
            Delete Confirmation
          </h2>
          <p
            id="confirm-dialog-description"
            className="text-sm text-gray-600 mt-2  px-6"
          >
            Are you sure you want to delete this address?
          </p>

          <hr className="mt-10 border-gray-300" />

          <div className="flex items-center text-sm font-semibold my-2 ">
            <button
              type="button"
              onClick={() => setOpenConfirmDialog(false)}
              className="flex-1 text-[#636363] p-1 focus:outline-none cursor-pointer uppercase"
            >
              Cancel
            </button>
            <div className="border-l border-gray-300 h-5 mx-2" />
            <button
              onClick={() => handleConfirmDelete()}
              className="flex-1 uppercase text-[#ff3f6c] p-1 focus:outline-none cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isDefault,
  onMakeDefault,
  isSelected,
  onClick,
  onEdit,
  handleDeleteClick,
  selectedIndex,
}) => {
  const {
    name,
    address: addressLine,
    mobile,
    cityOrDisctrict,
    pincode,
    state,
    typeOfAddress,
  } = address;

  return (
    <div
      onClick={onClick}
      className="rounded shadow-sm mb-4 transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] cursor-pointer"
    >
      <div className="flex justify-between items-start p-4">
        <div>
          <p className="font-semibold text-[#696b79] mb-2">{name}</p>
          <p className="text-sm text-[#696b79] font-normal">{addressLine}</p>
          <p className="text-sm text-[#696b79] font-normal">
            {cityOrDisctrict} - {pincode}
          </p>
          <p className="text-sm text-[#696b79] font-normal">{state}</p>
          {mobile && (
            <p className="text-sm text-[#696b79] font-normal mt-2">
              <span className="text-[#696b79]">Mobile:</span> {mobile}
            </p>
          )}
          {!isDefault && isSelected && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMakeDefault();
              }}
              className="mt-2 text-[#ff3f6c] text-sm font-semibold focus:outline-none cursor-pointer"
            >
              Make This Default
            </button>
          )}
        </div>
        <Chip
          label={typeOfAddress}
          size="small"
          sx={{
            backgroundColor: "#f5f5f5",
            fontWeight: 500,
            color: "#696b79",
          }}
        />
      </div>
      {isSelected && (
        <>
          <Divider className="my-4 w-full" />
          <div className="flex items-center text-sm font-semibold p-2">
            <button
              onClick={onEdit}
              className="flex-1 text-[#ff3f6c] p-1 focus:outline-none"
            >
              EDIT
            </button>
            <div className="border-l border-gray-300 h-5 mx-2" />
            <button
              onClick={() => handleDeleteClick(selectedIndex)}
              className="flex-1 text-[#ff3f6c] p-1 focus:outline-none"
            >
              REMOVE
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required.")
    .matches(/^[A-Za-z\s]+$/, "Name should only contain letters and spaces.")
    .min(3, "Name must be at least 3 characters."),

  mobile: Yup.string()
    .required("Mobile number is required.")
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number."),

  address: Yup.string().required("Address is required."),

  cityOrDisctrict: Yup.string()
    .required("City or District is required.")
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed."),

  pincode: Yup.string()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
    .test(
      "is-valid-pincode",
      "Invalid pincode, please enter a valid one",
      async function (value) {
        if (!value || value.length !== 6) return false;
        try {
          const response = await fetch(
            `https://api.postalpincode.in/pincode/${value}`
          );
          const data = await response.json();
          const postOffice = data[0]?.PostOffice?.[0];
          return !!postOffice;
        } catch (e) {
          return false;
        }
      }
    ),

  state: Yup.string()
    .required("State is required.")
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed."),

  town: Yup.string()
    .required("Town is required.")
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed."),

  typeOfAddress: Yup.string().required("Please select the type of address."),
  isOfficeOpenOnSaturday: Yup.boolean().default(false),
  isOfficeOpenOnSunday: Yup.boolean().default(false),
  makeThisAsDefaultAddress: Yup.boolean().default(false),
});

const CustomInput = styled(TextField)({
  width: "100%",
  height: "40px",
  borderRadius: 4,
  marginBottom: "35px",
  "& .Mui-error": {
    margin: 0,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "0px",
  },
  "& .MuiOutlinedInput-input": {
    height: "15px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderRadius: "0px",
    border: "1px solid #ff3f6c",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderRadius: "0px",
    border: "1px solid #ff3f6c",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
    "&:hover fieldset": {
      border: "1px solid #ff3f6c",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #ff3f6c",
    },
  },
});

const CustomRadioButton = styled(Radio)({
  "&.Mui-checked": {
    color: pink[600],
  },
});

const CustomRadioGroup = styled(RadioGroup)({
  "@media (max-width: 350px)": {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
});

const CustomFormControlLabel = styled(FormControlLabel)({
  color: "#535766",
  fontWeight: "normal",
});

const CustomCheckbox = styled(Checkbox)({
  color: "gray",
  "&.Mui-checked": {
    color: pink[600],
  },
});
