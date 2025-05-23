import React, { useEffect, useState } from "react";
import { CheckboxProps, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { JSX } from "react/jsx-runtime";

import { AddressCardProps, FormAddressData } from "../../../utils/types";
import {
  deleteAddress,
  getAddressById,
  getAddresses,
  postAddress,
  updateAddress,
} from "../../../services/userAddresses";
import { setLoading } from "../../../store/slice/loading.slice";
import { RootState } from "../../../store";
import {
  CustomCheckbox,
  CustomRadioButton,
  schema,
} from "../../../components/UserProfile/Addresses";
import ConfirmDeleteDialog from "../../../components/AddressDialog/DeleteAddressDialog";
import { AddressDialog } from "../../../components/AddressDialog";

type Props = {
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const CartAddresses: React.FC<Props> = ({
  selectedIndex,
  setSelectedIndex,
}) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(
    (state: RootState) => state.loading["cart-address"]
  );

  const [open, setOpen] = React.useState<boolean>(false);
  const [defaultIndex, setDefaultIndex] = useState<number>(0);
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
    dispatch(setLoading({ key: "cart-address", value: true }));
    try {
      const res = await apiFn();
      onSuccess?.(res);
    } catch (err) {
      toast.error(`${errorPrefix}: ${getErrorMessage(err)}`);
      if (openOnError) setOpen(true);
    } finally {
      dispatch(setLoading({ key: "cart-address", value: false }));
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
        setSelectedIndex(defaultAddress.id || items?.[0].id);
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
        <p className="text-[16px] font-bold">Select Delivery Address</p>
        <button
          onClick={() => handleClickOpen(undefined)}
          className="cursor-pointer bg-transparent border border-[#282c3f] text-[#282c3f] text-center 
              max-w-[215px] w-full py-[10px] my-[8px] text-[14px] font-[700] rounded-[5px] uppercase 
             hover:font-[700] transition-colors duration-300
              hover:border-[#282c3f]  focus:outline-none add-address-new-button"
        >
          Add New Address
        </button>
        <button
          onClick={() => handleClickOpen(undefined)}
          className="cursor-pointer bg-transparent border border-[#d2d2d2] text-[#282c3f] text-center 
              max-w-[215px] w-full py-[10px] my-[8px] text-[14px] font-[700] rounded-[5px] uppercase 
             hover:font-[700] transition-colors duration-300
              hover:border-[#282c3f]  focus:outline-none add-address-button"
        >
          Add
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
                  onMakeDefault={() => {}}
                />
              );
            })}
          </div>

          <div
            onClick={() => handleClickOpen(undefined)}
            className="rounded shadow-sm mb-4 transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] cursor-pointer text-[#3880FF] p-4 border border-dashed border-[#282c3f60]"
          >
            <AddIcon className="mr-1" /> Add New Address
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
        <div className="flex items-start">
          <CustomRadioButton
            checked={isSelected}
            sx={{
              color: "#3880FF",
              "&.Mui-checked": {
                color: "#3880FF",
              },
            }}
          />
          <div>
            <p className="font-semibold text-[#696b79] mb-2">
              <span>{full_name}</span> &nbsp;
              <Chip
                label={address_type}
                size="small"
                sx={{
                  border: "1px solid #03a685",
                  backgroundColor: "transparent",
                  fontWeight: 500,
                  height: "20px",
                  color: "#03a685",
                }}
              />
            </p>
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
            {isSelected && (
              <p className="text-sm text-[#696b79] font-normal mt-2">
                <span className="text-[#696b79]">
                  • Pay on Delivery not available
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
      {isSelected && (
        <>
          <div className="flex items-center text-sm font-semibold p-2 w-1/3 justify-around">
            <button
              onClick={onEdit}
              className="cursor-pointer rounded-[5px] border border-[#282c3f] text-[#282c3f] p-2 w-2/5 focus:outline-none"
            >
              EDIT
            </button>
            <button
              onClick={() => handleDeleteClick(id as number)}
              className="cursor-pointer rounded-[5px] border border-[#282c3f] text-[#282c3f] p-2 w-2/5 focus:outline-none"
            >
              REMOVE
            </button>
          </div>
        </>
      )}
    </div>
  );
};
