import React, { useEffect, useState } from "react";

import {
  Coupon1,
  Coupon2,
  CouponsTitle,
  FashionCarnivalImage,
  KnockoutOffers,
  PaymentMethods,
  ShopByCategory,
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
} from "../../assets";
import { getLandingPageShopByCategory } from "../../services/landingPageService";
import {
  AdminSettingsCategory,
  LandingPageShopByCategory,
} from "../../utils/types";
import { SkeletonShopByCategory } from "../../components/ShopByCategoryCard/SkeletonShopByCategory";
import ShopByCategoryCard from "../../components/ShopByCategoryCard";

export const HomePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const images = [Slide1, Slide5, Slide2, Slide3, Slide4];
  const [shopByCategoryData, setShopByCategoryData] = useState<
    LandingPageShopByCategory[]
  >([]);
  const [adminSettingCardConfigure, setAdminSettingCardConfigure] =
    useState<AdminSettingsCategory>({
      fontColor: "#004300",
      cardColor: "#d3e2fe",
    });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [images.length, 3000]);

  useEffect(() => {
    setIsLoading(true);
    getLandingPageShopByCategory()
      .then((res) => {
        setShopByCategoryData(res.data.data.subCategoriesType);
        setAdminSettingCardConfigure(res.data.data.adminSettingsCategory);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="flex justify-center max-w-[1300px] w-full mx-auto items-center overflow-auto">
        <div className="w-full px-8 responsive-home-page">
          <div className="flex flex-col gap-3 mb-5">
            <img
              src={FashionCarnivalImage}
              alt="FashionCarnivalImage"
              className="cursor-pointer fashion-carnival-image"
            />
            <img src={PaymentMethods} alt="PaymentMethods" />
            <img src={CouponsTitle} alt="CouponsTitle" />
            <div className="flex flex-wrap gap-2 max-w-[1300px] justify-center">
              <img
                className="max-h-[126px] coupons"
                src={Coupon1}
                alt="Coupon1"
              />
              <img
                className="max-h-[126px] coupons"
                src={Coupon2}
                alt="Coupon2"
              />
            </div>
          </div>
          <div className="relative w-full h-full mx-auto overflow-hidden">
            <div className="w-full h-full home-page-image">
              <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex}`}
                className="flex w-full h-full transition-transform duration-800 ease-in-out"
                style={{ transform: `translateX(-${currentIndex}%)` }}
              />
            </div>

            <div className="flex justify-center gap-[10px]">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-full max-w-[1px] p-[3px] mt-[10px] h-full max-h-[1px] rounded-[50%] hover:border-transparent focus:outline-none focus:border-transparent ${
                    index === currentIndex
                      ? "bg-[#83838f] border border-[#83838f]"
                      : "bg-[#d7d7d7] border border-[#efefef]"
                  }`}
                />
              ))}
            </div>

            <div className="my-10 flex flex-col justify-center items-center">
              {shopByCategoryData.length > 0 && (
                <>
                  <img src={ShopByCategory} alt="OfferTitleImage" />

                  <div className="w-full flex flex-wrap justify-center gap-10 my-6 ">
                    {shopByCategoryData.map((item: any, index: number) => (
                      <ShopByCategoryCard
                        key={`${item.id}-${index}`}
                        product={item}
                        adminSettingCardConfigure={adminSettingCardConfigure}
                      />
                    ))}
                  </div>
                </>
              )}
              {shopByCategoryData.length === 0 && isLoading && (
                <>
                  <img src={ShopByCategory} alt="SkeletonProduct" />
                  <div className="w-full flex flex-wrap justify-center gap-10 my-6 ">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <SkeletonShopByCategory key={index} />
                    ))}
                  </div>
                </>
              )}

              <img
                src={KnockoutOffers}
                alt="KnockoutOffers"
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
