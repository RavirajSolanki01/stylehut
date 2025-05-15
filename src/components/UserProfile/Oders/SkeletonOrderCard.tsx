import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { styled, Box } from "@mui/material";

export const SkeletonOrderCard: React.FC = () => {
  return (
    <Container>
      {/* Top Status Row */}
      <StatusRow>
        <Skeleton variant="circular" width={32} height={32} />
        <StatusText>
          <Skeleton variant="text" width={120} height={20} />
          <Skeleton variant="text" width={100} height={18} />
        </StatusText>
      </StatusRow>

      {/* Product Info */}
      <ProductRow>
        <ProductInfo>
          <Skeleton
            variant="rounded"
            width={53}
            height={70}
            style={{ borderRadius: 8 }}
          />
          <TextInfo>
            <Skeleton
              variant="text"
              width={80}
              height={20}
              style={{ marginBottom: 6 }}
            />
            <Skeleton
              variant="text"
              width={140}
              height={16}
              style={{ marginBottom: 6 }}
            />
            <Skeleton variant="text" width={100} height={16} />
          </TextInfo>
        </ProductInfo>
        {/* <Skeleton variant="rectangular" width={12} height={16} /> */}
      </ProductRow>

      {/* Exchange/Return Info */}
      <ReturnInfo>
        <Skeleton variant="circular" width={16} height={16} />
        <Skeleton variant="text" width={230} height={20} />
      </ReturnInfo>

      {/* Rating Section */}
      <RatingSection>
        <Stars>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} variant="circular" width={20} height={20} />
          ))}
        </Stars>
        <Skeleton variant="text" width={200} height={20} />
      </RatingSection>
    </Container>
  );
};

const Container = styled(Box)({
  padding: "0 21px 5px",
  marginTop: "12px",
  backgroundColor: "#ffffff",
  width: "100%",
});

const StatusRow = styled(Box)({
  display: "flex",
  gap: "12px",
  paddingTop: "16px",
});

const StatusText = styled(Box)({});

const ProductRow = styled(Box)({
  backgroundColor: "#f5f5f5",
  padding: "12px",
  marginTop: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  "&:hover": {
    backgroundColor: "#ebebeb",
  },
});

const ProductInfo = styled(Box)({
  display: "flex",
  gap: "26px",
});

const TextInfo = styled(Box)({});

const ReturnInfo = styled(Box)({
  backgroundColor: "#f5f5f5",
  padding: "14px 20px",
  marginTop: "2px",
  display: "flex",
  alignItems: "center",
  gap: "11px",
  "&:hover": {
    backgroundColor: "#ebebeb",
  },
});

const RatingSection = styled(Box)({
  backgroundColor: "#f5f5f5",
  padding: "14px 20px",
  marginTop: "2px",
});

const Stars = styled(Box)({
  display: "flex",
  gap: "8px",
  marginBottom: "8px",
});
