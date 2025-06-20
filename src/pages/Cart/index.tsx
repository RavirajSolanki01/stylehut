import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  getCartProducts,
  moveAllFromCartToWishlist,
  removeAllFromCart,
  removeFromCart,
  placeOrderApiCall,
} from "../../services/cartService";
import { CartItems, Coupon, FormAddressData, Product } from "../../utils/types";
import { postWishlist } from "../../services/wishlistService";
import { CartAddresses } from "./CartAddress";
import { SizeModal } from "./Dialogs/SizeModal";
import { QuantityModal } from "./Dialogs/QuantityModal";
import { ApplyCouponModal } from "./Dialogs/ApplyCouponModal";
import { ChangeAddressModal } from "./Dialogs/ChangeAddressModal";
import { addAppliedCoupon } from "../../store/slice/cart.slice";
import { RootState } from "../../store";
import { ConfirmDeleteModal } from "./Dialogs/ConfirmDeleteModal";
import { formatPrice, withLoading } from "../../utils/reusable-functions";
import { Logo } from "../../assets";
import EmptyCart from "./empty.svg";
import CheckoutScreen from "./Checkout";
import { SkeletonProduct } from "../../components/ProductCard/SkeletonPorduct";

type Props = {
  setMaxAllowedStep: React.Dispatch<React.SetStateAction<number>>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  cartItems: CartItems[];
  activeStep: number;
  setCartItems: React.Dispatch<React.SetStateAction<CartItems[]>>;
  setTotalPrice: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
};

export const ProductCart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const steps = ["BAG", "ADDRESS", "PAYMENT"];

  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [maxAllowedStep, setMaxAllowedStep] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<string>("");
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  const handleStepClick = (index: number) => {
    if (index <= maxAllowedStep) {
      setActiveStep(index);
    }
  };

  const placeOrder = async (method: string) => {
    const response = await placeOrderApiCall({
      shipping_address_id: selectedIndex,
      billing_address_id: selectedIndex,
      payment_method: method,
    });

    if (response?.data && response?.status === 200) {
      setOrderSuccess(true);
      setTimeout(() => {
        setOrderSuccess(false);
        navigate("/profile/orders");
      }, 4000);
    }
  };

  const getStepStyle = (index: number) => {
    if (index === activeStep) {
      return "text-[#3880ff] border-b-2 border-[#3880ff] pb-[2px] cursor-pointer";
    } else if (index <= maxAllowedStep) {
      return "text-[#282c3f] cursor-pointer hover:text-[#03A685]";
    } else {
      return "text-[#d3d3d3] cursor-not-allowed";
    }
  };

  const refreshCart = async () => {
    const response = await getCartProducts({ page: 1, pageSize: 100 });

    const items: CartItems[] = response.data.data.items.map((item: any) => ({
      ...item,
      isSelected: false,
      isAvailable: item?.quantity > 0,
    }));
    setCartItems(items);
  };

  useEffect(() => {
    withLoading(dispatch, "refresh-cart", refreshCart);
  }, []);

  if (orderSuccess) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200">
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-[#8bb2f741] flex items-center justify-center">
              <svg
                className="w-10 h-10 text-[#3880ff] animate-bounce"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <Typography
            variant="h5"
            className="!text-[#3880ff] font-semibold mb-2"
          >
            Order Successful!
          </Typography>
          <Typography className="text-sm text-gray-600 mb-4">
            Thank you for placing order.
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed w-full top-0 z-50 bg-white flex justify-between items-center shadow-md px-[20px] py-[10px] flex-col  gap-3 sm:flex-row sm:px-[30px]">
        <div className="flex w-full justify-center sm:justify-between ">
          <div className="flex items-center">
            <img
              onClick={() => navigate("/home")}
              src={Logo}
              alt="myntra_logo"
              className="max-h-[50px] max-w-[50px] h-full w-full cursor-pointer mr-5"
            />
          </div>

          <ol className="flex items-center font-semibold tracking-[3px] sm:flex-row gap-5 text-[12px] md:text-[14px]">
            {steps.map((step, index) => (
              <React.Fragment key={step}>
                <li
                  onClick={() => handleStepClick(index)}
                  className={`${getStepStyle(
                    index
                  )} transition duration-200 text-[12px] md:text-[14px]`}
                >
                  {step}
                </li>
                {index < steps.length - 1 && (
                  <li className="mx-2 text-[#d3d3d3] select-none hidden sm:block">
                    ---------
                  </li>
                )}
              </React.Fragment>
            ))}
          </ol>

          <div className="hidden items-center sm:flex">
            <img
              src="https://constant.myntassets.com/checkout/assets/img/sprite-secure.png"
              alt="secure_icon"
              className="max-h-[28px] max-w-[26px] h-full w-full cursor-pointer mr-3"
            />
            <p className="text-[#535766] text-xs tracking-[3px]">100% SECURE</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col max-w-[1050px] pt-[60px] w-full mx-auto justify-center mb-4 responsive-cart-page">
        {activeStep === 0 ? (
          <CartItemsList
            cartItems={cartItems}
            setTotalPrice={setTotalPrice}
            activeStep={activeStep}
            setCartItems={setCartItems}
            setMaxAllowedStep={setMaxAllowedStep}
            setActiveStep={setActiveStep}
          />
        ) : activeStep === 1 ? (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-[70%]">
              <CartAddresses
                setSelectedIndex={setSelectedIndex}
                selectedIndex={selectedIndex}
              />
            </div>
            <PriceSummary
              setTotalPrice={setTotalPrice}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              setMaxAllowedStep={setMaxAllowedStep}
              setCartItems={setCartItems}
              cartItems={cartItems}
              disabled={!selectedIndex}
            />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-[70%]">
              <CheckoutScreen totalPrice={totalPrice} placeOrder={placeOrder} />
            </div>
            <PriceSummary
              setTotalPrice={setTotalPrice}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              setMaxAllowedStep={setMaxAllowedStep}
              setCartItems={setCartItems}
              cartItems={cartItems}
              disabled={!selectedIndex}
            />
          </div>
        )}
      </div>
    </>
  );
};

const PriceSummary: React.FC<Props> = ({
  setMaxAllowedStep,
  setActiveStep,
  setTotalPrice,
  cartItems,
  activeStep,
  disabled,
}) => {
  const dispatch = useDispatch();

  const { selectedCoupon, availableCoupons } = useSelector(
    (state: RootState) => ({
      selectedCoupon: state.cart.coupon,
      availableCoupons: state.cart.availableCoupons,
    })
  );

  const [openCouponDialog, setOpenCouponDialog] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | undefined>(
    selectedCoupon as Coupon
  );

  const handleCloseCouponDialog = () => setOpenCouponDialog(false);
  const handleOpenCouponDialog = () => {
    setOpenCouponDialog(true);
  };

  const handleApplyCoupon = (
    coupon: typeof appliedCoupon,
    isRemove?: boolean
  ) => {
    setAppliedCoupon(coupon);
    dispatch(addAppliedCoupon(coupon as Coupon));
    if (!isRemove) {
      handleCloseCouponDialog();
    }
  };

  const selectedItems = cartItems?.filter(
    (item) => item.isSelected && item.isAvailable
  );

  const totalMRP = selectedItems
    ?.reduce((acc, item) => acc + Number(item.product.price) * item.quantity, 0)
    .toFixed(0);

  const totalDiscount = selectedItems
    ?.reduce((acc, item) => {
      const price = Number(item.product.price);
      const discount = price * (item.product.discount / 100);
      return acc + discount * item.quantity;
    }, 0)
    .toFixed(0);

  const couponDiscount =
    selectedCoupon &&
    Number(totalMRP) >= Number(selectedCoupon.min_order_amount)
      ? Math.min(
          Number(selectedCoupon.max_savings_amount),
          (Number(totalMRP) * Number(selectedCoupon.discount)) / 100
        )
      : 0;

  const totalAmount =
    selectedItems && selectedItems.length > 0
      ? (
          Number(totalMRP) -
          Number(totalDiscount) -
          Number(couponDiscount) +
          20
        ).toFixed(0)
      : "0";

  const handlePlaceOrder = () => {
    if (selectedItems && selectedItems.length > 0) {
      if (activeStep === 1) {
        setActiveStep(2);
        setMaxAllowedStep(2);
      } else {
        setMaxAllowedStep(1);
        setActiveStep(1);
      }
      setTotalPrice(totalAmount);
    }
  };

  useEffect(() => {
    if (selectedItems.length <= 0) {
      setMaxAllowedStep(0);
      setActiveStep(0);
    }
  }, [selectedItems]);

  useEffect(() => {
    const coupon =
      availableCoupons &&
      availableCoupons.find(
        (coupon: { code: string }) =>
          coupon.code.toLowerCase() === appliedCoupon?.code.toLowerCase()
      );
    const newCoupon = selectedItems.length > 0 ? coupon : undefined;
    setAppliedCoupon(newCoupon as Coupon);
  }, []);

  return (
    <div className="w-full lg:w-[30%] md:w-[100%] py-5 sm:py-0">
      <p className="text-[#535766] font-bold text-xs sm:text-sm uppercase mb-2">
        Coupons
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <SellOutlinedIcon fontSize="small" />
          {selectedCoupon?.id && selectedItems.length > 0 ? (
            <>
              <div>
                <p className="font-bold text-[#282c3f] text-xs sm:text-sm ml-3">
                  1 Coupon Applied
                </p>
                <p className="font-normal text-[#28a02e] text-[12px] ml-4">
                  You saved ₹
                  {formatPrice(
                    Number(couponDiscount ? couponDiscount.toFixed(0) : 0)
                  )}
                </p>
              </div>
            </>
          ) : (
            <p className="font-bold text-[#282c3f] text-xs sm:text-sm ml-3">
              Apply Coupon
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleOpenCouponDialog}
            disabled={cartItems.length <= 0 || selectedItems.length <= 0}
            className="cursor-pointer bg-transparent border border-[#3880FF] text-[#3880FF] text-center 
        px-[10px] max-w-[80px] w-full py-[5px] text-xs sm:text-sm font-[700] uppercase 
        hover:font-[700] transition-colors duration-300
        hover:border-[#3880FF] hover:bg-[#eaebff] focus:outline-none disabled:cursor-not-allowed"
          >
            {selectedItems.length > 0 && selectedCoupon?.id
              ? "Change"
              : "Apply"}
          </button>
        </div>
      </div>

      <hr className="my-4 text-[#eaeaec]" />

      <div>
        <p className="font-bold mb-2 text-[#535766] text-xs sm:text-sm">
          PRICE DETAILS ({selectedItems?.length} Item)
        </p>
        <div className="text-xs sm:text-sm flex justify-between font-normal my-1 text-[#282c3f]">
          <span>Total MRP</span> <span>₹{formatPrice(Number(totalMRP))}</span>
        </div>
        {selectedItems && selectedItems.length > 0 && (
          <div>
            <div className="text-xs sm:text-sm flex justify-between font-normal my-1 text-green-600">
              <span>Discount on MRP</span>{" "}
              <span>-₹{formatPrice(Number(totalDiscount))}</span>
            </div>
            <div className="text-xs sm:text-sm flex justify-between font-normal my-1 text-[#282c3f]">
              <span>Coupon Discount</span>{" "}
              <span className="text-[#3880FF]">
                -₹
                {formatPrice(
                  Number(couponDiscount ? couponDiscount.toFixed(0) : 0)
                )}
              </span>
            </div>
            <div className="text-xs sm:text-sm flex justify-between font-normal my-1 text-[#282c3f]">
              <span>Platform Fee</span> <span>₹20</span>
            </div>
            <div className="text-xs sm:text-sm flex justify-between font-normal my-1 text-[#282c3f]">
              <span>Shipping Fee</span>{" "}
              <span className="text-green-600">FREE</span>
            </div>
          </div>
        )}
        <hr className="my-3 text-[#eaeaec]" />
        <div className="font-bold flex text-xs sm:text-sm justify-between my-1 text-[#3e4152]">
          <span>Total Amount</span>{" "}
          <span>₹{formatPrice(Number(totalAmount))}</span>
        </div>
        {activeStep < 2 && (
          <button
            className="w-full mt-4 cursor-pointer bg-[#3880FF] text-white text-xs sm:text-sm font-semibold py-2 disabled:bg-[#3880FF9b]"
            disabled={disabled}
            onClick={handlePlaceOrder}
          >
            PLACE ORDER
          </button>
        )}
      </div>

      <ApplyCouponModal
        handleCloseCouponDialog={handleCloseCouponDialog}
        openCouponDialog={openCouponDialog}
        onApplyCoupon={handleApplyCoupon}
        totalAmount={Number(totalAmount)}
      />
    </div>
  );
};

const CartItemsList: React.FC<Props> = ({
  cartItems,
  setMaxAllowedStep,
  setActiveStep,
  setCartItems,
  setTotalPrice,
  activeStep,
}) => {
  const { loading } = useSelector((state: RootState) => ({
    loading: state.loading["refresh-cart"],
  }));

  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const [openSizeDialog, setOpenSizeDialog] = useState<boolean>(false);
  const [openQuantityDialog, setOpenQuantityDialog] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);
  const [selectedSize, setSelectedSize] = useState<number>(0);
  const [defaultAddress, setDefaultAddress] = useState<FormAddressData | null>(
    null
  );
  const [openAddressDialog, setOpenAddressDialog] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenSizeDialog = (product: Product) => {
    setOpenSizeDialog(true);
    setSelectedProduct(product);
  };
  const handleCloseSizeDialog = () => setOpenSizeDialog(false);
  const handleDoneClick = () => setOpenSizeDialog(false);
  const handleCloseChangeAddressDialog = () => setOpenAddressDialog(false);
  const handleOpenChangeAddressDialog = () => setOpenAddressDialog(true);

  const handleOpenQuantityDialog = (product: Product) => {
    setOpenQuantityDialog(true);
    setSelectedProduct(product);
  };
  const handleCloseQuantityDialog = () => setOpenQuantityDialog(false);

  const handleSelectItem = (id: number) => {
    setCartItems((prev) => {
      const updatedCartItems = prev.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      );
      const selectedItemsCount = updatedCartItems.filter(
        (item) => item.isSelected
      ).length;
      if (selectedItemsCount <= 0) {
        dispatch(addAppliedCoupon(null));
      }
      return updatedCartItems;
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (!isChecked) {
      dispatch(addAppliedCoupon(null));
    }
    setCartItems((prev) => {
      const updatedCartItems = prev.map((item) =>
        item.isAvailable ? { ...item, isSelected: isChecked } : item
      );
      return updatedCartItems;
    });
  };

  const selectedItems = cartItems.filter(
    (item) => item.isSelected && item.isAvailable
  );

  const refreshCart = async () => {
    const response = await getCartProducts({ page: 1, pageSize: 100 });
    const items: CartItems[] = response.data.data.items.map((item: any) => ({
      ...item,
      isSelected: false,
      isAvailable: item?.quantity > 0,
    }));

    setDefaultAddress(response.data.data.defaultAddress);
    setCartItems(items);
  };

  const handleConfirmDelete = () => {
    if (!selectedProduct?.id) return;
    handleRemoveFromCart(Number(selectedItemId));
  };

  const handleRemoveFromCart = async (productId: number) => {
    setOpenConfirmDialog(false);
    await withLoading(dispatch, "remove-from-cart", async () => {
      const response = await removeFromCart(productId);
      if (response.status === 200) {
        toast.success("Item removed from Bag");
        await refreshCart();
      }
    });
  };

  const handleRemoveAllSelectedItems = async () => {
    await withLoading(dispatch, "remove-all-from-cart", async () => {
      const productIds = selectedItems.flatMap((item) => item.product_id);
      const response = await removeAllFromCart(productIds);
      if (response.status === 200) {
        toast.success("All selected items removed from Bag");
        await refreshCart();
      }
    });
  };

  const handleMoveAllSelectedItemsToWishlist = async () => {
    await withLoading(dispatch, "remove-all-to-wishlist", async () => {
      const productIds = selectedItems.flatMap((item) => item.product_id);
      const response = await moveAllFromCartToWishlist(productIds);
      if (response.status === 200) {
        toast.success("All selected items moved to wishlist");
        await refreshCart();
      }
    });
  };

  const handleAddToWishlist = async () => {
    if (!selectedProduct?.id) return;

    await withLoading(dispatch, "add-to-wishlist", async () => {
      setOpenConfirmDialog(false);
      const wishlistResponse = await postWishlist({
        product_id: Number(selectedProduct.id),
        isSoftAdd: true,
      });

      const message = wishlistResponse.data.message;
      if (message.startsWith("Added")) {
        await removeFromCart(Number(selectedItemId));
        await refreshCart();
        toast.success(message);
      } else {
        toast.info(message);
      }
    });
  };

  const handleDeleteClick = (product: Product, itemId: number) => {
    setSelectedItemId(itemId);
    setSelectedProduct(product);
    setOpenConfirmDialog(true);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      <div className="w-full lg:w-[70%] md:w-[100%]">
        {loading ? (
          <div className="flex flex-wrap">
            {[...Array(2)].map((_, i) => (
              <SkeletonProduct key={i} />
            ))}
          </div>
        ) : (
          <>
            {defaultAddress && Object.keys(defaultAddress).length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between max-h-[250px] py-2 px-4 bg-[#8bc7ff46] border border-[#eaeaec] rounded-md">
                <div>
                  <p className="text-[#282c3f] text-xs font-normal">
                    Deliver to :{" "}
                    <span className="text-[#282c3f] font-bold">
                      {defaultAddress?.full_name}, {defaultAddress?.postal_code}
                    </span>
                  </p>
                  <p className="text-[#282c3f] text-xs font-normal">
                    {defaultAddress?.address_line1},{" "}
                    {defaultAddress?.address_line2}, {defaultAddress?.city} ,{" "}
                    {defaultAddress?.state}
                  </p>
                </div>
                <button
                  onClick={handleOpenChangeAddressDialog}
                  className="cursor-pointer bg-transparent border border-[#3880FF] text-[#3880FF] text-center 
              px-[10px] w-full sm:max-w-[160px] py-[7px] my-2 sm:my-[15px] text-xs sm:text-md font-[700] rounded-md capitalize 
             hover:font-[700] transition-colors duration-300
              hover:border-[#3880FF]  focus:outline-none sm:uppercase"
                >
                  Change address
                </button>
              </div>
            )}
            <div className="flex flex-col md:flex-row justify-center items-center sm:justify-between sm:items-center my-2 sm:my-3">
              {cartItems.length > 0 && (
                <>
                  <div className="py-1 font-semibold text-gray-800 text-xs sm:text-sm normal-case sm:uppercase">
                    <Checkbox
                      sx={{
                        color: "#3880FF",
                        "&.Mui-checked": {
                          color: "#3880FF",
                        },
                      }}
                      checked={
                        selectedItems.length ===
                        cartItems.filter((i) => i.isAvailable).length
                      }
                      onChange={handleSelectAll}
                    />
                    {selectedItems.length}/{cartItems.length} Items Selected
                  </div>
                  <div className="flex w-full max-w-[310px]  items-center justify-end text-xs sm:text-sm font-semibold py-0 sm:py-2">
                    <button
                      disabled={selectedItems.length <= 0}
                      onClick={() => handleRemoveAllSelectedItems()}
                      className="cursor-pointer max-w-[100px] text-end w-full font-bold text-[#535766] p-1 text-xs sm:text-sm focus:outline-none normal-case sm:uppercase disabled:text-gray-300 disabled:cursor-not-allowed"
                    >
                      Remove All
                    </button>
                    <div className="border-l border-gray-300 h-5 mx-2" />
                    <button
                      disabled={selectedItems.length <= 0}
                      onClick={() => handleMoveAllSelectedItemsToWishlist()}
                      className="cursor-pointer max-w-[140px] sm:max-w-[150px] text-justify sm:text-center w-full font-bold text-[#535766] p-1 text-xs sm:text-sm focus:outline-none normal-case sm:uppercase disabled:text-gray-300 disabled:cursor-not-allowed"
                    >
                      Move to wishlist
                    </button>
                  </div>
                </>
              )}
            </div>
            {cartItems.length > 0 ? (
              cartItems.map((item: { [key: string]: any }) => (
                <div
                  key={item.id}
                  className="border border-[#eaeaec] rounded-md p-4 mb-2"
                >
                  <div className="relative">
                    <button
                      title="remove"
                      className="absolute right-1 text-gray-500 hover:text-black cursor-pointer hover:bg-[#f5f5f5] p-2 rounded-[50%]"
                      onClick={() => handleDeleteClick(item.product, item.id)}
                    >
                      <CloseIcon fontSize="small" />
                    </button>
                    <div className="flex flex-col justify-between items-center sm:items-start sm:justify-normal sm:flex-row">
                      <div className="max-w-[112px] max-h-[148px] h-full w-full">
                        <div className="relative flex sm:flex-row pt-4 sm:pt-0">
                          <img
                            className="cover"
                            src={item.product.image[0]}
                            alt="product-image"
                          />
                        </div>
                        <div className="absolute top-4.5 sm:top-0.5 z-1 rounded">
                          <Checkbox
                            checked={item.isSelected}
                            disabled={!item.isAvailable}
                            onChange={() => handleSelectItem(item.id)}
                            className="mr-4"
                            sx={{
                              color: "#3880FF",
                              backdropFilter: "#fff",
                              "&.Mui-checked": {
                                color: "#3880FF",
                              },
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 mx-4 pt-8 sm:pt-0 text-center sm:text-start">
                        <p className="text-xs sm:text-sm">
                          {item.product.name}
                        </p>
                        <p className="text-xs sm:text-sm">
                          {item.product.description}
                        </p>
                        <div className="flex items-center my-4 justify-center sm:justify-start">
                          <div
                            onClick={() => handleOpenSizeDialog(item.product)}
                            className="max-w-[80px] w-full bg-[#f5f5f6] px-2 py-1 flex items-center justify-between text-xs sm:text-sm cursor-pointer"
                          >
                            <span>
                              Size: {item.size_quantity.size_data.size || "S"}
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 10 6"
                              fill="currentColor"
                              className="w-2 h-2 text-gray-600 ml-1"
                            >
                              <path d="M0 0L5 6L10 0H0Z" />
                            </svg>
                          </div>
                          <div
                            onClick={() =>
                              handleOpenQuantityDialog(item.product)
                            }
                            className="max-w-[70px] w-full text-xs sm:text-sm bg-[#f5f5f6] px-2 py-1 mx-2 flex items-center justify-between cursor-pointer"
                          >
                            <span>Qty: {item.quantity}</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 10 6"
                              fill="currentColor"
                              className="w-2 h-2 text-gray-600 ml-1"
                            >
                              <path d="M0 0L5 6L10 0H0Z" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm justify-center sm:justify-start">
                          <span className="text-gray-900">
                            Rs.
                            {formatPrice(
                              Math.floor(
                                Number(item.product.price) -
                                  Number(item.product.price) *
                                    (item.product.discount / 100)
                              )
                            )}
                          </span>

                          <span className="line-through text-[#7e818c] text-xs sm:text-sm">
                            ₹{formatPrice(Number(item.product.price))}
                          </span>

                          <span className="font-normal text-[#ff905a] text-xs sm:text-sm ">
                            ({item.product.discount}%)
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm my-1 justify-center sm:justify-start">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-[#282C3F] fill-current"
                          >
                            <path
                              d="M6.63639 6.99013C6.84386 7.1976 6.84386 7.53397 6.63639 7.74143L5.7725 8.60533H8.27232C9.21251 8.60533 9.97949 7.84333 9.97949 6.89824C9.97949 5.95914 9.21859 5.19824 8.27949 5.19824H6.89116C6.59776 5.19824 6.35991 4.96039 6.35991 4.66699C6.35991 4.37359 6.59776 4.13574 6.89116 4.13574H8.27949C9.80539 4.13574 11.042 5.37234 11.042 6.89824C11.042 8.43232 9.79722 9.66783 8.27241 9.66783H5.77242L6.63639 10.5318C6.84386 10.7393 6.84386 11.0756 6.63639 11.2831C6.42893 11.4906 6.09256 11.4906 5.88509 11.2831L4.11426 9.51227C4.0417 9.43971 3.99452 9.35138 3.97271 9.25831C3.96352 9.21922 3.95866 9.17846 3.95866 9.13658C3.95866 9.05996 3.97488 8.98713 4.00407 8.92134C4.02519 8.87367 4.05366 8.82847 4.08949 8.78745C4.09828 8.77738 4.10745 8.76764 4.11697 8.75826L5.88509 6.99013C6.09256 6.78267 6.42893 6.78267 6.63639 6.99013Z"
                              fill="currentColor"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.416992 7.50033C0.416992 3.58831 3.58831 0.416992 7.50033 0.416992C11.4123 0.416992 14.5837 3.58831 14.5837 7.50033C14.5837 11.4123 11.4123 14.5837 7.50033 14.5837C3.58831 14.5837 0.416992 11.4123 0.416992 7.50033ZM7.50033 1.47949C4.17511 1.47949 1.47949 4.17511 1.47949 7.50033C1.47949 10.8255 4.17511 13.5212 7.50033 13.5212C10.8255 13.5212 13.5212 10.8255 13.5212 7.50033C13.5212 4.17511 10.8255 1.47949 7.50033 1.47949Z"
                              fill="currentColor"
                            />
                          </svg>
                          <p className="text-xs font-bold sm:text-sm">
                            14 days{" "}
                            <span className="text-xs sm:text-smfont-normal">
                              return available
                            </span>
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-sm my-0.5 justify-center sm:justify-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            className="w-4 h-3 text-green-600 fill-current"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9.775.227A.716.716 0 0 0 8.716.24L3.373 6.015a.09.09 0 0 1-.133 0L1.278 3.91a.716.716 0 0 0-1.059-.001.834.834 0 0 0 0 1.127l2.565 2.742c.14.15.33.223.53.223h.004a.71.71 0 0 0 .53-.23l5.939-6.416A.833.833 0 0 0 9.775.227"
                            />
                          </svg>

                          <p className="text-xs sm:text-sm font-normal">
                            Delivary between
                            <span className="text-xs sm:text-sm font-bold ml-1">
                              12 May - 14 May
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex flex-col items-center justify-center my-5 sm:my-12">
                <img
                  src={EmptyCart}
                  alt="empty-cart"
                  className="w-44 h-44 mb-6"
                />
                <p className="text-gray-500 text-center text-sm sm:text-lg font-semibold mb-2">
                  You haven't added any items to cart yet!
                </p>
              </div>
            )}
          </>
        )}
        <div className="flex items-center justify-between max-h-[250px] py-3 px-4 mt-5 border border-[#eaeaec] rounded-md">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="16"
              viewBox="0 0 12 16"
            >
              <path
                fill="#000"
                fill-rule="evenodd"
                d="M10.993 14.62a.067.067 0 0 1-.103.058l-4.571-2.77a.638.638 0 0 0-.64 0l-4.57 2.77a.067.067 0 0 1-.102-.058V1.133A.13.13 0 0 1 1.139 1H3.5V3.5c0 .298.18.543.486.543s.515-.245.515-.543V1h6.36a.13.13 0 0 1 .133.133V14.62zM11.307 0H.693A.687.687 0 0 0 0 .68v14.719A.61.61 0 0 0 .617 16a.63.63 0 0 0 .315-.086l4.996-3.026a.14.14 0 0 1 .144 0l4.996 3.026a.628.628 0 0 0 .315.086.61.61 0 0 0 .617-.602V.679C12 .306 11.69 0 11.307 0z"
              ></path>
            </svg>
            <p
              onClick={() => navigate("/wishlist")}
              className="text-[#282c3f] font-bold text-xs sm:text-sm ml-2 hover:underline cursor-pointer"
            >
              Add more from wishlist
            </p>
          </div>
          <div>
            <ChevronRightIcon fontSize="small" />
          </div>
        </div>
      </div>
      <div className="hidden md:block w-px bg-gray-300 mx-4" />
      <PriceSummary
        disabled={selectedItems?.length === 0 || cartItems.length <= 0}
        setActiveStep={setActiveStep}
        setMaxAllowedStep={setMaxAllowedStep}
        setCartItems={setCartItems}
        cartItems={cartItems}
        activeStep={activeStep}
        setTotalPrice={setTotalPrice}
      />

      <ConfirmDeleteModal
        handleAddToWishlist={handleAddToWishlist}
        handleCloseConfirmDialog={() => setOpenConfirmDialog(false)}
        handleConfirmDelete={handleConfirmDelete}
        openConfirmDialog={openConfirmDialog}
        selectedProduct={selectedProduct as Product}
      />

      <SizeModal
        handleCloseSizeDialog={handleCloseSizeDialog}
        openSizeDialog={openSizeDialog}
        selectedProduct={selectedProduct as Product}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        handleDoneClick={handleDoneClick}
      />
      <QuantityModal
        handleCloseQuantityDialog={handleCloseQuantityDialog}
        openQuantityDialog={openQuantityDialog}
        selectedQuantity={selectedQuantity as number}
        setSelectedQuantity={setSelectedQuantity}
      />

      <ChangeAddressModal
        handleCloseAddressDialog={handleCloseChangeAddressDialog}
        openAddressDialog={openAddressDialog}
        setDefaultAddress={setDefaultAddress}
      />
    </div>
  );
};
