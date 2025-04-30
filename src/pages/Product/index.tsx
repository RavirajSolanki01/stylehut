import { Link } from "react-router-dom";
import { PRODUCT_DETAIL_CONSTANTS } from "../../utils/constants";
import ProductImage from "../../components/ProductDetails/ProductImage";
import ProductDetail from "../../components/ProductDetails/ProductDetail";
import BestOffers from "../../components/ProductDetails/BestOffers";
import ProductPrice from "../../components/ProductDetails/ProductPrice";
import ProductRating from "../../components/ProductDetails/Ratings";
import CustomerReview from "../../components/ProductDetails/CustomerReview";
import SimilarProduct from "../../components/ProductDetails/SimilarProduct";

const ProductDetailPage: React.FC = () => {
  return (
    <div>
      <div className="w-full max-w-[1600px] mx-auto p-[28px]">
        {/* breadcrumbs container */}
        <div className="flex gap-[7px] w-full pb-[22px]">
          {PRODUCT_DETAIL_CONSTANTS.NAVIGATION.map((item, index) => {
            const isLast =
              index === PRODUCT_DETAIL_CONSTANTS.NAVIGATION.length - 1;
            return (
              <div key={index}>
                {isLast ? (
                  <span className="text-[#282c3f] text-[14px] font-[500]">
                    {item}
                  </span>
                ) : (
                  <div className="flex items-center gap-[5px]">
                    <Link
                      to="#"
                      className="hover:underline hover:text-[#282c3f] text-[#282c3f] text-[14px] font-[400]"
                    >
                      {item}
                    </Link>
                    <span>/</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* end breadcrumbs container */}
        {/* product details container */}
        <div className="grid grid-cols-5 gap-4 w-full">
          {/* product image container */}
          <div className="col-span-3 mr-[26px]">
            <ProductImage />
          </div>
          {/* end product image container */}
          <div className="col-span-2">
            <ProductPrice />
            <BestOffers />
            <hr className="border-t-[0px] w-full border-[#d2d2d2] mt-[0px]" />
            <ProductDetail />
            <hr className="border-t-[0px] w-full border-[#d2d2d2] mt-[0px]" />
            <ProductRating />
            <hr className="border-t-[0px] w-full border-[#d2d2d2] mt-[0px]" />
            <CustomerReview />
          </div>
        </div>
        {/* product details container */}
        {/* similar product */}
        <SimilarProduct />
        {/* end similar product */}
      </div>
    </div>
  );
};
// max-w-[1600px] mx-auto mt-[60px]

export default ProductDetailPage;
