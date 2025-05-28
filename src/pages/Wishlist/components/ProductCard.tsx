import React from "react";
import { Box, Typography, IconButton, Divider, Drawer } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

import { formatPrice } from "../../../utils/reusable-functions";
import { postAddToCart } from "../../../services/cartService";
import { setLoading } from "../../../store/slice/loading.slice";
import { SimilarProducts } from "../../../utils/constants";
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
  imageHeight = 260,
  bottomLabel,
  showOutOfStock = false,
  fetchWishlist,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState<boolean>(false);

  const productData = product.products;

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

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
        toast.error("Please login to add product in cart");
      } else {
        toast.error("Unexpected error occurred. Please try again later!");
      }
    } finally {
      dispatch(setLoading({ key: "Add-to-cart", value: false }));
    }
  };

  return (
    <>
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
              } else {
                toggleDrawer(true)();
              }
            }}
          >
            {bottomLabel}
          </button>
        </Box>
      </Box>
      <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
        <div className="w-full max-w-[500px] flex flex-col justify-center relative mx-auto">
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 10,
              backgroundColor: "#fff",
              boxShadow: 1,
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <p className="text-[#393939] font-bold text-[20px] text-center p-5">
            Similar Products
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 place-items-center">
            {SimilarProducts.map((products, index) => {
              const data = products.products;
              return (
                <div
                  key={`${index}-${data?.id}`}
                  className="w-[220px] m-2 cursor-pointer rounded overflow-hidden relative transition-shadow duration-300 hover:shadow-[0px_4px_20px_rgba(0,0,0,0.2)]"
                >
                  <div className="relative">
                    <img
                      onClick={() => handleGotoProduct(data?.id)}
                      src={data.image[0]}
                      alt={data.name}
                      style={{
                        width: "100%",
                        height: imageHeight,
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  </div>

                  <div className="p-2">
                    <p className="text-[#393939] font-bold">
                      {data.brand.name}
                    </p>
                    <Typography
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
                      {data.description}
                    </Typography>

                    <div className="flex items-center gap-2 mt-2">
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="text.primary"
                      >
                        ₹
                        {formatPrice(
                          getDiscountedPrice(
                            Number(data.price),
                            Number(data.discount)
                          )
                        )}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: "line-through",
                          color: "#7e818c",
                        }}
                      >
                        ₹{formatPrice(Number(data.price))}
                      </Typography>

                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        color="#ff905a"
                      >
                        ({data.discount}% OFF)
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default ProductCardBase;
