import React, { JSX, useEffect, useState } from "react";
import {
  Dialog,
  styled,
  IconButton,
  CheckboxProps,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { FormAddressData } from "../../../utils/types";
import DeleteIcon from "@mui/icons-material/Delete";
import { AddressDialog } from "../../../components/AddressDialog";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomCheckbox,
  schema,
} from "../../../components/UserProfile/Addresses";
import { RootState } from "../../../store";
import { toast } from "react-toastify";
import {
  getAddresses,
  postAddress,
  updateAddress,
  deleteAddress,
  getAddressById,
} from "../../../services/userAddresses";
import { setLoading } from "../../../store/slice/loading.slice";
import ConfirmDeleteDialog from "../../../components/AddressDialog/DeleteAddressDialog";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

interface ChangeAddressModalProps {
  openAddressDialog: boolean;
  handleCloseAddressDialog: () => void;
  setDefaultAddress: React.Dispatch<React.SetStateAction<FormAddressData | null>>;
}

interface AddressCardProps {
  address: FormAddressData;
  isSelected: boolean;
  handleSelect: (id: number) => void;
  handleDeliverHere: (id: number) => void;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

export const ChangeAddressModal: React.FC<ChangeAddressModalProps> = ({
  openAddressDialog,
  setDefaultAddress,
  handleCloseAddressDialog,
}) => {
  const [addresses, setAddresses] = useState<FormAddressData[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );

  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [open, setOpen] = React.useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const isLoading = useSelector((state: RootState) => state.loading["address"]);
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
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

  const handleSelect = (id?: number) => setSelectedAddressId(id ?? null);

  const handleDeliverHere = (id: number) => {
    const updated = { ...addresses[id], is_default: true };
    handleUpdateAddress(updated);
    handleCloseAddressDialog();
  };

  const defaultAddresses = addresses.filter((address) => address.is_default);
  const otherAddresses = addresses.filter((address) => !address.is_default);

  const fetchAddresses = () =>
    executeRequest(() => getAddresses({ page: 1, pageSize: 100 }), {
      errorPrefix: "Fetch addresses failed",
      onSuccess: (res) => {
        const items = res?.data?.data?.items || [];
        const defaultAddress =
          items.find((a: FormAddressData) => a.is_default) || {};
        setAddresses(items);
        setSelectedAddressId(defaultAddress?.id);
        setDefaultAddress(defaultAddress)
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
      () => updateAddress({ address_id: selectedAddressId as number, data }),
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

  const handleConfirmDelete = () => {
    if (selectedAddressId !== undefined) {
      setOpenConfirmDialog(false);
      handleRemoveAddress(Number(selectedAddressId));
    }
  };

  const handleDeleteClick = (index: number) => {
    setSelectedAddressId(index);
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

  useEffect(() => {
    fetchAddresses();
  }, []);
  return (
    <Dialog
      open={openAddressDialog}
      onClose={handleCloseAddressDialog}
      fullWidth
      slotProps={{
        paper: {
          sx: {
            maxWidth: 450,
            width: "100%",
          },
        },
      }}
    >
      <h2 className="text-sm font-semibold px-6 pt-6 uppercase">
        Select Delivery Address
      </h2>
      <StyledIconButton onClick={handleCloseAddressDialog}>
        <CloseIcon />
      </StyledIconButton>
      <hr className="mt-3 border-gray-300" />
      <div className="bg-gray-100">
        {/* <div className="my-2 p-4 bg-white">
          <form className="flex items-center bg-white border border-[#d4d5d9] rounded-[5px] overflow-hidden max-w-[420px] w-full h-[43px]">
            <input
              placeholder="Enter pincode"
              className="flex-1 px-[8px] py-2 text-sm border-none focus:outline-none font-[400] text-[16px]"
              name="pincode"
              autoComplete="off"
            />
            <button
              // type="submit"
              className="text-sm font-medium text-[#ff3f6c] bg-transparent px-4 py-2 hover:bg-transparent hover:border-transparent"
            >
              Check
            </button>
          </form>
        </div> */}
        <div className="flex justify-between items-center my-4 ml-4">
          <p>Saved Address</p>
          <button
            onClick={() => handleClickOpen()}
            className="cursor-pointer bg-transparent text-[#3880FF] text-center 
              max-w-[185px] w-full text-xs font-[700] rounded-[5px] uppercase 
             hover:font-[700] transition-colors duration-300
              hover:border-[#3880FF]  focus:outline-none"
          >
            <AddIcon className="mr-1" fontSize="small" /> Add New Address
          </button>
        </div>

        <div className="my-2">
          <div className="my-2 pr-3 bg-white">
            {defaultAddresses.length > 0 && (
              <div>
                {defaultAddresses.map((address) => {
                  const isSelected = selectedAddressId === address.id;
                  return (
                    <AddressCard
                      key={address.id}
                      address={address}
                      isSelected={isSelected}
                      handleSelect={handleSelect}
                      handleDeliverHere={handleDeliverHere}
                      handleEdit={handleClickOpen}
                      handleDelete={handleDeleteClick}
                    />
                  );
                })}
              </div>
            )}
          </div>
          <div className="my-2 pr-3 bg-white">
            {otherAddresses.length > 0 && (
              <div>
                {otherAddresses.map((address) => {
                  const isSelected = selectedAddressId === address.id;
                  return (
                    <AddressCard
                      key={address.id}
                      address={address}
                      isSelected={isSelected}
                      handleSelect={handleSelect}
                      handleDeliverHere={handleDeliverHere}
                      handleEdit={handleClickOpen}
                      handleDelete={handleDeleteClick}
                    />
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-center bg-white">
            <button
              onClick={() => handleClickOpen()}
              className="max-w-[240px] w-full border text-[#3880FF] font-semibold py-2 sm:max-w-[400px] text-sm hover:bg-[#fff0f4] my-4"
            >
              ADD NEW ADDRESS
            </button>
          </div>
        </div>
      </div>

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
    </Dialog>
  );
};

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isSelected,
  handleSelect,
  handleDeliverHere,
  handleEdit,
  handleDelete,
}) => {
  return (
    <label
      key={address.id}
      htmlFor={`address-${address.id}`}
      className="p-4 relative block cursor-pointer hover:bg-gray-50 rounded-md"
      onClick={() => handleSelect(Number(address.id))}
    >
      <div className="flex items-start gap-2">
        <input
          id={`address-${Number(address.id)}`}
          type="radio"
          name="selectedAddress"
          checked={isSelected}
          onChange={() => handleSelect(Number(address.id))}
          className="mt-1 accent-[#3880FF]"
        />

        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span className="font-semibold">{address.full_name}</span>
            {address.is_default && (
              <span className="text-xs text-gray-500 font-normal">
                (Default)
              </span>
            )}
          </div>

          <p className="text-gray-700 whitespace-pre-line font-normal">
            {address.address_line1}
            {address.address_line2 && `, ${address.address_line2}`},{" "}
            {address.city}, {address.state} - {address.postal_code}
          </p>

          <p className="mt-1 font-normal text-gray-700">
            Mobile: <span className="font-semibold">{address.phone}</span>
          </p>

          {isSelected && (
            <div className="mt-3 flex justify-between items-center gap-2">
              <div className="flex items-center w-full gap-2 max-w-[100px] sm:max-w-[170px] justify-between">
                <Tooltip title="Deliver Here">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeliverHere(Number(address.id));
                    }}
                    disabled={isSelected && address.is_default}
                    className="bg-[#3880FF] disabled:bg-[#3881ff9b] disabled:cursor-not-allowed text-white py-2 px-3 focus:outline-none font-semibold text-xs rounded-sm flex items-center justify-center gap-2"
                  >
                    <LocalShippingOutlinedIcon
                      fontSize="small"
                      className="inline sm:!hidden"
                    />
                    <span className="hidden sm:inline">DELIVER HERE</span>
                  </button>
                </Tooltip>

                <Tooltip title="EDIT">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(Number(address.id));
                    }}
                    className="sm:border sm:border-black text-black font-semibold px-1 sm:px-3 py-2 text-xs rounded-sm flex items-center justify-center"
                  >
                    <EditOutlinedIcon
                      fontSize="small"
                      className="inline sm:!hidden"
                    />
                    <span className="hidden sm:inline">EDIT</span>
                  </button>
                </Tooltip>
              </div>

              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(Number(address.id));
                  }}
                  className="cursor-pointer"
                >
                  <DeleteIcon sx={{ color: "#3880FF", fontSize: "1.5rem" }} />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>

        {address.address_type && (
          <span className="absolute top-2 right-2 text-xs text-[#00b852] border border-[#00b852] px-2 py-0.5 rounded-full">
            {address.address_type}
          </span>
        )}
      </div>
    </label>
  );
};

const StyledIconButton = styled(IconButton)(() => ({
  position: "absolute",
  right: 8,
  top: 8,
  color: "#282c3f",
}));

const CustomCheckboxComponent = (
  props: JSX.IntrinsicAttributes & CheckboxProps
) => {
  return <CustomCheckbox {...props} />;
};
