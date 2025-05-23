import { useState } from "react";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import moment from "moment";

import { getRatingColor } from "../../../utils/reusable-functions";
import { DislikeIcon, LikeIcon } from "../../../assets";

const CustomerReview = ({
  reviewArr,
}: {
  reviewArr: {
    description: string;
    ratings: number;
    images: string[];
    reviewer?: string;
    updated_at?: string;
    likes?: number;
    dislikes?: number;
    users?: { first_name: string; last_name: string; profile_url: string };
  }[];
}) => {
  const [showAll, setShowAll] = useState(false);

  const customerPhotos = reviewArr?.map((item) => item.images).flat();

  const reviewsToShow = showAll ? reviewArr : reviewArr?.slice(0, 1);

  return (
    <div className="mt-[30px] text-start">
      {/* customer photos */}
      {customerPhotos?.length > 0 && (
        <>
          <p className="font-[700] text-[16px] m-[0px] mb-[15px] leading-1 text-[#282c3f]">
            Customer Photos ({customerPhotos?.length})
          </p>
          <div className="flex flex-wrap gap-[10px]">
            {customerPhotos?.slice(0, 3).map((image, i) => (
              <img key={i} src={image} className="h-[75px] w-[75px]" alt="" />
            ))}
          </div>
        </>
      )}

      {/* customer review */}
      {reviewArr?.length > 0 && (
        <>
          <p className="font-[700] text-[16px] m-[0px] mt-[25px] leading-1 text-[#282c3f]">
            Customer Reviews ({reviewArr?.length})
          </p>
          <div className="py-[20px] flex flex-col gap-[30px]">
            {reviewsToShow.map((review, index) => (
              <div key={index} className="relative !pl-[40px]">
                <div
                  className="absolute top-[3px] left-[0px] w-[32px] h-[16px] flex items-center"
                  style={{ backgroundColor: getRatingColor(review.ratings) }}
                >
                  <span className="text-[#fff] font-[700] p-[3px] text-sm">
                    {review?.ratings}
                  </span>
                  <GradeRoundedIcon className="text-[#fff] !text-[12px] font-[700]" />
                </div>
                <p className="text-[16px] leading-[20px] font-[400] text-[#282c3f] m-[0px]">
                  {review.description}
                </p>
                {review.images?.[0] && (
                  <img
                    alt=""
                    src={review.images[0]}
                    className="h-[75px] w-[75px] mt-[15px]"
                  />
                )}
                <div className="flex w-full justify-between mt-[16px]">
                  <div className="flex gap-[8px]">
                    <span className="font-[400] text-[14px] text-[#565a63]">
                      {review.users?.first_name || "Anonymous"}
                    </span>
                    <div className="w-px bg-[#eaeaec]"></div>
                    <div className="font-[400] text-[14px] text-[#565a63]">
                      {moment(review.updated_at).format("D MMMM YYYY") ||
                        "Unknown Date"}
                    </div>
                  </div>
                  {review?.likes && review?.likes > 0 && (
                    <div className="flex justify-between max-w-[120px] w-full">
                      <div className="flex items-center justify-center gap-[8px]">
                        <img alt="" src={LikeIcon} />
                        <span>{review.likes ?? 0}</span>
                      </div>
                      <div className="flex items-center justify-center gap-[8px]">
                        <img alt="" src={DislikeIcon} />
                        <span>{review.dislikes ?? 0}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <hr className="border-t-[0px] w-full border-[#d2d2d2] mt-[0px]" />

      {/* view all reviews button */}
      {reviewArr?.length > 1 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="cursor-pointer my-[15px] button-none text-[#3880FF] text-[14px]/normal font-[700] hover:border-[transparent] p-[0px] bg-[#fff]"
        >
          View all {reviewArr.length} Reviews
        </button>
      )}

      {/* seller info */}
      <p className="m-[0px] mb-[6px] pt-[4px] text-[#282c3f] font-[400] text-[16px]">
        Product Code: <span className="font-[700]">32249751</span>
      </p>
      <p className="text-[#282c3f] font-[400] text-[16px]">
        Seller:{" "}
        <span className="text-[#3880FF] font-[700] cursor-pointer">
          RetailNet
        </span>
      </p>
      <p className="text-[#282c3f] font-[700] text-[14px] cursor-pointer">
        View Supplier Information
      </p>
    </div>
  );
};

export default CustomerReview;
