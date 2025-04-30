const ProductImage = ({ images = [] }: { images: string[] }) => {
  return (
    <div className="grid grid-cols-2 w-full">
      {images.map((image, index) => (
        <div key={index} className="p-[4.2px] max-w-[540px] max-h-[720px]">
          <img src={image} className="w-full h-full" alt="" />
        </div>
      ))}
    </div>
  );
};

export default ProductImage;
