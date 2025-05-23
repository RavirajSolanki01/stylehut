import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation } from "swiper/modules";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";

const SimilarProduct = ({
  similarProducts,
  sub_category_id,
  product_id,
}: {
  similarProducts: {
    id: number;
    name: string;
    brand: { name: string };
    price: number;
    discount: number;
    category: { id: number; name: string };
    image: string[];
    sub_category: { id: number; name: string };
    sub_category_type: { id: number; name: string };
  }[];
  sub_category_id: number;
  product_id: number;
}) => {
  
  const navigate = useNavigate();

  const sameCategoryProducts = similarProducts.filter(
    (item) => item.sub_category.id === sub_category_id && item.id !== product_id
  );

  const handleGotoProduct = (product_id: number) => {
    navigate(`/product-detail/${product_id}`);
  };

  return (
    <div className="">
      <div className="flex gap-[8px] justify-start items-center mb-[16px]">
        <p className="font-[700] text-[16px] m-[0px] leading-1 text-[#282c3f] uppercase">
          Similar Product
        </p>
      </div>

      <div className="hidden lg:flex flex-wrap gap-[27px] text-start">
        {sameCategoryProducts.slice(0, 10).map((product) => {
          const discountedPrice = Math.round(
            Number(product.price.toString().replace(/[^\d]/g, "")) *
              (1 - product.discount / 100)
          );

          return (
            <div
              onClick={() => handleGotoProduct(product.id)}
              className="hover:shadow-lg cursor-pointer block bg-white shadow-secondary-1 w-[220px] border border-[#e9e9eb]"
              key={product.id}
            >
              <div className="hover:shadow-lg block bg-white shadow-secondary-1 border border-[#e9e9eb]">
                <div className="relative">
                  <img
                    className="w-full h-[260px] object-cover"
                    src={product.image[0]}
                    alt={product.name}
                  />
                  <div className="absolute w-[32px] h-[16px] bg-[#fff] border border-[#eaeaec] left-[10px] bottom-[10px] p-[3px]  font-[700] text-[#282c3f] flex gap-[2px] text-sm items-center">
                    3.2{" "}
                    <GradeRoundedIcon className="text-[#14958f] !text-[12px]" />
                  </div>
                </div>
                <div className="p-[10px] text-surface w-full">
                  <p className="font-[700] text-[#282c3f] text-[16px] m-[0px]">
                    {product.brand.name}
                  </p>
                  <p className="w-full whitespace-nowrap overflow-hidden text-ellipsis font-[400] text-[14px] text-[#535766] m-[0px] mt-[4px] mb-[8px]">
                    {product.name}
                  </p>
                  <div className="w-full whitespace-nowrap overflow-hidden text-ellipsis font-[400] text-[14px] text-[#535766] m-[0px] mt-[4px] mb-[8px]">
                    <p className="font-[700] text-[#282c3f] text-[16px] m-[0px] pr-[3px]">
                      Rs. {discountedPrice}{" "}
                      <span className="font-[700] text-[#535665] text-[12px] m-[0px] px-[3px] line-through">
                        Rs. {product.price}
                      </span>
                      <span className="font-[700] text-[#ff905a] text-[12px] m-[0px] px-[3px] uppercase">
                        {" "}
                        ({product.discount}% off)
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-[10px] text-surface w-full">
                <p className="font-[700] text-[#282c3f] text-[16px] m-[0px]">
                  {product.brand.name}
                </p>
                <p className="w-full whitespace-nowrap overflow-hidden text-ellipsis font-[400] text-[14px] text-[#535766] m-[0px] mt-[4px] mb-[8px]">
                  {product.name}
                </p>
                <div className="w-full whitespace-nowrap overflow-hidden text-ellipsis font-[400] text-[14px] text-[#535766] m-[0px] mt-[4px] mb-[8px]">
                  <p className="font-[700] text-[#282c3f] text-[16px] m-[0px] pr-[3px]">
                    Rs. {discountedPrice}
                    <span className="font-[700] text-[#535665] text-[12px] m-[0px] px-[3px] line-through">
                      Rs. {product.price}
                    </span>
                    <span className="font-[700] text-[#ff905a] text-[12px] m-[0px] px-[3px] uppercase">
                      ({product.discount}% off)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex lg:hidden flex-wrap gap-[27px] text-start">
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={16}
          slidesPerView={1}
          centeredSlides={true}
          navigation
        >
          {sameCategoryProducts.slice(0, 10).map((product) => {
            const discountedPrice = Math.round(
              Number(product.price.toString().replace(/[^\d]/g, "")) *
                (1 - product.discount / 100)
            );

            return (
              <SwiperSlide
                key={product.id}
                style={{ width: "100%", cursor: "pointer" }}
              >
                <div
                  onClick={() => handleGotoProduct(product.id)}
                  className="hover:shadow-lg cursor-pointer block bg-white shadow-secondary-1 w-[100%] border border-[#e9e9eb]"
                >
                  <div className="relative">
                    <img
                      className="w-auto h-[260px] m-auto"
                      src={product.image[0]}
                      alt=""
                    />
                    <div className="absolute w-[32px] h-[16px] bg-[#fff] border border-[#eaeaec] leading-[11px] left-[10px] bottom-[10px] p-[3px] text-[10px] font-[700] text-[#282c3f] flex gap-[2px]">
                      3.2
                      <GradeRoundedIcon className="text-[#14958f] !text-[9px]" />
                    </div>
                  </div>
                  <div className="p-[10px] text-surface w-full">
                    <p className="font-[700] text-[#282c3f] text-[16px] m-[0px]">
                      {product.brand.name}
                    </p>
                    <p className="w-full whitespace-nowrap overflow-hidden text-ellipsis font-[400] text-[14px] text-[#535766] m-[0px] mt-[4px] mb-[8px]">
                      {product.name}
                    </p>
                    <div className="w-full whitespace-nowrap overflow-hidden text-ellipsis font-[400] text-[14px] text-[#535766] m-[0px] mt-[4px] mb-[8px]">
                      <p className="font-[700] text-[#282c3f] text-[16px] m-[0px] pr-[3px]">
                        Rs. {discountedPrice}
                        <span className="font-[700] text-[#535665] text-[12px] m-[0px] px-[3px] line-through">
                          Rs. {product.price}
                        </span>
                        <span className="font-[700] text-[#ff905a] text-[12px] m-[0px] px-[3px] uppercase">
                          ({product.discount}% off)
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default SimilarProduct;
