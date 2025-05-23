import React, { useState } from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Divider,
} from "@mui/material";

import {
  listing_page_data,
  brandsData,
  categoriesData,
} from "../../utils/constants";

const FilterSection = ({
  title,
  items,
  showMoreLimit,
}: {
  title: string;
  items: { label: string; count: number }[];
  showMoreLimit: number;
}) => {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, showMoreLimit);

  return (
    <Box mb={3}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        {title}
      </Typography>
      <FormGroup>
        {visibleItems.map((item, index) => (
          <FormControlLabel
            key={index}
            control={<Checkbox size="small" />}
            label={
              <Typography variant="body2">
                {item.label}{" "}
                <Typography component="span" color="text.secondary">
                  ({item.count})
                </Typography>
              </Typography>
            }
          />
        ))}
      </FormGroup>
      {!showAll && items.length > showMoreLimit && (
        <Typography
          variant="body2"
          color="primary"
          sx={{ mt: 1, cursor: "pointer" }}
          onClick={() => setShowAll(true)}
        >
          + {items.length - showMoreLimit} more
        </Typography>
      )}
    </Box>
  );
};

const ProductCard = ({ product }: { product: any }) => {
  return (
    <Box
      sx={{
        width: 240,
        m: 1,
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": {
          boxShadow: 3,
        },
      }}
    >
      <Box
        component="img"
        src={product.imageLink}
        alt={product.productType}
        sx={{
          width: "100%",
          height: 300,
          objectFit: "cover",
        }}
      />

      <Box sx={{ p: 2 }}>
        <Typography variant="body2" fontWeight={600}>
          {product.brand}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {product.productType}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <Typography variant="body2" fontWeight="bold" color="text.primary">
            ₹{product.price.discountedPrice}
          </Typography>

          <Typography
            variant="body2"
            sx={{ textDecoration: "line-through", color: "#7e818c" }}
          >
            ₹{product.price.originalPrice}
          </Typography>

          <Typography variant="body2" color="success.main">
            ({product.price.discountPercentage})
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const ProductList: React.FC = () => {
  return (
    <Box p={3}>
      <Typography
        fontWeight={600}
        fontSize={14}
        gutterBottom
        sx={{
          textAlign: "left",
          color: "#878b94",
          display: "flex",
          alignItems: "center",
        }}
      >
        Home / Clothes /&nbsp;
        <Typography sx={{ color: "#282c3f" }}>Womens Western Wear</Typography>
      </Typography>
      <Typography
        fontWeight={600}
        fontSize={16}
        gutterBottom
        sx={{ color: "#282c3f", textAlign: "left" }}
      >
        Womens Western Wear - 4283 items
      </Typography>
      <Box display="flex" gap={3}>
        <Box width="20%">
          <Paper elevation={2} sx={{ p: 2 }}>
            <FilterSection
              title="Categories"
              items={categoriesData}
              showMoreLimit={8}
            />
            <Divider sx={{ my: 2 }} />
            <FilterSection title="Brand" items={brandsData} showMoreLimit={8} />
          </Paper>
        </Box>

        <Box width="80%" display="flex" flexWrap="wrap">
          {listing_page_data.map((item, index) => (
            <ProductCard key={`${item.id}-${index}`} product={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
