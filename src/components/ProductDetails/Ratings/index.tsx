import HotelClassOutlinedIcon from "@mui/icons-material/HotelClassOutlined";
import StarIcon from "@mui/icons-material/Star";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import { PRODUCT_DETAIL_CONSTANTS } from "../../../utils/constants";

const ProductRating = ({
  averageRating,
  distribution,
  totalRating,
}: {
  averageRating: number;
  totalRating: number;
  distribution: { 1: number; 2: number; 3: number; 4: number; 5: number };
}) => {
  const productRating =
    distribution &&
    Object.entries(distribution).map(([key, value]) => ({
      id: Number(key),
      star: Number(key), // Reverse the star (1 => 5, 2 => 4, etc.)
      count: value,
    }));

  const totalCount = productRating?.reduce(
    (sum, rating) => sum + rating.count,
    0
  );

  const ratingWithPercentages = productRating?.map((rating) => ({
    ...rating,
    percentage: totalCount > 0 ? (rating.count / totalCount) * 100 : 0,
  }));
  console.log(">><< ratingWithPercentages", ratingWithPercentages);

  return (
    <div className="text-start">
      <div className="flex gap-[8px] justify-start items-center my-[16px]">
        <p className="font-[700] text-[16px] m-[0px] leading-1 text-[#282c3f] uppercase">
          Ratings
        </p>
        <HotelClassOutlinedIcon className="!h-[22px] !w-[18px]" />
      </div>
      <div className="flex max-w-[350px] w-full justify-between">
        <div className="flex justify-center flex-col">
          <div className="min-w-[80px] flex gap-[10px]">
            <span className="font-[400] text-[48px] text-[#282c3f]">
              {averageRating}
            </span>
            <StarIcon className="text-[#14958f] h-[24px] w-[24px]" />
          </div>
          <p className="font-[400] text-[14px] text-[#282c3f] mt-[12px]">
            {totalRating} Verified Buyers
          </p>
        </div>
        <div className="w-px bg-[#eaeaec]"></div>
        <div className="flex flex-col items-start">
          {ratingWithPercentages?.map((rating) => {
            const progressColor =
              PRODUCT_DETAIL_CONSTANTS.PRODUCT_RATING_PROGRESS_BAR_COLOR.find(
                (item) => item.star === rating.star
              );
            return (
              <div
                className="flex items-center justify-center gap-[7px]"
                key={rating.id}
              >
                <div className="flex justify-center items-center gap-[3px]">
                  <span className="text-[12px] text-[#a9abb3]">
                    {rating.star}
                  </span>
                  <GradeRoundedIcon className="text-[#a9abb3] !text-[12px]" />
                </div>
                <div className="mb-0 h-[3px] w-[120px] bg-[#f5f5f6]">
                  <div
                    className="h-[3px]"
                    style={{
                      width: `${rating.percentage}%`,
                      backgroundColor: progressColor?.color,
                    }}
                  ></div>
                </div>
                <div className="text-[12px] text-[#282c3f] w-6 text-right">
                  {rating.count}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="mt-[20px]">
        <div className="flex gap-[8px] justify-start items-center mb-[16px]">
          <p className="font-[700] text-[16px] m-[0px] leading-1 text-[#282c3f] uppercase">
            What Customers Said
          </p>
          <HotelClassOutlinedIcon className="!h-[22px] !w-[18px]" />
        </div>
        <div>
          <div className="flex flex-col items-start">
            {PRODUCT_DETAIL_CONSTANTS.CUSTOMER_PRODUCT_REVIEW.map((rating) => {
              return (
                <div key={rating.id} className="my-[6px]">
                  <p className="text-[14px] font-[400] text-[#7e818c] font-medium m-[0px] ">
                    {rating.label}
                  </p>
                  <div
                    className="flex items-center justify-center gap-[7px]"
                    key={rating.id}
                  >
                    <div className="mb-6 h-[3px] w-[120px] bg-[#f5f5f6]">
                      <div
                        className="h-[3px] bg-[#14958f]"
                        style={{
                          width: `${rating.value}%`,
                        }}
                      ></div>
                    </div>
                    <div className="text-[12px] text-[#282c3f] w-6 text-right">
                      {rating.for_title} ({rating.value}%)
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div> */}
      {/* <button className="mb-[18px] button-none text-[#ff3f6c] text-[14px]/normal font-[700] hover:border-[transparent] p-[0px] bg-[#fff]">
        View Details
      </button> */}
    </div>
  );
};

export default ProductRating;
