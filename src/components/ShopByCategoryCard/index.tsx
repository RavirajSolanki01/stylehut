import {
  AdminSettingsCategory,
  LandingPageShopByCategory,
} from "../../utils/types";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ShopByCategoryCard = ({
  product,
  adminSettingCardConfigure,
}: {
  product: LandingPageShopByCategory;
  adminSettingCardConfigure: AdminSettingsCategory;
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(
      `/product-list?category=${product.sub_category.category.name}requestid${product.sub_category.category.id}&subcategory=${product.sub_category.name}requestid${product.sub_category.id}&minDiscount=${product.minDiscount}&maxDiscount=${product.maxDiscount}`
    );
  };
  return (
    <div
      style={{
        backgroundColor: adminSettingCardConfigure.cardColor,
      }}
      onClick={handleNavigate}
      className={`p-0.5 cursor-pointer`}
    >
      <div
        style={{
          backgroundColor: adminSettingCardConfigure.cardColor,
        }}
        className={`flex justify-center items-center  max-w-[185px] cursor-pointer`}
      >
        <Box sx={{ width: 240, margin: "6px" }}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: "100%",
              objectFit: "cover",
              minHeight:"225px",
              height:"100%"
            }}
          />

          <div className="my-1">
            <p
              style={{ color: adminSettingCardConfigure.fontColor }}
              className={`font-semibold text-sm text-center capitalize`}
            >
              {product.name}
            </p>
            <p
              style={{ color: adminSettingCardConfigure.fontColor }}
              className={`font-extrabold text-xl text-center capitalize`}
            >
              {product.minDiscount === 0
                ? `Up to ${product.maxDiscount}%`
                : `${product.minDiscount} - ${product.maxDiscount}% OFF`}
            </p>
            <p
              style={{ color: adminSettingCardConfigure.fontColor }}
              className={`font-semibold text-sm text-center capitalize`}
            >
              Shop Now
            </p>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default ShopByCategoryCard;
