import { PRODUCT_DETAIL_CONSTANTS } from "../../../utils/constants";

const ProductImage = () => {
  return (
    <div className="grid grid-cols-2 w-full">
      {PRODUCT_DETAIL_CONSTANTS.PRODUCT_IMAGES.map((image, index) => (
        <div key={index} className="p-[4.2px] max-w-[540px] max-h-[720px]">
          <img src={image} className="w-full h-full" />
        </div>
      ))}
    </div>
  );
};

export default ProductImage;
