import { ChangeEvent, FormEvent, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Button,
  FormHelperText,
  SvgIcon,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CODIcon from "../../../assets/Cart/SVGs/CODIcon";
import UPIIcon from "../../../assets/Cart/SVGs/UPIIcon";
import CloseIcon from "@mui/icons-material/Close";
import GiftCardIcon from "../../../assets/Cart/SVGs/GiftCardIcon";
import {
  all_banks_list_for_net_banking,
  emi_bank_details,
  highlighted_net_banking_options,
  offers_list,
  paymentMethods,
} from "../../../utils/constants";
import { CustomRadioButton } from "../../../components/UserProfile/Addresses";
import QRIcon from "../../../assets/Cart/SVGs/QRIcon";
import { toast } from "react-toastify";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

type Props = {
  totalPrice: string;
};

interface CardFormData {
  cardNumber: string;
  nameOnCard: string;
  expiry: string;
  cvv: string;
}

const PaymentScreen: React.FC<Props> = ({ totalPrice }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("Recommended");
  const [selectedSubPaymentMethod, setSelectedSubPaymentMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [upiError, setUpiError] = useState("");
  const [selectedBankFromOther, setSelectedBankFromOther] =
    useState("Other Banks");
  const [isSelectingOtherBank, setIsSelectingOtherBank] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardPin, setCardPin] = useState("");
  const [isGiftCardOpen, setIsGiftCardOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const [formData, setFormData] = useState<CardFormData>({
    cardNumber: "",
    nameOnCard: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<Partial<CardFormData>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: Partial<CardFormData> = {};

    if (!/^\d{16}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!formData.nameOnCard.trim()) {
      newErrors.nameOnCard = "Name is required";
    }

    if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = "Format MM/YY";
    }

    if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "Invalid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      toast.success("Payment submitted successfully!");
    }
  };

  const visibleOffers = showMore ? offers_list : offers_list.slice(0, 1);

  const isValidCardNumber = (value: string) => /^\d{16}$/.test(value);
  const isValidCardPin = (value: string) => /^\d{6}$/.test(value);

  const validateUpiId = (id: string) => {
    const regex = /^[\w.-]+@[\w.-]+$/;
    return regex.test(id);
  };

  const handlePayNow = () => {
    if (!upiId.trim()) {
      setUpiError("UPI ID is required");
    } else if (!validateUpiId(upiId.trim())) {
      setUpiError("Invalid UPI ID format");
    } else {
      setUpiError("");
      toast.success(`Processing payment for: ${upiId}`);
      setUpiId("");
    }
  };

  const handleApply = () => {
    if (isValidCardNumber(cardNumber) && isValidCardPin(cardPin)) {
      setIsGiftCardOpen(false);
    } else {
      toast.error("Please enter a valid 16-digit card number and 6-digit PIN.");
    }
  };

  const handlePaymentChange = (data: string) => {
    setSelectedPaymentMethod(data);
    setSelectedSubPaymentMethod("");
  };

  const handleSubpaymentValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedSubPaymentMethod(event.target.value);
  };

  return (
    <Box className="p-4 flex flex-col md:flex-row gap-6">
      <Box className="flex-1">
        <Paper className="p-4 !border-none !shadow-none">
          <Box className="mb-4 border border-gray-200 rounded p-4">
            <Typography variant="subtitle1" fontWeight="bold">
              Bank Offer
            </Typography>
            {visibleOffers.map((offer, index) => (
              <Typography key={index} variant="body2" className="mt-1">
                • {offer}
              </Typography>
            ))}
            <Box
              className="mt-1 text-sm text-[#3880FF] font-medium flex items-center gap-1 cursor-pointer"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? (
                <>
                  Show Less <ExpandLessIcon fontSize="small" />
                </>
              ) : (
                <>
                  Show More <ExpandMoreIcon fontSize="small" />
                </>
              )}
            </Box>
          </Box>

          <p className="text-[16px] font-bold">Choose Payment Mode</p>

          <Box
            sx={{ width: "100%", display: "flex", marginY: "20px" }}
            className="border border-gray-200 rounded"
          >
            <List sx={{ width: "50%", padding: 0 }}>
              {paymentMethods.map((method, index) => (
                <ListItem
                  key={index}
                  sx={{
                    cursor: "pointer",
                    border: "1px solid #eaeaec",
                    borderLeft:
                      selectedPaymentMethod === method.label
                        ? "4px solid #3880FF"
                        : "1px solid #eaeaec",
                    backgroundColor:
                      selectedPaymentMethod === method.label
                        ? "white"
                        : "#dbdbdb5a",
                  }}
                  onClick={() => handlePaymentChange(method.label)}
                >
                  <ListItemIcon
                    sx={{ minWidth: "max-content", marginRight: "10px" }}
                  >
                    {<method.icon />}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      display: "flex",
                      fontFamily:
                        "Assistant,Helvetica,Arial,sans-serif !important",
                    }}
                    primary={
                      <Typography
                        sx={{
                          fontSize: "12px !important",
                          color:
                            selectedPaymentMethod === method.label
                              ? "#3880FF"
                              : "#424553",
                        }}
                      >
                        {method.label} &nbsp;
                      </Typography>
                    }
                    secondary={
                      <Typography
                        sx={{
                          fontSize: "10px !important",
                          color: "#03a685",
                        }}
                      >
                        {method.secondary}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Box sx={{ padding: "10px", width: "100%" }}>
              {selectedPaymentMethod === "Recommended" && (
                <Box sx={{ width: "100%" }}>
                  <p className="text-[16px] font-bold text-[#424553]">
                    Recommended Payment Options
                  </p>
                  <Box
                    sx={{
                      width: "100%",
                      fontSize: "14px !important",
                      color: "#424553",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "10px",
                      padding: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "80%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <CustomRadioButton
                        size="small"
                        value={"COD"}
                        checked={
                          selectedPaymentMethod === "Recommended" &&
                          selectedSubPaymentMethod === "COD"
                        }
                        onChange={handleSubpaymentValueChange}
                      />
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "14px !important",
                            color: "#000",
                            fontWeight:
                              selectedPaymentMethod === "Recommended" &&
                              selectedSubPaymentMethod === "COD"
                                ? "bold"
                                : "normal",
                          }}
                        >
                          Cash on Delivery (Cash/UPI)
                        </Typography>
                        {selectedPaymentMethod === "Recommended" &&
                          selectedSubPaymentMethod === "COD" && (
                            <Typography
                              sx={{
                                fontSize: "12px !important",
                                color: "#424553",
                                marginTop: "10px",
                              }}
                            >
                              You can pay via Cash/UPI on delivery.
                            </Typography>
                          )}
                      </Box>
                    </Box>
                    <IconButton
                      sx={{
                        border: "1px solid #e9e9eb",
                        padding: "5px",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                    >
                      <CODIcon />
                    </IconButton>
                  </Box>
                  {selectedPaymentMethod === "Recommended" &&
                    selectedSubPaymentMethod === "COD" && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        <button className="w-full max-w-sm mt-4 cursor-pointer rounded-[4px] bg-[#3880FF] text-white text-xs sm:text-sm font-semibold py-2 disabled:bg-[#ffeaef]">
                          PLACE ORDER
                        </button>
                      </Box>
                    )}
                </Box>
              )}
              {selectedPaymentMethod === "Cash On Delivery" && (
                <>
                  <p className="text-[16px] font-bold text-[#424553]">
                    Cash on Delivery (Cash/UPI)
                  </p>
                  <Box
                    sx={{
                      width: "100%",
                      fontSize: "14px !important",
                      color: "#424553",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "10px",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "80%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <CustomRadioButton
                        size="small"
                        value={"COD"}
                        checked={
                          selectedPaymentMethod === "Cash On Delivery" &&
                          selectedSubPaymentMethod === "COD"
                        }
                        onChange={handleSubpaymentValueChange}
                      />
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "14px !important",
                            color: "#000",
                            fontWeight:
                              selectedPaymentMethod === "Cash On Delivery" &&
                              selectedSubPaymentMethod === "COD"
                                ? "bold"
                                : "normal",
                          }}
                        >
                          Cash on Delivery (Cash/UPI)
                        </Typography>
                        {selectedPaymentMethod === "Cash On Delivery" &&
                          selectedSubPaymentMethod === "COD" && (
                            <Typography
                              sx={{
                                fontSize: "12px !important",
                                color: "#424553",
                                marginTop: "10px",
                              }}
                            >
                              You can pay via Cash/UPI on delivery.
                            </Typography>
                          )}
                      </Box>
                    </div>
                  </Box>
                  {selectedPaymentMethod === "Cash On Delivery" &&
                    selectedSubPaymentMethod === "COD" && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        <button className="w-full max-w-sm mt-4 cursor-pointer rounded-[4px] bg-[#3880FF] text-white text-xs sm:text-sm font-semibold py-2 disabled:bg-[#ffeaef]">
                          PLACE ORDER
                        </button>
                      </Box>
                    )}
                </>
              )}
              {selectedPaymentMethod === "UPI (Pay via any App)" && (
                <>
                  <p className="text-[16px] font-bold text-[#424553]">
                    Pay using UPI
                  </p>
                  <Box
                    sx={{
                      width: "100%",
                      fontSize: "14px !important",
                      color: "#424553",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "10px",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "80%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <CustomRadioButton
                        size="small"
                        value={"QR"}
                        checked={
                          selectedPaymentMethod === "UPI (Pay via any App)" &&
                          selectedSubPaymentMethod === "QR"
                        }
                        onChange={handleSubpaymentValueChange}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          sx={{
                            border: "1px solid #e9e9eb",
                            padding: "5px",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                          }}
                        >
                          <QRIcon />
                        </IconButton>
                        &nbsp;
                        <Typography
                          sx={{
                            fontSize: "14px !important",
                            color: "#000",
                            fontWeight:
                              selectedSubPaymentMethod === "QR"
                                ? "bold"
                                : "normal",
                          }}
                        >
                          Scan & Pay
                        </Typography>
                      </Box>
                    </div>
                  </Box>
                  {selectedPaymentMethod === "UPI (Pay via any App)" &&
                    selectedSubPaymentMethod === "QR" && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        <button className="w-full max-w-sm mt-4 cursor-pointer rounded-[4px] bg-[#3880FF] text-white text-xs sm:text-sm font-semibold py-2 disabled:bg-[#ffeaef]">
                          PAY NOW
                        </button>
                      </Box>
                    )}
                  <Box
                    sx={{
                      width: "100%",
                      fontSize: "14px !important",
                      color: "#424553",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "10px",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "80%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <CustomRadioButton
                        size="small"
                        value={"UPI"}
                        checked={
                          selectedPaymentMethod === "UPI (Pay via any App)" &&
                          selectedSubPaymentMethod === "UPI"
                        }
                        onChange={handleSubpaymentValueChange}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          sx={{
                            border: "1px solid #e9e9eb",
                            padding: "5px",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                          }}
                        >
                          <UPIIcon />
                        </IconButton>
                        &nbsp;
                        <Typography
                          sx={{
                            fontSize: "14px !important",
                            color: "#000",
                            fontWeight:
                              selectedSubPaymentMethod === "UPI"
                                ? "bold"
                                : "normal",
                          }}
                        >
                          Enter UPI ID
                        </Typography>
                      </Box>
                    </div>
                  </Box>
                  {selectedPaymentMethod === "UPI (Pay via any App)" &&
                    selectedSubPaymentMethod === "UPI" && (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            boxSizing: "border-box",
                          }}
                        >
                          <TextField
                            placeholder="Enter UPI ID here"
                            variant="outlined"
                            className="!max-w-sm"
                            fullWidth
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            error={!!upiError}
                          />
                          {upiError && (
                            <FormHelperText error>{upiError}</FormHelperText>
                          )}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            boxSizing: "border-box",
                          }}
                          onClick={handlePayNow}
                        >
                          <button className="w-full max-w-sm mt-4 cursor-pointer rounded-[4px] bg-[#3880FF] text-white text-xs sm:text-sm font-semibold py-2 disabled:bg-[#ffeaef]">
                            PAY NOW
                          </button>
                        </Box>
                      </>
                    )}
                </>
              )}
              {selectedPaymentMethod === "Credit/Debit Card" && (
                <>
                  <p className="text-[16px] font-bold text-[#424553]">
                    CREDIT/ DEBIT CARD
                  </p>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ mt: 2, mb: 1, fontSize: "12px" }}
                    >
                      Please ensure your card can be used for online
                      transactions.
                    </Typography>
                    <Typography
                      variant="body2"
                      color="error"
                      sx={{ mb: 2, fontWeight: 600, cursor: "pointer" }}
                    >
                      Know More
                    </Typography>

                    <form onSubmit={handleSubmit}>
                      <TextField
                        fullWidth
                        label="Card Number"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        error={!!errors.cardNumber}
                        helperText={errors.cardNumber}
                        margin="normal"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <CreditCardIcon />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        fullWidth
                        label="Name on card"
                        name="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={handleChange}
                        error={!!errors.nameOnCard}
                        helperText={errors.nameOnCard}
                        margin="normal"
                      />

                      <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
                        <TextField
                          label="Valid Thru (MM/YY)"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleChange}
                          error={!!errors.expiry}
                          helperText={errors.expiry}
                          fullWidth
                          sx={{ flex: "1 1 40%" }}
                        />

                        <TextField
                          label="CVV"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          error={!!errors.cvv}
                          helperText={errors.cvv}
                          fullWidth
                          sx={{ flex: "1 1 40%" }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Tooltip title="3 or 4 digit code on the back of your card">
                                  <IconButton tabIndex={-1}>
                                    <InfoOutlinedIcon />
                                  </IconButton>
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Box>

                      <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{
                          mt: 3,
                          backgroundColor: "#ff416c",
                          "&:hover": { backgroundColor: "#ff2450" },
                          fontWeight: "bold",
                        }}
                      >
                        PAY NOW
                      </Button>
                    </form>
                  </Box>
                </>
              )}
              {selectedPaymentMethod === "Pay Later" && (
                <>
                  <p className="text-[16px] font-bold text-[#424553]">
                    Select Pay Later to pay
                  </p>
                  <Box
                    sx={{
                      width: "100%",
                      fontSize: "14px !important",
                      color: "#424553",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "10px",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "80%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <CustomRadioButton
                        size="small"
                        value={"simpl"}
                        disabled
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          disabled
                          sx={{
                            border: "1px solid #e9e9eb",
                            padding: "5px",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                          }}
                        >
                          <img
                            src="https://constant.myntassets.com/checkout/assets/img/simpl.webp"
                            alt="Simpl"
                            style={{ borderRadius: "20px" }}
                          />
                        </IconButton>
                        &nbsp;
                        <Typography
                          sx={{
                            fontSize: "14px !important",
                            color: "#a9abb3",
                            fontWeight: "normal",
                          }}
                        >
                          Simpl
                          <Typography
                            sx={{
                              fontSize: "12px !important",
                              color: "#ff5722",
                              fontWeight: "normal",
                            }}
                          >
                            Not Eligible
                          </Typography>
                        </Typography>
                      </Box>
                    </div>
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      fontSize: "14px !important",
                      color: "#424553",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "10px",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "80%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <CustomRadioButton
                        size="small"
                        value={"lazypay"}
                        checked={
                          selectedPaymentMethod === "Pay Later" &&
                          selectedSubPaymentMethod === "lazypay"
                        }
                        onChange={handleSubpaymentValueChange}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          sx={{
                            border: "1px solid #e9e9eb",
                            padding: "5px",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                          }}
                        >
                          <img
                            src="https://constant.myntassets.com/checkout/assets/img/lazypay.png"
                            alt="LazyPay"
                            style={{
                              borderRadius: "20px",
                              width: "120px",
                              height: "auto",
                            }}
                          />
                        </IconButton>
                        &nbsp;
                        <Typography
                          sx={{
                            fontSize: "14px !important",
                            color: "#000",
                            fontWeight:
                              selectedSubPaymentMethod === "lazypay"
                                ? "bold"
                                : "normal",
                          }}
                        >
                          Lazypay
                        </Typography>
                      </Box>
                    </div>
                  </Box>
                  {selectedPaymentMethod === "Pay Later" &&
                    selectedSubPaymentMethod === "lazypay" && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        <button className="w-full max-w-sm mt-4 cursor-pointer rounded-[4px] bg-[#3880FF] text-white text-xs sm:text-sm font-semibold py-2 disabled:bg-[#ffeaef]">
                          PAY NOW
                        </button>
                      </Box>
                    )}
                </>
              )}
              {selectedPaymentMethod === "Wallets" && (
                <>
                  <p className="text-[16px] font-bold text-[#424553]">
                    Select wallet to pay
                  </p>
                  <Box
                    sx={{
                      width: "100%",
                      fontSize: "14px !important",
                      color: "#424553",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "10px",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "80%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <CustomRadioButton
                        size="small"
                        value={"mobikwik"}
                        checked={
                          selectedPaymentMethod === "Wallets" &&
                          selectedSubPaymentMethod === "mobikwik"
                        }
                        onChange={handleSubpaymentValueChange}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          sx={{
                            border: "1px solid #e9e9eb",
                            padding: "5px",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                          }}
                        >
                          <img
                            src="https://constant.myntassets.com/checkout/assets/img/mobikwik.png"
                            alt="image"
                            style={{ borderRadius: "20px" }}
                          />
                        </IconButton>
                        &nbsp;
                        <Typography
                          sx={{
                            fontSize: "14px !important",
                            color: "#000",
                            fontWeight:
                              selectedSubPaymentMethod === "mobikwik"
                                ? "bold"
                                : "normal",
                          }}
                        >
                          Mobikwik
                        </Typography>
                      </Box>
                    </div>
                  </Box>
                  {selectedPaymentMethod === "Wallets" &&
                    selectedSubPaymentMethod === "mobikwik" && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        <button className="w-full max-w-sm mt-4 cursor-pointer rounded-[4px] bg-[#3880FF] text-white text-xs sm:text-sm font-semibold py-2 disabled:bg-[#ffeaef]">
                          PAY NOW
                        </button>
                      </Box>
                    )}
                  <Box
                    sx={{
                      width: "100%",
                      fontSize: "14px !important",
                      color: "#424553",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "10px",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "80%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <CustomRadioButton
                        size="small"
                        value={"airtelpaymentbank"}
                        checked={
                          selectedPaymentMethod === "Wallets" &&
                          selectedSubPaymentMethod === "airtelpaymentbank"
                        }
                        onChange={handleSubpaymentValueChange}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          sx={{
                            border: "1px solid #e9e9eb",
                            padding: "5px",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                          }}
                        >
                          <img
                            src="https://constant.myntassets.com/checkout/assets/img/airtelpaymentsbank.webp"
                            alt="image"
                            style={{ borderRadius: "20px" }}
                          />
                        </IconButton>
                        &nbsp;
                        <Typography
                          sx={{
                            fontSize: "14px !important",
                            color: "#000",
                            fontWeight:
                              selectedSubPaymentMethod === "airtelpaymentbank"
                                ? "bold"
                                : "normal",
                          }}
                        >
                          Airtel Payments Bank
                        </Typography>
                      </Box>
                    </div>
                  </Box>
                  {selectedPaymentMethod === "Wallets" &&
                    selectedSubPaymentMethod === "airtelpaymentbank" && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        <button className="w-full max-w-sm mt-4 cursor-pointer rounded-[4px] bg-[#3880FF] text-white text-xs sm:text-sm font-semibold py-2 disabled:bg-[#ffeaef]">
                          PAY NOW
                        </button>
                      </Box>
                    )}
                  <Box
                    sx={{
                      width: "100%",
                      fontSize: "14px !important",
                      color: "#424553",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "10px",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "80%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <CustomRadioButton
                        size="small"
                        value={"payzapp"}
                        checked={
                          selectedPaymentMethod === "Wallets" &&
                          selectedSubPaymentMethod === "payzapp"
                        }
                        onChange={handleSubpaymentValueChange}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          sx={{
                            border: "1px solid #e9e9eb",
                            padding: "5px",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                          }}
                        >
                          <img
                            src="https://constant.myntassets.com/checkout/assets/img/payzapp.png"
                            alt="image"
                            style={{ borderRadius: "20px" }}
                          />
                        </IconButton>
                        &nbsp;
                        <Typography
                          sx={{
                            fontSize: "14px !important",
                            color: "#000",
                            fontWeight:
                              selectedSubPaymentMethod === "payzapp"
                                ? "bold"
                                : "normal",
                          }}
                        >
                          PayZapp
                        </Typography>
                      </Box>
                    </div>
                  </Box>
                  {selectedPaymentMethod === "Wallets" &&
                    selectedSubPaymentMethod === "payzapp" && (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            boxSizing: "border-box",
                          }}
                        >
                          <button className="w-full max-w-sm mt-4 cursor-pointer rounded-[4px] bg-[#3880FF] text-white text-xs sm:text-sm font-semibold py-2 disabled:bg-[#ffeaef]">
                            PAY NOW
                          </button>
                          <Typography
                            sx={{
                              fontSize: "12px !important",
                              color: "#ff5722",
                              fontWeight: "normal",
                            }}
                            className="w-full max-w-sm"
                          >
                            PayZapp is currently facing low success rate.
                          </Typography>
                        </Box>
                      </>
                    )}
                  <Box
                    sx={{
                      width: "100%",
                      fontSize: "14px !important",
                      color: "#424553",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "10px",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "80%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <CustomRadioButton
                        size="small"
                        value={"freecharge"}
                        checked={
                          selectedPaymentMethod === "Wallets" &&
                          selectedSubPaymentMethod === "freecharge"
                        }
                        onChange={handleSubpaymentValueChange}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          sx={{
                            border: "1px solid #e9e9eb",
                            padding: "5px",
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                          }}
                        >
                          <img
                            src="https://constant.myntassets.com/checkout/assets/img/freecharge.png"
                            alt="image"
                            style={{ borderRadius: "20px" }}
                          />
                        </IconButton>
                        &nbsp;
                        <Typography
                          sx={{
                            fontSize: "14px !important",
                            color: "#000",
                            fontWeight:
                              selectedSubPaymentMethod === "freecharge"
                                ? "bold"
                                : "normal",
                          }}
                        >
                          Freecharge (Wallet + Pay Later)
                        </Typography>
                      </Box>
                    </div>
                  </Box>
                  {selectedPaymentMethod === "Wallets" &&
                    selectedSubPaymentMethod === "freecharge" && (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            boxSizing: "border-box",
                          }}
                        >
                          <button className="w-full max-w-sm mt-4 cursor-pointer rounded-[4px] bg-[#3880FF] text-white text-xs sm:text-sm font-semibold py-2 disabled:bg-[#ffeaef]">
                            PAY NOW
                          </button>
                        </Box>
                      </>
                    )}
                  <Box
                    sx={{
                      width: "100%",
                      fontSize: "14px !important",
                      color: "#424553",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "10px",
                      padding: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "80%",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <CustomRadioButton size="small" disabled />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <IconButton
                            disabled
                            sx={{
                              border: "1px solid #e9e9eb",
                              padding: "5px",
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                            }}
                          >
                            <img
                              src="https://constant.myntassets.com/checkout/assets/img/olamoney.webp"
                              alt="Simpl"
                              style={{ borderRadius: "20px" }}
                            />
                          </IconButton>
                          &nbsp;
                          <Typography
                            sx={{
                              fontSize: "14px !important",
                              color: "#a9abb3",
                              fontWeight: "normal",
                            }}
                          >
                            OlaMoney (Wallet + Postpaid)
                          </Typography>
                        </Box>
                      </div>
                      <Typography
                        sx={{
                          fontSize: "12px !important",
                          color: "#ff5722",
                          fontWeight: "normal",
                        }}
                      >
                        OlaMoney (Wallet + Postpaid) is currently facing high
                        failure rate.
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
              {selectedPaymentMethod === "EMI" && (
                <>
                  <p className="text-[16px] font-bold text-[#424553]">
                    Select EMI Option
                  </p>
                  {emi_bank_details.map((bank) => {
                    return (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "80%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <CustomRadioButton
                            size="small"
                            disabled={
                              parseInt(totalPrice) <
                              parseInt(bank.minimum_order_value)
                            }
                            checked={
                              selectedPaymentMethod === "EMI" &&
                              selectedSubPaymentMethod === bank.label
                            }
                            value={bank.label}
                            onChange={handleSubpaymentValueChange}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              disabled
                              sx={{
                                border: "1px solid #e9e9eb",
                                padding: "5px",
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                              }}
                            >
                              <img
                                src={bank.image}
                                alt={bank.label}
                                style={{ borderRadius: "20px" }}
                              />
                            </IconButton>
                            &nbsp;
                            <Typography
                              sx={{
                                fontSize: "14px !important",
                                color:
                                  parseInt(totalPrice) <
                                  parseInt(bank.minimum_order_value)
                                    ? "#a9abb3"
                                    : "#282c3f",
                                fontWeight: "normal",
                              }}
                            >
                              {bank.label}
                            </Typography>
                          </Box>
                        </div>
                        {parseInt(totalPrice) <
                          parseInt(bank.minimum_order_value) && (
                          <Typography
                            sx={{
                              fontSize: "12px !important",
                              color: "#d97008",
                              fontWeight:
                                selectedPaymentMethod === "EMI" &&
                                selectedSubPaymentMethod === bank.label
                                  ? "bold"
                                  : "normal",
                            }}
                          >
                            {`Available on min. order of ₹${bank.minimum_order_value}`}
                          </Typography>
                        )}
                        {selectedPaymentMethod === "EMI" &&
                          selectedSubPaymentMethod === bank.label && (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                boxSizing: "border-box",
                              }}
                            >
                              <button className="w-full max-w-sm mt-4 cursor-pointer rounded-[4px] bg-[#3880FF] text-white text-xs sm:text-sm font-semibold py-2 disabled:bg-[#ffeaef]">
                                PAY NOW
                              </button>
                            </Box>
                          )}
                      </Box>
                    );
                  })}
                </>
              )}
              {selectedPaymentMethod === "Net Banking" && (
                <>
                  <p className="text-[16px] font-bold text-[#424553]">
                    Net Banking
                  </p>
                  {highlighted_net_banking_options.map((bank) => {
                    return (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "80%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <CustomRadioButton
                            size="small"
                            checked={
                              selectedPaymentMethod === "Net Banking" &&
                              selectedSubPaymentMethod === bank.name
                            }
                            value={bank.name}
                            onChange={handleSubpaymentValueChange}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              disabled
                              sx={{
                                border: "1px solid #e9e9eb",
                                padding: "5px",
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                              }}
                            >
                              <img
                                src={bank.image}
                                alt={bank.name}
                                style={{ borderRadius: "20px" }}
                              />
                            </IconButton>
                            &nbsp;
                            <Typography
                              sx={{
                                fontSize: "14px !important",
                                color: "#282c3f",
                                fontWeight:
                                  selectedPaymentMethod === "Net Banking" &&
                                  selectedSubPaymentMethod === bank.name
                                    ? "bold"
                                    : "normal",
                              }}
                            >
                              {bank.name}
                            </Typography>
                          </Box>
                        </div>

                        {selectedPaymentMethod === "Net Banking" &&
                          selectedSubPaymentMethod === bank.name && (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                boxSizing: "border-box",
                              }}
                            >
                              <button className="w-full max-w-sm mt-4 cursor-pointer rounded-[4px] bg-[#3880FF] text-white text-xs sm:text-sm font-semibold py-2 disabled:bg-[#ffeaef]">
                                PAY NOW
                              </button>
                            </Box>
                          )}
                      </Box>
                    );
                  })}
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    padding="8px 12px"
                    border="1px solid #ccc"
                    borderRadius="4px"
                    sx={{
                      cursor: "pointer",
                      backgroundColor: "#fff",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                      },
                      marginTop: "10px",
                      width: "100%",
                    }}
                    onClick={() => setIsSelectingOtherBank(true)}
                  >
                    <Box display="flex" flexDirection="column" width={"100%"}>
                      <Typography variant="body2" fontWeight={500}>
                        {selectedBankFromOther}
                      </Typography>
                    </Box>
                    <SvgIcon
                      sx={{ width: 6, height: 3, ml: 1 }}
                      viewBox="0 0 6 3"
                      component="svg"
                    >
                      <path fillRule="evenodd" d="M0 0h6L3 3z" />
                    </SvgIcon>
                  </Box>
                  {selectedPaymentMethod === "Net Banking" &&
                    selectedBankFromOther !== "Other Banks" && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      >
                        <button className="w-full max-w-sm mt-4 cursor-pointer rounded-[4px] bg-[#3880FF] text-white text-xs sm:text-sm font-semibold py-2 disabled:bg-[#ffeaef]">
                          PAY NOW
                        </button>
                      </Box>
                    )}
                  {isSelectingOtherBank && (
                    <Dialog
                      open={isSelectingOtherBank}
                      onClose={() => setIsSelectingOtherBank(true)}
                      maxWidth="xs"
                      fullWidth
                    >
                      <DialogTitle
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          color: "#424553",
                          fontSize: "14px",
                        }}
                      >
                        Select Bank
                        <IconButton
                          onClick={() => setIsSelectingOtherBank(true)}
                          size="small"
                        >
                          <CloseIcon />
                        </IconButton>
                      </DialogTitle>
                      <DialogContent>
                        {all_banks_list_for_net_banking.map((bank) => {
                          return (
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                cursor: "pointer",
                                padding: "5px",
                              }}
                              onClick={() => {
                                setSelectedBankFromOther(bank.name);
                                setIsSelectingOtherBank(false);
                              }}
                            >
                              <div
                                style={{
                                  width: "80%",
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                                  <IconButton
                                    disabled
                                    sx={{
                                      border: "1px solid #e9e9eb",
                                      padding: "5px",
                                      width: "30px",
                                      height: "30px",
                                      borderRadius: "50%",
                                    }}
                                  >
                                    <img
                                      src={bank.image}
                                      alt={bank.name}
                                      style={{ borderRadius: "20px" }}
                                    />
                                  </IconButton>
                                  &nbsp;
                                  <Typography
                                    sx={{
                                      fontSize: "14px !important",
                                      color: "#282c3f",
                                      fontWeight:
                                        selectedPaymentMethod ===
                                          "Net Banking" &&
                                        selectedSubPaymentMethod === bank.name
                                          ? "bold"
                                          : "normal",
                                    }}
                                  >
                                    {bank.name}
                                  </Typography>
                                </Box>
                              </div>
                            </Box>
                          );
                        })}
                      </DialogContent>
                    </Dialog>
                  )}
                </>
              )}
            </Box>
          </Box>

          <div className="flex align-center justify-between rounded shadow-sm mb-4 transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] cursor-pointer text-[#3880FF] p-4 border border-gray-200">
            <span className="text-[#424553] flex align-center">
              <GiftCardIcon /> &nbsp; Have A Gift Card ?
            </span>
            <span onClick={() => setIsGiftCardOpen(true)}>APPLY GIFT CARD</span>
          </div>
        </Paper>
      </Box>
      {isGiftCardOpen && (
        <Dialog
          open={isGiftCardOpen}
          onClose={() => setIsGiftCardOpen(false)}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#424553",
              fontSize: "14px",
            }}
          >
            Apply Gift Card
            <IconButton onClick={() => setIsGiftCardOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography
              variant="body2"
              color="#424553"
              sx={{ mb: 2, fontSize: "12px" }}
            >
              Gift card value will be added to your Myntra Credit.
            </Typography>
            <TextField
              fullWidth
              label="16 Digits Gift Card Number"
              variant="outlined"
              inputProps={{ maxLength: 16 }}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="6 Digits Gift Card Pin"
              variant="outlined"
              type="password"
              inputProps={{ maxLength: 6 }}
              value={cardPin}
              onChange={(e) => setCardPin(e.target.value.replace(/\D/g, ""))}
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleApply}
              disabled={
                !isValidCardNumber(cardNumber) || !isValidCardPin(cardPin)
              }
              sx={{
                textTransform: "none",
                backgroundColor: "#3880FF",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#3880FF",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#d3d3d3",
                  color: "#fff",
                },
              }}
            >
              Add to Myntra Credit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default PaymentScreen;
