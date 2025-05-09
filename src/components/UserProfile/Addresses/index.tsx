import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Checkbox,
  CheckboxProps,
  Chip,
  CircularProgress,
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
import { AddressCardProps, FormAddressData } from "../../../utils/types";
import {
  deleteAddress,
  getAddressById,
  getAddresses,
  postAddress,
  updateAddress,
} from "../../../services/userAddresses";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../store/slice/loading.slice";
import { toast } from "react-toastify";
import { JSX } from "react/jsx-runtime";
import { RootState } from "../../../store";

export const Addresses: React.FC = () => {
  const [defaultIndex, setDefaultIndex] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [addresses, setAddresses] = useState<FormAddressData[]>([]);
  const [defaultAddress, setDefaultAddress] = useState<FormAddressData | null>(
    null
  );

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loading["address"]);

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
      full_name: "",
      phone: "",
      address_line1: "",
      city: "",
      postal_code: "",
      state: "",
      address_line2: "",
      address_type: "",
      is_open_saturday: false,
      is_open_sunday: false,
      is_default: false,
    },
    resolver: yupResolver(schema),
  });

  const typeOfAddress = watch("address_type");

  const onSubmit = (data: FormAddressData) => {
    if (editIndex !== null) {
      handleUpdateAddress(data);
    } else {
      createAddresses(data);
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
      setEditIndex(index);
      handleGetAddressById(index);
    } else {
      reset({
        full_name: "",
        phone: "",
        postal_code: "",
        state: "",
        city: "",
        address_line1: "",
        address_line2: "",
        is_open_saturday: false,
        is_open_sunday: false,
        is_default: false,
        address_type: "",
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
      handleRemoveAddress(selectedIndex);
    }
  };

  const handleDeleteClick = (index: number) => {
    setSelectedIndex(index);
    setOpenConfirmDialog(true);
  };

  const pincode = useWatch({ control, name: "postal_code" });

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
          setValue("city", postOffice.District);
        }
      }
    };
    fetchLocationDetails();
  }, [pincode, setValue]);

  const getErrorMessage = (err: any) =>
    err?.response?.data?.message ||
    err?.response?.data ||
    "Something went wrong.";

  const executeRequest = async (
    apiFn: () => Promise<any>,
    {
      onSuccess,
      errorPrefix,
      openOnError = false,
    }: {
      onSuccess?: (res: any) => void;
      errorPrefix: string;
      openOnError?: boolean;
    }
  ) => {
    dispatch(setLoading({ key: "address", value: true }));
    try {
      const res = await apiFn();
      onSuccess?.(res);
    } catch (err) {
      toast.error(`${errorPrefix}: ${getErrorMessage(err)}`);
      if (openOnError) setOpen(true);
    } finally {
      dispatch(setLoading({ key: "address", value: false }));
    }
  };

  const fetchAddresses = () =>
    executeRequest(() => getAddresses({ page: 1, pageSize: 100 }), {
      errorPrefix: "Fetch addresses failed",
      onSuccess: (res) => {
        const items = res?.data?.data?.items || [];
        const defaultAddress =
          items.find((a: FormAddressData) => a.is_default) || {};
        setAddresses(items);
        setDefaultAddress(defaultAddress);
        setDefaultIndex(defaultAddress.id);
        setSelectedIndex(defaultAddress.id);
      },
    });

  const createAddresses = (data: FormAddressData) =>
    executeRequest(() => postAddress(data), {
      errorPrefix: "Add address failed",
      openOnError: true,
      onSuccess: () => {
        toast.success("Address added successfully.");
        fetchAddresses();
      },
    });

  const handleUpdateAddress = (data: FormAddressData) =>
    executeRequest(
      () => updateAddress({ address_id: selectedIndex as number, data }),
      {
        errorPrefix: "Update address failed",
        openOnError: true,
        onSuccess: () => {
          toast.success("Address updated successfully.");
          fetchAddresses();
        },
      }
    );

  const handleRemoveAddress = (id: number) =>
    executeRequest(() => deleteAddress({ address_id: id }), {
      errorPrefix: "Delete address failed",
      onSuccess: (res) => {
        if (res.status === 200) {
          toast.success("Address removed successfully.");
          setOpenConfirmDialog(false);
          fetchAddresses();
        }
      },
    });

  const handleGetAddressById = (id: number) =>
    executeRequest(() => getAddressById({ address_id: id }), {
      errorPrefix: "Get address failed",
      onSuccess: (res) => {
        if (res.status === 200) reset(res.data.data);
      },
    });

  const handleMarkAsDefault = (id: number) => {
    setSelectedIndex(id);
    const updated = { ...addresses[id], is_default: true };
    handleUpdateAddress(updated);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

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

      {addresses.length > 0 ? (
        <div>
          <div className="mt-3 mb-6">
            <h2 className="font-bold text-xs mb-3">DEFAULT ADDRESS</h2>
            {defaultAddress?.id && (
              <AddressCard
                address={defaultAddress as FormAddressData}
                isDefault={true}
                onEdit={() => handleClickOpen(defaultIndex)}
                onClick={() => setSelectedIndex(defaultIndex)}
                onMakeDefault={() => {}}
                isSelected={selectedIndex === defaultIndex}
                handleDeleteClick={handleDeleteClick}
                selectedIndex={selectedIndex}
              />
            )}
          </div>

          <div>
            <h2 className="font-bold text-xs mb-3">OTHER ADDRESSES</h2>
            {addresses.map((addr, idx) => {
              if (addr.id === defaultIndex) return null;
              return (
                <AddressCard
                  key={idx}
                  address={addr}
                  isDefault={false}
                  isSelected={selectedIndex === addr.id}
                  onClick={() => setSelectedIndex(addr.id as number)}
                  onEdit={() => handleClickOpen(addr.id)}
                  handleDeleteClick={handleDeleteClick}
                  selectedIndex={selectedIndex}
                  onMakeDefault={() => handleMarkAsDefault(addr.id as number)}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="rounded text-center text-sm text-gray-500 p-10 shadow-sm transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] my-10">
          You haven't added any addresses yet. Please add one to proceed with
          orders.
        </div>
      )}
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
                    name="full_name"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        id="full_name"
                        label="Name"
                        fullWidth
                        error={Boolean(errors.full_name)}
                        helperText={errors.full_name?.message}
                        variant="outlined"
                      />
                    )}
                  />

                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        id="phone"
                        label="Mobile"
                        onChange={(e) => {
                          const onlyDigits = e.target.value.replace(/\D/g, "");
                          if (onlyDigits.length <= 10) {
                            field.onChange(onlyDigits);
                          }
                        }}
                        fullWidth
                        error={Boolean(errors.phone)}
                        helperText={errors.phone?.message}
                        variant="outlined"
                      />
                    )}
                  />
                </div>
                <div className="bg-white mb-1.5 px-6 pt-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pincode-container">
                    <Controller
                      name="postal_code"
                      control={control}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          id="postal_code"
                          label="Pincode"
                          fullWidth
                          error={Boolean(errors.postal_code)}
                          helperText={errors.postal_code?.message}
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
                    name="address_line1"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        id="address_line1"
                        label="Address (House No, Building , Street, Area)"
                        fullWidth
                        error={Boolean(errors.address_line1)}
                        helperText={errors.address_line1?.message}
                        variant="outlined"
                      />
                    )}
                  />
                  <Controller
                    name="address_line2"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        id="address_line2"
                        label="Locality / Town"
                        fullWidth
                        error={Boolean(errors.address_line2)}
                        helperText={errors.address_line2?.message}
                        variant="outlined"
                      />
                    )}
                  />
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        id="city"
                        label="City / District"
                        fullWidth
                        error={Boolean(errors.city)}
                        helperText={errors.city?.message}
                        variant="outlined"
                        disabled={true}
                      />
                    )}
                  />
                </div>

                <div className="bg-white mb-4 p-6 pb-3">
                  <Controller
                    name="address_type"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <FormControl>
                        <label className="text-[#535766]" id="address_type">
                          Type of Address
                        </label>
                        <CustomRadioGroup
                          aria-labelledby="address_type"
                          row
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                          sx={{ gap: 10, marginTop: "5px" }}
                        >
                          <CustomFormControlLabel
                            value="HOME"
                            control={<CustomRadioButton />}
                            label="Home"
                          />
                          <CustomFormControlLabel
                            value="OFFICE"
                            control={<CustomRadioButton />}
                            label="Office"
                          />
                        </CustomRadioGroup>
                      </FormControl>
                    )}
                  />

                  {typeOfAddress?.toLowerCase() === "office" && (
                    <div className="mt-3 flex flex-col gap-1">
                      <label className="text-[#535766]">
                        Is your office open on weekends?
                      </label>
                      <Controller
                        name="is_open_saturday"
                        control={control}
                        defaultValue={false}
                        render={({ field: { value, onChange } }) => (
                          <CustomFormControlLabel
                            control={
                              <CustomCheckboxComponent
                                checked={value}
                                onChange={(e) => {
                                  onChange(e.target.checked);
                                }}
                              />
                            }
                            label="Opens on Saturday"
                          />
                        )}
                      />
                      <Controller
                        name="is_open_sunday"
                        control={control}
                        defaultValue={false}
                        render={({ field: { value, onChange } }) => (
                          <CustomFormControlLabel
                            control={
                              <CustomCheckboxComponent
                                checked={value}
                                onChange={(e) => {
                                  onChange(e.target.checked);
                                }}
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
                    name="is_default"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <CustomFormControlLabel
                        control={
                          <CustomCheckboxComponent
                            checked={field.value}
                            onChange={(e) => {
                              field.onChange(e.target.checked);
                            }}
                          />
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
                      {isLoading ? (
                        <CircularProgress size={20} style={{ color: "#fff" }} />
                      ) : (
                        "Save"
                      )}
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

const CustomCheckboxComponent = (
  props: JSX.IntrinsicAttributes & CheckboxProps
) => {
  return <CustomCheckbox {...props} />;
};

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isDefault,
  onMakeDefault,
  isSelected,
  onClick,
  onEdit,
  handleDeleteClick,
}) => {
  const {
    id,
    full_name,
    address_line1: addressLine,
    address_line2,
    phone,
    city,
    postal_code,
    state,
    address_type,
  } = address;

  return (
    <div
      onClick={onClick}
      className="rounded shadow-sm mb-4 transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] cursor-pointer"
    >
      <div className="flex justify-between items-start p-4">
        <div>
          <p className="font-semibold text-[#696b79] mb-2">{full_name}</p>
          <p className="text-sm text-[#696b79] font-normal">
            {addressLine}, {address_line2}
          </p>
          <p className="text-sm text-[#696b79] font-normal">
            {city} - {postal_code}
          </p>
          <p className="text-sm text-[#696b79] font-normal">{state}</p>
          {phone && (
            <p className="text-sm text-[#696b79] font-normal mt-2">
              <span className="text-[#696b79]">Mobile:</span> {phone}
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
          label={address_type}
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
              onClick={() => handleDeleteClick(id as number)}
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

export const schema = Yup.object().shape({
  full_name: Yup.string()
    .required("Name is required.")
    .matches(/^[A-Za-z\s]+$/, "Name should only contain letters and spaces.")
    .min(3, "Name must be at least 3 characters."),

  phone: Yup.string()
    .required("Mobile number is required.")
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number."),

  address_line1: Yup.string().required("Address is required."),

  city: Yup.string()
    .required("City or District is required.")
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed."),

  postal_code: Yup.string()
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

  address_line2: Yup.string()
    .required("Town is required.")
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed."),

  address_type: Yup.string().required("Please select the type of address."),
  is_open_saturday: Yup.boolean().default(false),
  is_open_sunday: Yup.boolean().default(false),
  is_default: Yup.boolean().default(false),
});

export const CustomInput = styled(TextField)({
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

export const CustomRadioButton = styled(Radio)({
  "&.Mui-checked": {
    color: pink[600],
  },
});

export const CustomRadioGroup = styled(RadioGroup)({
  "@media (max-width: 350px)": {
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
});

export const CustomFormControlLabel = styled(FormControlLabel)({
  color: "#535766",
  fontWeight: "normal",
});

export const CustomCheckbox = styled(Checkbox)({
  color: "gray",
  "&.Mui-checked": {
    color: pink[600],
  },
});
