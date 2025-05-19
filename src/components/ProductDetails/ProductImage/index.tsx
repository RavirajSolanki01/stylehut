import { useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import CloseIcon from "@mui/icons-material/Close";

interface ProductImageProps {
  images: string[];
}

const ImageErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      {children}
    </div>
  );
};

const ProductImage: React.FC<ProductImageProps> = ({ images = [] }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [open, setOpen] = useState(false);

  const handleImageClick = (index: number) => {
    setCurrentImage(index);
    setOpen(true);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index);
    setOpen(true);
  };

  if (!images.length) {
    return <div className="text-gray-500">No images available</div>;
  }

  return (
    <div className="grid grid-cols-2 w-full gap-[10px]">
      {images.map((image, index) => (
        <div
          key={index}
          onClick={() => handleImageClick(index)}
          className="max-w-[540px] max-h-[720px] overflow-hidden border border-[#f5f5f6]"
          role="button"
          aria-label={`View larger image ${index + 1} of ${images.length}`}
        >
          <ImageErrorBoundary>
            <img
              src={image}
              className="w-full h-full cursor-zoom-in hover:scale-110 transition-all duration-400"
              alt={`Product image ${index + 1}`}
              loading="lazy"
            />
          </ImageErrorBoundary>
        </div>
      ))}

      {open && (
        <div
          className="fixed inset-0 w-full h-full bg-black/50 flex items-center justify-center z-100 px-2"
          onClick={() => setOpen(false)}
          aria-hidden="true"
          role="dialog"
          aria-modal="true"
          aria-label="Product image gallery"
        >
          <div
            className="max-w-[900px] h-full bg-white w-full relative"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="cursor-pointer absolute top-2 right-2 z-10"
              onClick={() => setOpen(false)}
              aria-label="Close image gallery"
            >
              <CloseIcon className="!h-8 !w-8" />
            </button>

            <div className="absolute top-2.5 left-2.5 w-[40px] flex flex-col gap-2 z-10">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-full border overflow-hidden cursor-pointer ${
                    currentImage === index ? "border-[#3880ff]" : "border-[#d5d6d9]"
                  }`}
                  aria-label={`View image ${index + 1} of ${images.length}`}
                >
                  <img
                    src={image}
                    className="w-full h-full object-cover"
                    alt={`Thumbnail ${index + 1}`}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            <div className="image-zoom flex h-full">
              <InnerImageZoom
                src={images[currentImage]}
                zoomType="hover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
