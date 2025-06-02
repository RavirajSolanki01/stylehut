import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Radio,
  RadioGroup,
  Rating,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleIcon from "@mui/icons-material/Circle";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";

import { ErrorV2Icon } from "../../../assets";
import { setLoading } from "../../../store/slice/loading.slice";
import { getOrders } from "../../../services/ordersService";
import { toast } from "react-toastify";
import { RootState } from "../../../store";
import { Order } from "../../../utils/types";
import {
  BoxIcon,
  OutForDeliveryIcon,
  PendingIcon,
  ShippedIcon,
  TickMarkIcon,
} from "../../../utils/icons";

const statusOption = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "onTheWay",
    label: "On the way",
  },
  {
    value: "delivered",
    label: "Delivered",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
  {
    value: "returned",
    label: "Returned",
  },
];

const timeOption = [
  {
    value: "anyTime",
    label: "Anytime",
  },
  {
    value: "last30days",
    label: "Last 30 days",
  },
  {
    value: "last6Months",
    label: "Last 6 Months",
  },
  {
    value: "lastYear",
    label: "Last Year",
  },
];

export const Orders: React.FC = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state: RootState) => ({
    auth: state.auth,
    loading: state.loading["get-orders"],
  }));

  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  const handleFilterClose = () => {
    setIsFilterOpen(false);
  };

  const fetchOrders = () => {
    dispatch(setLoading({ key: "get-orders", value: true }));
    getOrders({ page: 1, pageSize: 100 })
      .then((res) => {
        const ordersList = res?.data?.data?.items;
        if (ordersList) {
          setOrders(ordersList);
        }
      })
      .catch((err) => {
        const errorMessage =
          err?.response?.data?.message ||
          err?.response?.data ||
          "Something went wrong.";
        toast.error(`Fetch wishlist data Failed: ${errorMessage}`);
      })
      .finally(() =>
        dispatch(setLoading({ key: "get-wishlist", value: false }))
      );
  };

  useEffect(() => {
    if (!auth.token) {
      return;
    }
    fetchOrders();
  }, [auth.token]);

  const singleItemOrders = orders.flatMap((order) =>
    order.items.map((item) => ({
      ...order,
      items: [item],
    }))
  );

  return (
    <div className="pr-4 pt-0 sm:pt-4 w-full">
      <div className="h-[64px] flex justify-between w-full">
        <div className="flex flex-col">
          <div className="text-[18px] font-500 text-[#282c3f] leading-[21px]">
            All Orders
          </div>
          <div className="text-[14px] font-200 text-[#282c3f] leading-[21px]">
            from anytime
          </div>
        </div>
        <div className="flex gap-[12px]">
          <CustomInput
            placeholder="Search in orders"
            className="search-input"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon className="text-[#696e79] mr-[12px]" />
              </InputAdornment>
            }
          />
          <FilterButton
            variant="outlined"
            startIcon={<TuneIcon />}
            onClick={handleFilterClick}
          >
            Filter
          </FilterButton>
        </div>
      </div>

      {singleItemOrders.length > 0 ? (
        singleItemOrders.map((order) => {
          return (
            <div className="bg-[#f5f5f5] p-[10px]">
              <div className="px-[21px] mt-[12px] pb-[5px] bg-[#ffffff]">
                <div className="flex gap-[12px] pt-[16px]">
                  <div className="h-[32px] w-[32px] rounded-[50%] bg-[#696e79] flex justify-center items-center relative">
                    <BoxIcon />
                    {order?.timeline[0]?.status === "DELIVERED" && (
                      <div className="absolute -bottom-1 -right-1 h-[16px] w-[16px] rounded-[50%] bg-[#1f845a] flex justify-center items-center">
                        <TickMarkIcon />
                      </div>
                    )}
                    {order?.timeline[0]?.status === "PENDING" && (
                      <div className="absolute -bottom-1 -right-1 h-[16px] w-[16px] rounded-[50%] bg-[#ff9f00] flex justify-center items-center">
                        <PendingIcon />
                      </div>
                    )}
                    {order?.timeline[0]?.status === "SHIPPED" && (
                      <div className="absolute -bottom-1 -right-1 h-[16px] w-[16px] rounded-[50%] bg-[#2874f0] flex justify-center items-center">
                        <ShippedIcon />
                      </div>
                    )}
                    {order?.timeline[0]?.status === "OUT_FOR_DELIVERY" && (
                      <div className="absolute -bottom-1 -right-1 h-[16px] w-[16px] rounded-[50%] bg-[#ff9f00] flex justify-center items-center">
                        <OutForDeliveryIcon />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-[#1f845a] font-[700] text-[14px] capitalize">
                      {order?.timeline[0]?.status?.toLowerCase()}
                    </p>
                    <p className="text-[#686b77] font-[500] text-[14px]">
                      {order?.expected_delivery}
                    </p>
                  </div>
                </div>
                {order?.items?.map((item) => (
                  <>
                    <div className="bg-[#f5f5f5] p-[12px] mt-[12px] flex justify-between items-center hover:bg-[#ebebeb]">
                      <div className="flex gap-[26px]">
                        <img
                          src={item?.product?.image[0]}
                          className="h-[70px] r w-[53px] rounded-[8px]"
                        />
                        <div>
                          <p className="text-[#282c3f] font-[700] text-[14px] mt-[2px]">
                            {item?.product?.brand?.name}
                          </p>
                          <p className="text-[#282c3f] font-[500] text-[12px] mt-[2px]">
                            {item?.product?.name}
                          </p>
                          <p className="text-[#282c3f] font-[500] text-[12px] mt-[2px]">
                            Size: {item?.size_quantity?.size_data?.size}
                          </p>
                        </div>
                      </div>
                      <StyledArrowForwardIosIcon />
                    </div>

                    {order.timeline[0].status === "DELIVERED" && (
                      <>
                        <div className="bg-[#f5f5f5] px-[20px] py-[14px] flex items-center mt-[2px] gap-[11px] hover:bg-[#ebebeb]">
                          <StyledCircleIcon />
                          <p className="text-[#696e79] text-[14px] font-[400]">
                            Exchange/Return window closed on{" "}
                            {order?.expected_delivery}
                          </p>
                        </div>
                        <div className="bg-[#f5f5f5] px-[20px] py-[14px] mt-[2px]">
                          <StyledRating
                            name="simple-controlled"
                            // value={order.rating || value}
                            // onChange={(_, newValue) => {
                            //   setValue(newValue);
                            // }}
                          />
                          <p className="text-[#282c3f] font-[400] text-[14px] leading-[20px]">
                            Rate & Review to{" "}
                            <span className="font-[700]">
                              earn Myntra Credit
                            </span>
                          </p>
                        </div>
                      </>
                    )}
                  </>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex justify-center flex-col items-center h-[100%]">
          <img src={ErrorV2Icon} className="mb-[20px]" />
          <p className="text-[#282c3f] text-[20px] font-[700] leading-[28px]">
            You haven't placed any order yet!
          </p>
          <p className="text-[#686b77] text-[14px] font-[400] leading-[18px] my-[12px]">
            Order section is empty. After placing order, You can track them from
            here!
          </p>
        </div>
      )}
      {/* filter dialog */}
      <Dialog
        open={isFilterOpen}
        onClose={handleFilterClose}
        maxWidth="xs"
        fullWidth
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          className="text-[#282c3f] !text-[18px] !font-[700] !leading-[21px]"
        >
          Filter Orders
        </DialogTitle>
        <StyledIconButton
          aria-label="close"
          onClick={handleFilterClose}
          sx={() => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: "#282c3f",
            fontSize: "16px",
          })}
        >
          <CloseIcon />
        </StyledIconButton>
        <DialogContent sx={{ padding: 0 }}>
          <div className="px-[24px]">
            <DialogContentText
              id="demo-radio-buttons-group-label"
              className="!text-[#282c3f] !text-[14px] !leading-[16px] font-[700] !my-[10px]"
            >
              Status
            </DialogContentText>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {statusOption.map((option) => (
                <StyledFormControlLabel
                  value={option.value}
                  control={<StyledRadio />}
                  label={option.label}
                  slotProps={{
                    typography: {
                      className:
                        "!font-[400] !text-[#282c3f] !text-[14px] !leading-[16px]",
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </div>
          <hr className="w-full border-[#d2d2d2] mt-[8px] mb-[18px]" />
          <div className="px-[24px] mb-[5px]">
            <DialogContentText
              id="demo-radio-buttons-group-label"
              className="!text-[#282c3f] !text-[14px] !leading-[16px] font-[700] !my-[10px]"
            >
              Time
            </DialogContentText>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              {timeOption.map((option) => (
                <StyledFormControlLabel
                  value={option.value}
                  control={<StyledRadio />}
                  label={option.label}
                  slotProps={{
                    typography: {
                      className:
                        "!font-[400] !text-[#282c3f] !text-[14px] !leading-[16px]",
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </div>
        </DialogContent>
        <hr className="w-full border-[#d2d2d2] mt-[2px] mb-[8px]" />
        <StyledDialogActions>
          <ClearFilterButton
            variant="outlined"
            autoFocus
            onClick={handleFilterClose}
          >
            Clear Filter
          </ClearFilterButton>
          <ApplyFilterButton onClick={handleFilterClose} autoFocus fullWidth>
            Apply
          </ApplyFilterButton>
        </StyledDialogActions>
      </Dialog>
      {/* end filter dialog */}
    </div>
  );
};

const CustomInput = styled(OutlinedInput)({
  width: "100%",
  height: 40,
  backgroundColor: "#fff",
  border: "1px solid #d4d5d9",
  borderRadius: 4,
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "@media (max-width: 1450px)": {
    maxWidth: "420px",
    width: "100%",
  },
  "@media (max-width: 1350px)": {
    maxWidth: "420px",
    width: "100%",
  },
});

const FilterButton = styled(Button)({
  border: "1px solid #d4d5d9",
  padding: "1px 6px",
  height: 40,
  color: "#000",
  width: "100%",
  maxWidth: "85px",
});

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#3880FF",
  },
});

const StyledCircleIcon = styled(CircleIcon)({
  color: "#696e79",
  fontSize: "12px",
});

const StyledArrowForwardIosIcon = styled(ArrowForwardIosIcon)({
  fontSize: "16px",
});

const StyledIconButton = styled(IconButton)({
  position: "absolute",
  right: 8,
  top: 8,
  color: "#282c3f",
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
  },
});

const StyledFormControlLabel = styled(FormControlLabel)({
  margin: "0px",
  "& .MuiRadio-root": {
    padding: "5px",
  },
});

const StyledRadio = styled(Radio)({
  "&.Mui-checked": {
    color: "#3880FF",
  },
});

const StyledDialogActions = styled(DialogActions)({
  display: "flex",
  justifyContent: "space-between",
  gap: 5,
  padding: "8px 8px 16px 8px",
});

const ClearFilterButton = styled(Button)({
  border: "1px solid #d4d5d9",
  padding: "1px 6px",
  height: 40,
  width: "100%",
  color: "#282c3f",
  fontSize: "14px",
  fontWeight: 700,
});

const ApplyFilterButton = styled(Button)({
  border: "1px solid #3880FF",
  padding: "1px 6px",
  height: 40,
  width: "100%",
  color: "#fff",
  fontSize: "14px",
  fontWeight: 700,
  backgroundColor: "#3880FF",
});
