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
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { ErrorV2Icon, Product1, Product3 } from "../../../assets";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CircleIcon from "@mui/icons-material/Circle";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { getDateRange } from "../../../utils/reusable-functions";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { IFilterOption } from "../../../utils/types";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { getUserOrderList } from "../../../services/userOrderService";
import { SkeletonOrderCard } from "./SkeletonOrderCard";

const orderReviews = [
  {
    status: "Delivered",
    deliveryDate: "Wed, 8 Nov 2023",
    imgUrl: Product1,
    product: {
      brand: "Pepe Jeans",
      name: "Women Straight Fit High-Rise Jeans",
      size: "24",
    },
    returnWindowClosed: "Wed, 22 Nov 2023",
    rating: 2,
  },
  {
    status: "Delivered",
    deliveryDate: "Wed, 8 Nov 2023",
    imgUrl: Product3,
    product: {
      brand: "Pepe Jeans",
      name: "Women Straight Fit High-Rise Jeans",
      size: "24",
    },
    returnWindowClosed: "Wed, 22 Nov 2023",
    rating: 0,
  },
];

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
export const Orders = () => {
  const [value, setValue] = useState<number | null>(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterOption, setFilterOption] = useState<IFilterOption>({
    startDate: "",
    endDate: "",
    status: "",
    timeStatus: "",
  });
  const [{ currentPage, totalPages }, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
  });

  const handleFilterClick = () => {
    setIsFilterOpen(true);
  };

  const handleFilterClose = () => {
    setIsFilterOpen(false);
  };

  const handleApplyFilterClick = () => {
    fetchUserOrderList();
    handleFilterClose();
  };

  const handleClearFilterClick = () => {
    setFilterOption({
      startDate: "",
      endDate: "",
      timeStatus: "",
      status: "",
    });
    fetchUserOrderList();
    handleFilterClose();
  };

  const handleTimeFilterChange = (selectedTime: string) => {
    const { startDate, endDate } = getDateRange(selectedTime);

    setFilterOption((prevState: IFilterOption) => ({
      ...prevState,
      startDate: startDate ? startDate.toLocaleString() : "",
      endDate: endDate ? endDate.toLocaleString() : "",
      timeStatus: selectedTime,
    }));
  };

  const handleStatusFilterChange = (selectedStatus: string) => {
    setFilterOption((prevState: IFilterOption) => ({
      ...prevState,
      status: selectedStatus,
    }));
  };
  const handlePageChange = (page: number) => {
    setPagination((pageItems) => ({
      ...pageItems,
      currentPage: page,
    }));
  };

  const fetchUserOrderList = async (pageNo?: number) => {
    setIsLoading(true);
    try {
      const response = await getUserOrderList({
        page: pageNo || currentPage,
        pageSize: 10,
        sortBy: "created_at",
        status: filterOption.status,
        order: "desc",
        payment_status: "",
        startDate: filterOption.startDate,
        endDate: filterOption.endDate,
        search: "",
      });

      // setProducts(response.data.data.items);
      setPagination({
        currentPage: response.data.data.meta.page,
        totalPages: response.data.data.meta.totalPages,
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserOrderList();
  }, [currentPage]);

  console.log("filter=>", filterOption, currentPage);

  return (
    <div className="p-4 w-full">
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
      <div className="bg-[#f5f5f5] p-[10px]">
        {orderReviews.length !== 0 &&
          !isLoading &&
          orderReviews.map((review) => {
            return (
              <div className="px-[21px] mt-[12px] pb-[5px] bg-[#ffffff]">
                <div className="flex gap-[12px] pt-[16px]">
                  <div className="h-[32px] w-[32px] rounded-[50%] bg-[#696e79] flex justify-center items-center">
                    <KeyboardReturnIcon />
                  </div>
                  <div>
                    <p className="text-[#1f845a] font-[700] text-[14px]">
                      {review.status}
                    </p>
                    <p className="text-[#686b77] font-[500] text-[14px]">
                      {review.deliveryDate}
                    </p>
                  </div>
                </div>
                <div className="bg-[#f5f5f5] p-[12px] mt-[12px] flex justify-between items-center hover:bg-[#ebebeb]">
                  <div className="flex gap-[26px]">
                    <img
                      src={review.imgUrl}
                      className="h-[70px] r w-[53px] rounded-[8px]"
                    />
                    <div>
                      <p className="text-[#282c3f] font-[700] text-[14px] mt-[2px]">
                        {review.product.brand}
                      </p>
                      <p className="text-[#282c3f] font-[500] text-[12px] mt-[2px]">
                        {review.product.name}
                      </p>
                      <p className="text-[#282c3f] font-[500] text-[12px] mt-[2px]">
                        Size: {review.product.size}
                      </p>
                    </div>
                  </div>
                  <StyledArrowForwardIosIcon />
                </div>
                <div className="bg-[#f5f5f5] px-[20px] py-[14px] flex items-center mt-[2px] gap-[11px] hover:bg-[#ebebeb]">
                  <StyledCircleIcon />
                  <p className="text-[#696e79] text-[14px] font-[400]">
                    Exchange/Return window closed on {review.returnWindowClosed}
                  </p>
                </div>
                <div className="bg-[#f5f5f5] px-[20px] py-[14px] mt-[2px]">
                  <StyledRating
                    name="simple-controlled"
                    value={review.rating || value}
                    onChange={(_, newValue) => {
                      setValue(newValue);
                    }}
                  />
                  <p className="text-[#282c3f] font-[400] text-[14px] leading-[20px]">
                    Rate & Review to{" "}
                    <span className="font-[700]">earn Myntra Credit</span>
                  </p>
                </div>
              </div>
            );
          })}
      </div>
      {orderReviews.length !== 0 && !isLoading && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            className={`default px-4 py-2 rounded-md font-bold flex justify-center items-center
      ${
        currentPage === 1
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-white text-[#282c3f] hover:bg-gray-100"
      }
    `}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <KeyboardDoubleArrowLeftIcon /> Page 1
          </button>

          <button
            className={`default px-4 py-2 rounded-md font-bold flex justify-center items-center
      ${
        currentPage === 1
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-white text-[#282c3f] hover:bg-gray-100"
      }
    `}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft /> Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className={`default px-4 py-2 rounded-md font-bold flex justify-center items-center
      ${
        currentPage === totalPages
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-white text-[#282c3f] hover:bg-gray-100"
      }
    `}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next <ChevronRight />
          </button>
        </div>
      )}
      {orderReviews.length === 0 && !isLoading && (
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
      {isLoading && !orderReviews.length && (
        <div className="flex flex-wrap">
          {[...Array(10)].map((_, i) => (
            <SkeletonOrderCard key={i} />
          ))}
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
              value={filterOption.status}
            >
              {statusOption.map((option) => (
                <StyledFormControlLabel
                  value={option.label}
                  control={<StyledRadio />}
                  onChange={() => handleStatusFilterChange(option.label)}
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
              value={filterOption.timeStatus}
            >
              {timeOption.map((option) => (
                <StyledFormControlLabel
                  value={option.label}
                  control={<StyledRadio />}
                  label={option.label}
                  onChange={() => handleTimeFilterChange(option.label)}
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
            onClick={handleClearFilterClick}
          >
            Clear Filter
          </ClearFilterButton>
          <ApplyFilterButton
            onClick={handleApplyFilterClick}
            autoFocus
            fullWidth
          >
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
