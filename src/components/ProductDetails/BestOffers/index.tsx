import { PRODUCT_DETAIL_CONSTANTS } from "../../../utils/constants";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

const BestOffers = () => {
  return (
    <div className="mt-[40px] mb-[20px] flex items-start flex-col">
      <div className="flex gap-[8px] justify-center mb-[16px]">
        <p className="font-[700] text-[16px] m-[0px] leading-1 text-[#282c3f] uppercase">
          Best offers
        </p>
        <LocalOfferOutlinedIcon className="!h-[22px] !w-[18px]" />
      </div>
      <p className="font-[700] text-[16px] text-[#282c3f] m-[0px]">
        Best Price: <span className="text-[#ff905a]">Rs. 825</span>
      </p>
      <ul className="mt-[20px] text-start mb-[0px] pl-[18px]">
        <li className="text-[#282c3f] text-[15px] font-[400] mb-[6px]">
          Applicable on: Orders above Rs. 900 (only on first purchase)
        </li>
        <li className="text-[#282c3f] text-[15px] font-[400] mb-[6px]">
          Coupon code: <span className="font-[700]">SAVINGSPLUS</span>
        </li>
        <li className="text-[#282c3f] text-[15px] font-[400] mb-[6px]">
          Coupon Discount: 25% off (Your total saving: Rs. 1074)
        </li>
      </ul>
      <div className="offers-linkButton mb-[14px]">View Eligible Products</div>
      <div>
        {PRODUCT_DETAIL_CONSTANTS.MORE_OFFER.map((offers) => (
          <div className="text-start mb-[18px]" key={offers.id}>
            <div className="text-[16px] text-[#282c3f] m-[0px] mb-1 font-[700]">
              {offers.title}
            </div>
            <li className="text-[12px] text-[#282c3f] font-[400] mt-[6px]">
              Min Spend {offers.minSpend}, Max Discount {offers.maxDiscount}.
            </li>
            <div className="offers-linkButton">Terms & Condition</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestOffers;
