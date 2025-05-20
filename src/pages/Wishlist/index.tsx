import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getWishlist, postWishlist } from "../../services/wishlistService";
import { setLoading } from "../../store/slice/loading.slice";
import { useDispatch } from "react-redux";
import { LoaderOverlay } from "../../components/Loader";
import ProductCardBase from "./components/ProductCard";
import EmptyCart from "./empty.svg";

export const Wishlist = () => {
  const dispatch = useDispatch();
  const [wishlist_page_data, setWishlist_page_data] = useState<any>([]);

  const handleRemoveFromWishlist = (product_id: number) => {
    dispatch(setLoading({ key: "remove-from-wishlist", value: true }));
    postWishlist({ product_id })
      .then((res) => {
        fetchWishlist();
        toast.success(res.data?.message);
      })
      .catch((err) => {
        const errorMessage =
          err?.response?.data?.message ||
          err?.response?.data ||
          "Something went wrong.";
        toast.error(`Remove item from wishlist Failed: ${errorMessage}`);
      })
      .finally(() =>
        dispatch(setLoading({ key: "remove-from-wishlist", value: false }))
      );
  };

  const fetchWishlist = () => {
    dispatch(setLoading({ key: "get-wishlist", value: true }));
    getWishlist({ page: 1, pageSize: 100 })
      .then((res) => {
        const wishlist_data = res?.data?.data?.items;
        if (wishlist_data) {
          setWishlist_page_data(wishlist_data);
        }
      })
      .catch((err) => {
        const errorMessage =
          err?.response?.data?.message ||
          err?.response?.data ||
          "Something went wrong.";
        toast.error(`Fetch wishlist data Failed: ${errorMessage}`);
      })
      .finally(() =>
        dispatch(setLoading({ key: "get-wishlist", value: false }))
      );
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="max-w-[1640px] w-full mx-auto">
      <LoaderOverlay />
      {wishlist_page_data.length > 0 && (
        <p className="mx-8 my-4 font-bold text-[18px] text-[#282c3f] text-left flex items-center align-middle wishlist-items">
          My Wishlist &nbsp;
          <span className="font-[400] text-[18px] text-[#282c3f]">{`${wishlist_page_data.length} items`}</span>
        </p>
      )}

      {wishlist_page_data.length > 0 ? (
        <div className="flex mx-7 wishlist-items-container">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 custom-grid">
            {wishlist_page_data.map((item: any, index: number) => (
              <div
                key={`${item.id}-${index}`}
                className="flex justify-center items-center my-1"
              >
                {item.quantity <= 0 ? (
                  <ProductCardBase
                    product={item}
                    onRemove={handleRemoveFromWishlist}
                    imageHeight={250}
                    bottomLabel="Show Similar"
                    showOutOfStock
                    fetchWishlist={fetchWishlist}
                  />
                ) : (
                  <ProductCardBase
                    product={item}
                    onRemove={handleRemoveFromWishlist}
                    imageHeight={280}
                    bottomLabel="MOVE TO BAG"
                    fetchWishlist={fetchWishlist}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center my-12">
          <img src={EmptyCart} alt="empty-cart" className="w-44 h-44 mb-6" />
          <p className="text-gray-500 text-lg font-semibold mb-2">
            You haven't added any items to wishlist yet!
          </p>
        </div>
      )}
    </div>
  );
};
