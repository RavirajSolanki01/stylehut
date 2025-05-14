import { useState } from "react";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import StarIcon from "../../../assets/Cart/SVGs/StarIcon";
import CODIcon from "../../../assets/Cart/SVGs/CODIcon";
import CardIcon from "../../../assets/Cart/SVGs/CardIcon";
import PayLaterIcon from "../../../assets/Cart/SVGs/PayLaterIcon";
import WalletIcon from "../../../assets/Cart/SVGs/WalletIcon";
import EMIIcon from "../../../assets/Cart/SVGs/EMIIcon";
import NetBankingIcon from "../../../assets/Cart/SVGs/NetBankingIcon";
import UPIIcon from "../../../assets/Cart/SVGs/UPIIcon";
import CloseIcon from "@mui/icons-material/Close";
import GiftCardIcon from "../../../assets/Cart/SVGs/GiftCardIcon";
import { offers_list } from "../../../utils/constants";

const PaymentScreen = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("Recommended");

  const [cardNumber, setCardNumber] = useState("");
  const [cardPin, setCardPin] = useState("");
  const [isGiftCardOpen, setIsGiftCardOpen] = useState(false);

  const [showMore, setShowMore] = useState(false);

  const visibleOffers = showMore ? offers_list : offers_list.slice(0, 1);

  const isValidCardNumber = (value: string) => /^\d{16}$/.test(value);
  const isValidCardPin = (value: string) => /^\d{6}$/.test(value);

  const handleApply = () => {
    if (isValidCardNumber(cardNumber) && isValidCardPin(cardPin)) {
      setIsGiftCardOpen(false);
    } else {
      alert("Please enter a valid 16-digit card number and 6-digit PIN.");
    }
  };

  const handlePaymentChange = (data: string) => {
    setSelectedPaymentMethod(data);
  };

  const paymentMethods = [
    { icon: <StarIcon />, label: "Recommended" },
    { icon: <CODIcon />, label: "Cash On Delivery" },
    {
      icon: <UPIIcon />,
      label: "UPI (Pay via any App)",
    },
    {
      icon: <CardIcon />,
      label: "Credit/Debit Card",
      secondary: "10 Offers",
    },
    { icon: <PayLaterIcon />, label: "Pay Later" },
    {
      icon: <WalletIcon />,
      label: "Wallets",
      secondary: "1 Offer",
    },
    { icon: <EMIIcon />, label: "EMI" },
    {
      icon: <NetBankingIcon />,
      label: "Net Banking",
      secondary: "1 Offer",
    },
  ];

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
            <List sx={{ width: "40%", padding: 0 }}>
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
                    {method.icon}
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
                          fontSize: "14px !important",
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
                          fontSize: "12px !important",
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
            <Box sx={{ padding: "10px" }}>
              <p className="text-[16px] font-bold text-[#424553]">
                Recommended Payment Options
              </p>
              <Typography
                sx={{
                  fontSize: "14px !important",
                  color: "#424553",
                }}
              >
                Cash on Delivery (Cash/UPI)
              </Typography>
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
