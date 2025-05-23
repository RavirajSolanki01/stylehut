import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Checkbox,
  CheckboxProps,
  Chip,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
  TextField,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { pink } from "@mui/material/colors";

import { AddressCardProps, FormAddressData } from "../../../utils/types";
import {
  deleteAddress,
  getAddressById,
  getAddresses,
  postAddress,
  updateAddress,
} from "../../../services/userAddresses";
import { setLoading } from "../../../store/slice/loading.slice";
import { toast } from "react-toastify";
import { JSX } from "react/jsx-runtime";
import { RootState } from "../../../store";
import { AddressDialog } from "../../AddressDialog";
import ConfirmDeleteDialog from "../../AddressDialog/DeleteAddressDialog";

export const Addresses: React.FC = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state: RootState) => state.loading["address"]);

  const [open, setOpen] = React.useState(false);
  const [defaultIndex, setDefaultIndex] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [addresses, setAddresses] = useState<FormAddressData[]>([]);
  const [defaultAddress, setDefaultAddress] = useState<FormAddressData | null>(
    null
  );

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

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="py-2 pr-3 max-w-[810px] w-full responsive-address-page">
      <div className="flex justify-between items-center">
        <p className="text-[16px] font-bold">Saved Addresses</p>
        <button
          onClick={() => handleClickOpen(undefined)}
          className="cursor-pointer bg-transparent border border-[#d2d2d2] text-[#3880FF] text-center 
              max-w-[215px] w-full py-[10px] my-[8px] text-[14px] font-[700] rounded-[5px] uppercase 
             hover:font-[700] transition-colors duration-300
              hover:border-[#3880FF]  focus:outline-none add-address-new-button"
        >
          <AddIcon className="mr-1" /> Add New Address
        </button>
        <button
          onClick={() => handleClickOpen(undefined)}
          className="cursor-pointer bg-transparent border border-[#d2d2d2] text-[#3880FF] text-center 
              max-w-[215px] w-full py-[10px] my-[8px] text-[14px] font-[700] rounded-[5px] uppercase 
             hover:font-[700] transition-colors duration-300
              hover:border-[#3880FF]  focus:outline-none add-address-button"
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
      <AddressDialog
        open={open}
        handleClose={handleClose}
        handleFormSubmit={handleFormSubmit}
        control={control}
        errors={errors}
        editIndex={editIndex}
        isLoading={isLoading}
        typeOfAddress={watch("address_type")}
        CustomCheckboxComponent={CustomCheckboxComponent}
      />
      <ConfirmDeleteDialog
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={handleConfirmDelete}
        open={openConfirmDialog}
      />
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
              className="mt-2 text-[#3880FF] text-sm font-semibold focus:outline-none cursor-pointer"
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
              className="flex-1 text-[#3880FF] p-1 focus:outline-none"
            >
              EDIT
            </button>
            <div className="border-l border-gray-300 h-5 mx-2" />
            <button
              onClick={() => handleDeleteClick(id as number)}
              className="flex-1 text-[#3880FF] p-1 focus:outline-none"
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

export const CustomRadioButton = styled(Radio)({
  "&.Mui-checked": {
    color: "#3880FF",
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
