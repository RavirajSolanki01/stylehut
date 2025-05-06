import { Link } from "react-router-dom";
import ProductImage from "../../components/ProductDetails/ProductImage";
import ProductDetail from "../../components/ProductDetails/ProductDetail";
import BestOffers from "../../components/ProductDetails/BestOffers";
import ProductPrice from "../../components/ProductDetails/ProductPrice";
import ProductRating from "../../components/ProductDetails/Ratings";
import CustomerReview from "../../components/ProductDetails/CustomerReview";
import SimilarProduct from "../../components/ProductDetails/SimilarProduct";
import { useEffect, useRef, useState } from "react";
import {
  getProductDetails,
  getProductList,
} from "../../services/productService";
import { useParams } from "react-router-dom";
import { postWishlist } from "../../services/wishlistService";
import ProductDetailSkeleton from "./skeletonDetails";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const ratingRef = useRef<HTMLDivElement>(null);
  const [productData, setProductData] = useState<{
    ratings?: {
      description: string;
      ratings: number;
      images: string[];
      reviewer?: string;
      updated_at?: string;
      likes?: number;
      dislikes?: number;
      users?: {
        first_name: string;
        last_name: string;
        profile_url: string;
      };
    }[];
    name: string;
    category: { name: string };
    sub_category: { name: string; id: number };
    sub_category_type: { name: string };
    brand: { name: string };
    price?: number;
    discount?: number;
    description?: string;
    image?: string[];
    ratingStats?: {
      averageRating?: number;
      totalRatings?: number;
      distribution?: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
      };
    };
  }>({
    brand: { name: "" },
    sub_category_type: { name: "" },
    sub_category: { name: "", id: 0 },
    category: { name: "" },
    name: "",
  });
  const [productsList, setProducts] = useState([]);
  const [isWishlisted, setIsWishlist] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProductDetail = async () => {
    setIsLoading(true);
    try {
      if (!!id) {
        const productData = await getProductDetails(Number(id));
        setProductData(productData.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getProductList({
        page: 1,
        pageSize: 100,
      });
      setProducts(response.data.data.items);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const wishlistResponse = await postWishlist({ product_id: Number(id) });
      if (wishlistResponse.data.message.startsWith("Added")) {
        fetchProductDetail();
        setIsWishlist(true);
      } else {
        setIsWishlist(false);
      }
    } catch (error) {
      console.error("Failed to add to wishlist", error);
    }
  };

  useEffect(() => {
    fetchProductDetail();
    fetchProducts();
  }, [id]);

  return (
    <div>
      {!isLoading ? (
        <div className="w-full max-w-[1600px] mx-auto p-[28px]">
          {/* breadcrumbs container */}
          <div className="flex gap-[7px] w-full pb-[22px]">
            {productData?.name && (
              <>
                <Link to="/Home">Home</Link> /
                <Link to="/">{productData.category.name}</Link> /
                <Link to="/">{productData.sub_category.name}</Link> /
                <Link to="/">{productData.sub_category_type.name}</Link> /
                <Link to="/">{productData.name}</Link>
              </>
            )}
          </div>
          {/* end breadcrumbs container */}
          {/* product details container */}
          <div className="grid grid-cols-5 gap-4 w-full">
            {/* product image container */}
            <div className="col-span-3 mr-[26px]">
              <ProductImage images={productData.image as []} />
            </div>
            {/* end product image container */}
            <div className="col-span-2">
              <ProductPrice
                productName={productData.name}
                brandName={productData?.brand?.name}
                price={productData?.price as number}
                discount={productData?.discount as number}
                averageRating={
                  productData?.ratingStats?.averageRating as number
                }
                totalRatings={productData?.ratingStats?.totalRatings as number}
                productRatingClick={() =>
                  ratingRef?.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                addToWishlist={handleAddToWishlist}
                isWishlisted={isWishlisted}
              />
              <BestOffers />
              <hr className="border-t-[0px] w-full border-[#d2d2d2] mt-[0px]" />
              <ProductDetail description={productData?.description as string} />
              <hr className="border-t-[0px] w-full border-[#d2d2d2] mt-[0px]" />
              <div ref={ratingRef}>
                <ProductRating
                  averageRating={
                    productData.ratingStats?.averageRating as number
                  }
                  totalRating={productData.ratingStats?.totalRatings as number}
                  distribution={productData.ratingStats?.distribution!}
                />
              </div>

              <hr className="border-t-[0px] w-full border-[#d2d2d2] mt-[0px]" />
              <CustomerReview reviewArr={productData.ratings as []} />
            </div>
          </div>
          {/* product details container */}
          {/* similar product */}
          <SimilarProduct
            similarProducts={productsList}
            sub_category_id={productData?.sub_category?.id}
            product_id={Number(id)}
          />
          {/* end similar product */}
        </div>
      ) : (
        <ProductDetailSkeleton />
      )}
    </div>
  );
};
// max-w-[1600px] mx-auto mt-[60px]

export default ProductDetailPage;
