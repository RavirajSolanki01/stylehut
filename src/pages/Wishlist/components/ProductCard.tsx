import { Box, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../utils/reusable-functions";
import { toast } from "react-toastify";
import { postAddToCart } from "../../../services/cartService";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../store/slice/loading.slice";

interface ProductCardProps {
  product: any;
  onRemove: (product_id: number) => void;
  imageHeight?: number;
  bottomLabel: string;
  showOutOfStock?: boolean;
  fetchWishlist: () => void;
}

const ProductCardBase = ({
  product,
  onRemove,
  imageHeight = 280,
  bottomLabel,
  showOutOfStock = false,
  fetchWishlist,
}: ProductCardProps) => {
  const productData = product.products;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getDiscountedPrice = (price: number, discountPercent: number): number =>
    Math.floor(price - (price * discountPercent) / 100);

  const handleGotoProduct = (product_id: number) => {
    navigate(`/product-detail/${product_id}`);
  };

  const handleAddToCard = async (id: Number) => {
    try {
      dispatch(setLoading({ key: "Add-to-cart", value: true }));
      await postAddToCart({
        product_id: Number(id),
        quantity: 1,
      });
      toast.success("Product added to cart");
      fetchWishlist();
    } catch (error: unknown) {
      const errorMessage =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as any).response?.data?.message === "string"
          ? (error as any).response.data.message
          : "";

      if (errorMessage.startsWith("Unauthorized")) {
        toast.error("Please login to add to cart");
      } else {
        toast.error("Unexpected error occurred. Please try again later!");
      }
    } finally {
      dispatch(setLoading({ key: "Add-to-cart", value: false }));
    }
  };
  return (
    <Box
      sx={{
        width: 240,
        m: 1,
        border: "1px solid #e0e0e0",
        borderRadius: 1,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Box
          onClick={() => handleGotoProduct(productData?.id)}
          component="img"
          src={productData.image[0]}
          alt={productData.name}
          sx={{
            width: "100%",
            height: imageHeight,
            objectFit: "cover",
            cursor: "pointer",
          }}
        />

        <IconButton
          size="small"
          onClick={() => onRemove(product.product_id)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "#fff",
            opacity: 0.7,
            boxShadow: 1,
            zIndex: 1,
            "&:hover": {
              backgroundColor: "#f0f0f0",
              opacity: 0.6,
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {showOutOfStock && (
        <Box display="flex" justifyContent="center">
          <Typography pt={1} color="#ff905a" fontWeight={600} fontSize={16}>
            Out Of Stock
          </Typography>
        </Box>
      )}

      <Box sx={{ p: 1 }}>
        <Typography
          textAlign="center"
          color="text.secondary"
          noWrap
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "block",
            maxWidth: "100%",
          }}
        >
          {productData.description}
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
          mt={1}
        >
          <Typography variant="body2" fontWeight="bold" color="text.primary">
            ₹
            {formatPrice(
              getDiscountedPrice(productData.price, productData.discount)
            )}
          </Typography>

          <Typography
            variant="body2"
            sx={{ textDecoration: "line-through", color: "#7e818c" }}
          >
            ₹{formatPrice(productData.price)}
          </Typography>

          <Typography variant="body2" fontWeight="bold" color="#ff905a">
            ({productData.discount}% OFF)
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Box
        sx={{
          p: 2,
          cursor: "pointer",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <button
          className="text-center font-bold text-sm text-[#3880FF] cursor-pointer"
          onClick={() => {
            if (bottomLabel !== "Show Similar") {
              handleAddToCard(product.product_id);
            }
          }}
        >
          {bottomLabel}
        </button>
      </Box>
    </Box>
  );
};

export default ProductCardBase;
