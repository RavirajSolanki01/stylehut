import { useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import CloseIcon from "@mui/icons-material/Close";

const ProductImage = ({ images = [] }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [open, setOpen] = useState(false);
  return (
    <div className="grid grid-cols-2 w-full gap-[10px]">
      {images.map((image, index) => (
        <div
          key={index}
          onClick={() => {
            setCurrentImage(index);
            setOpen(true);
          }}
          className="max-w-[540px] max-h-[720px] overflow-hidden border border-[#f5f5f6]"
        >
          <img
            src={image}
            className="w-full h-full cursor-zoom-in  hover:scale-110 transition-all duration-400"
            alt=""
          />
        </div>
      ))}
      <div
        className={`fixed inset-0 w-full h-full bg-black/50 flex items-center justify-center z-100 px-2 ${
          open ? "block" : "hidden"
        }`}
        onClick={() => setOpen(false)}
      >
        <div
          className="max-w-[900px]  h-full bg-white w-full relative"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            className="cursor-pointer absolute top-2 right-2 z-10"
            onClick={() => setOpen(false)}
          >
            <CloseIcon className="!h-8 !w-8" />
          </button>
          <div className="absolute top-2.5 left-2.5 w-[40px] flex flex-col gap-2 z-10">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-full border  overflow-hidden cursor-pointer ${
                  currentImage === index
                    ? "border-[#3880ff]"
                    : "border-[#d5d6d9]"
                }`}
              >
                <img
                  src={image}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </button>
            ))}
          </div>
          <div className="image-zoom flex h-full">
            <InnerImageZoom src={images[currentImage]} zoomType="hover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
