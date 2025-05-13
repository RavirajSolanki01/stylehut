import { Box, Typography, Divider, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getWishlist, postWishlist } from "../../services/wishlistService";
import { setLoading } from "../../store/slice/loading.slice";
import { useDispatch } from "react-redux";
import { LoaderOverlay } from "../../components/Loader";

const ProductCard = ({
  product,
  onRemove,
}: {
  product: any;
  onRemove: (product_id: number) => void;
}) => {
  const products = product.products;
  const getDiscountedPrice = (
    price: number,
    discountPercent: number
  ): number => {
    const discountAmount = (price * discountPercent) / 100;
    return Math.floor(price - discountAmount);
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
          component="img"
          src={products.image[0]}
          alt={products.name}
          sx={{
            width: "100%",
            height: 280,
            objectFit: "cover",
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
          {products.description}
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
          mt={1}
        >
          <Typography variant="body2" fontWeight="bold" color="text.primary">
            Rs.{getDiscountedPrice(products.price, products.discount)}
          </Typography>

          <Typography
            variant="body2"
            sx={{ textDecoration: "line-through", color: "#7e818c" }}
          >
            ₹{products.price}
          </Typography>

          <Typography variant="body2" fontWeight="bold" color="#ff905a">
            ({products.discount}% OFF)
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ p: 1, cursor: "pointer" }}>
        <Typography
          textAlign="center"
          fontWeight={700}
          fontSize={14}
          color="#ff3e6c"
        >
          MOVE TO BAG
        </Typography>
      </Box>
    </Box>
  );
};

export const Wishlist = () => {
  const dispatch = useDispatch();
  const [wishlist_page_data, setWishlist_page_data] = useState<any>([]);

  const handleRemoveFromWishlist = (product_id: number) => {
    dispatch(setLoading({ key: "remove-from-wishlist", value: true }));
    postWishlist({ product_id })
      .then((res) => {
        fetchWishlist();
        toast.success(res.data?.message);
      })
      .catch((err) => {
        const errorMessage =
          err?.response?.data?.message ||
          err?.response?.data ||
          "Something went wrong.";
        toast.error(`Remove item from wishlist Failed: ${errorMessage}`);
      })
      .finally(() =>
        dispatch(setLoading({ key: "remove-from-wishlist", value: false }))
      );
  };

  const fetchWishlist = () => {
    dispatch(setLoading({ key: "get-wishlist", value: true }));
    getWishlist({ page: 1, pageSize: 100 })
      .then((res) => {
        const wishlist_data = res?.data?.data?.items;
        if (wishlist_data) {
          setWishlist_page_data(wishlist_data);
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
    fetchWishlist();
  }, []);

  return (
    <div className="max-w-[1640px] w-full mx-auto">
      <LoaderOverlay />

      <p className="mx-8 my-4 font-bold text-[18px] text-[#282c3f] text-left flex items-center align-middle wishlist-items">
        My Wishlist &nbsp;
        <span className="font-[400] text-[18px] text-[#282c3f]">{`${wishlist_page_data.length} items`}</span>
      </p>
      <div className="flex mx-7 wishlist-items-container">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 custom-grid">
          {wishlist_page_data.map((item: any, index: number) => (
            <div
              key={`${item.id}-${index}`}
              className="flex justify-center items-center my-1"
            >
              <ProductCard product={item} onRemove={handleRemoveFromWishlist} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
