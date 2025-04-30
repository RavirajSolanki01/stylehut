import { Box, Typography, Divider, IconButton } from "@mui/material";
import { wishlist_page_data } from "../../utils/constants";
import CloseIcon from "@mui/icons-material/Close";

const ProductCard = ({
  product,
  onRemove,
}: {
  product: any;
  onRemove?: () => void;
}) => {
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
          src={product.imageLink}
          alt={product.productType}
          sx={{
            width: "100%",
            height: 280,
            objectFit: "cover",
          }}
        />

        <IconButton
          size="small"
          onClick={onRemove}
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
          {product.productType}
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={1}
          mt={1}
        >
          <Typography variant="body2" fontWeight="bold" color="text.primary">
            ₹{product.price.discountedPrice}
          </Typography>

          <Typography
            variant="body2"
            sx={{ textDecoration: "line-through", color: "#7e818c" }}
          >
            ₹{product.price.originalPrice}
          </Typography>

          <Typography variant="body2" fontWeight="bold" color="#ff905a">
            ({product.price.discountPercentage})
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
  return (
    <Box p={3}>
      <Typography
        fontWeight={700}
        fontSize={18}
        gutterBottom
        sx={{
          color: "#282c3f",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
        }}
      >
        My Wishlist &nbsp;
        <Typography
          fontWeight={400}
          fontSize={18}
          color={"#282c3f"}
        >{`${wishlist_page_data.length} items`}</Typography>
      </Typography>
      <Box display="flex" gap={3}>
        <Box width="100%" display="flex" flexWrap="wrap">
          {wishlist_page_data.map((item, index) => (
            <ProductCard key={`${item.id}-${index}`} product={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
