import React, { useEffect, useState } from "react";
import { sortByOptions } from "../../utils/constants";
import { ProductCard } from "../../components/ProductCard";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { getProductList } from "../../services/productService";
import { getWishlist, postWishlist } from "../../services/wishlistService";
import { SkeletonProduct } from "../../components/ProductCard/SkeletonPorduct";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getBrandList } from "../../services/brandService";
import EmptyCart from "./empty.svg";

export const ProductList = () => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const queryParams = new URLSearchParams(search);
  const category = queryParams.get("category")?.split("requestid")[0];
  const subcategory = queryParams.get("subcategory")?.split("requestid")[0];
  const sub_category_type = queryParams
    .get("sub_category_type")
    ?.split("requestid")[0];

  const [sortBy, setSortBy] = useState("Recommended");

  const handleSortBy = (sortBy: string) => {
    switch (sortBy) {
      case "Price: High to Low":
        setSortBy("Price: High to Low");
        setOrderBy({
          ordering: "desc",
          sorting: "price",
        });
        fetchProducts(1, "desc", "price");
        break;

      case "Price: Low to High":
        setSortBy("Price: Low to High");
        setOrderBy({
          ordering: "asc",
          sorting: "price",
        });
        fetchProducts(1, "asc", "price");
        break;

      case "Recommended":
        setSortBy("Recommended");
        setOrderBy({
          ordering: "desc",
          sorting: "create_at",
        });
        fetchProducts(1, "desc", "create_at");
        break;

      case "What's new":
        setSortBy("What's new");
        setOrderBy({
          ordering: "asc",
          sorting: "create_at",
        });
        fetchProducts(1, "asc", "create_at");
        break;

      case "Better discount":
        setSortBy("Better discount");
        setOrderBy({
          ordering: "desc",
          sorting: "discount",
        });
        fetchProducts(1, "desc", "discount");
        break;

      case "Customer rating":
        setSortBy("Customer rating");
        setOrderBy({
          ordering: "desc",
          sorting: "rating",
        });
        fetchProducts(1, "desc", "rating");
        break;

      default:
        break;
    }

    // setSortBy(sortBy);
  };

  const handlePageChange = (page: number) => {
    setPagination((pageItems) => ({
      ...pageItems,
      currentPage: page,
    }));
    fetchProducts(page);
  };

  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [productsList, setProducts] = useState([]);
  const [wishlistIDs, setWishlistIDs] = useState<number[]>([]);
  const [brandList, setBrandList] = useState<{name: string, id:number}[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<number>(0);
  const [{ ordering, sorting }, setOrderBy] = useState({
    sorting: "create_at",
    ordering: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [{ currentPage, totalPages }, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
  });

  const handleGotoProduct = (product_id: number) => {
    navigate(`/product-detail/${product_id}`);
  };

  const handleAddToWishlist = async (product_id: number) => {
    try {
      const wishlistResponse = await postWishlist({ product_id });

      if (wishlistResponse?.data?.message.startsWith("Add")) {
        setWishlistIDs((prevIDs) => [...prevIDs, product_id]);
      } else {
        setWishlistIDs((prevIDs) => prevIDs.filter(item=> item  != product_id));
      }
      toast.success(wishlistResponse?.data?.message)
    } catch (error) {
      toast.error("Please login to add product to wishlist");
      console.error("Failed to add to wishlist", error);
      navigate("/login");
    }
  };
  const fetchWishlist = async () => {
    const wishlistResponse = await getWishlist({ page: 1, pageSize: 100 });
    setWishlistIDs((pre) => [
      ...pre,
      ...wishlistResponse.data.data.items.map(
        (item: { product_id: number }) => item.product_id
      ),
    ]);
  };
  const fetchProducts = async (
    pageNo?: number,
    order?: string,
    sortingBy?: string
  ) => {
    setLoading(true);
    try {
      const response = await getProductList({
        page: pageNo || currentPage,
        pageSize: 10,
        sortBy: sortingBy || sorting,
        order: order || ordering,
        maxPrice: priceRange[1] < 10000 ? priceRange[1] : 100000,
        category_id: Number(queryParams.get("category")?.split("requestid")[1]),
        sub_category_id: Number(
          queryParams.get("subcategory")?.split("requestid")[1]
        ),
        sub_category_type_id: Number(
          queryParams.get("sub_category_type")?.split("requestid")[1]
        ),
        brand_id: selectedBrand
      });
      console.log(response.data.data.items, "??>><<response.data.data.items");

      setProducts(response.data.data.items);
      setPagination({
        currentPage: response.data.data.meta.page,
        totalPages: response.data.data.meta.totalPages,
      });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBrandList = async () => {
    const response = await getBrandList();
    setBrandList(response.data.data.items.map((item: {name: string, id:number}) => ({name: item.name, id: item.id}))); 
  };

  useEffect(() => {
    fetchWishlist();
    fetchBrandList();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [priceRange, category, subcategory, sub_category_type, selectedBrand]);
  return (
    <React.Fragment>
      <div>
        <div className="px-[25px] py-[20px] ">
          <div className="text-left leading-[30px] text-gray-400">
            <Link
              to="/home"
              className={
                subcategory || sub_category_type
                  ? "text-gray-400"
                  : "text-black font-semibold"
              }
            >
              Home
            </Link>
            {category && (
              <>
                {" / "}
                <Link
                  to={`/product-list?category=${category}requestid${Number(
                    queryParams.get("category")?.split("requestid")[1]
                  )}`}
                  className={
                    subcategory || sub_category_type
                      ? "text-gray-400 capitalize"
                      : "text-black font-semibold capitalize"
                  }
                >
                  {category?.toLowerCase()}
                </Link>
              </>
            )}
            {subcategory && (
              <>
                {" / "}
                <Link
                  to={`/product-list?category=${category}requestid${Number(
                    queryParams.get("category")?.split("requestid")[1]
                  )}&subcategory=${subcategory}requestid${
                    queryParams.get("subcategory")?.split("requestid")[1]
                  }`}
                  className={
                    sub_category_type
                      ? "text-gray-400 capitalize"
                      : "text-black font-semibold capitalize"
                  }
                >
                  {subcategory?.toLowerCase()}
                </Link>
              </>
            )}
            {sub_category_type && (
              <>
                {" / "}
                <span className="text-black font-semibold capitalize">
                  {sub_category_type?.toLowerCase()}
                </span>
              </>
            )}
          </div>

          <div className="text-left leading-[30px]">
            {category} {sub_category_type}{" "}
            <span className=" font-light">{productsList.length} items</span>
          </div>
        </div>
        <div className="px-[25px] py-[20px] flex w-full justify-between h-[40px] items-end ">
          <div>FILTERS</div>
          <div className="flex gap-[10px]">
            <div className=" flex gap-[10px]">
              <div className="relative group hidden">
                <button className="default bg-white flex items-center justify-between px-3 py-2 border border-gray-300 rounded hover:bg-[#f5f5f5]">
                  Bundles
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.14 6.14a.5.5 0 0 1 0 .72l-4 4a.5.5 0 0 1-.7 0l-4-4a.5.5 0 1 1 .7-.72L8 9.67l3.85-3.53a.5.5 0 0 1 .7 0z" />
                  </svg>
                </button>
                <div className="absolute z-50 bg-white shadow-md border border-gray-200 p-2 rounded hidden group-hover:flex">
                  <label className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer w-[100px]">
                    <input type="checkbox" className="rounded" />
                    <span>Bundle 1</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer w-[100px]">
                    <input type="checkbox" className="rounded" />
                    <span>Bundle 2</span>
                  </label>
                </div>
              </div>

              <div className="relative group hidden">
                <button className="default bg-[#fff] flex items-center justify-between px-3 py-2 border border-gray-300 rounded hover:bg-[#f5f5f5]">
                  <div className="flex items-center gap-2">
                    Country of Origin
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.14 6.14a.5.5 0 0 1 0 .72l-4 4a.5.5 0 0 1-.7 0l-4-4a.5.5 0 1 1 .7-.72L8 9.67l3.85-3.53a.5.5 0 0 1 .7 0z" />
                    </svg>
                  </div>
                </button>
                <div className="absolute z-50 default bg-white shadow-md border border-gray-200  p-2 rounded hidden group-hover:flex">
                  <label className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span>India</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span>China</span>
                  </label>
                </div>
              </div>
            </div>

            <div className=" relative group hidden">
              <button className="default bg-[#fff] flex items-center justify-between px-3 py-2 border border-gray-300 rounded hover:bg-[#f5f5f5]">
                Size
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.14 6.14a.5.5 0 0 1 0 .72l-4 4a.5.5 0 0 1-.7 0l-4-4a.5.5 0 1 1 .7-.72L8 9.67l3.85-3.53a.5.5 0 0 1 .7 0z" />
                </svg>
              </button>
              <div className="absolute z-50 bg-white shadow-md border border-gray-200 p-2 rounded hidden group-hover:block">
                <label className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>S</span>
                </label>
                <label className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>M</span>
                </label>
                <label className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>L</span>
                </label>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="sortDiv cursor-pointer text-left p-[10px] w-[300px] border border-[#e9e9ed]">
              Sort by: {sortBy}
            </div>

            <div className="absolute w-[300px] border border-[#e9e9ed] top-full hidden flex-col group-hover:flex bg-white shadow-md p-2 z-10 sortList">
              {sortByOptions.map((option: string) => (
                <span
                  key={option}
                  className="p-[10px] cursor-pointer text-left hover:bg-[#f5f5f5] px-2 py-1 rounded"
                  onClick={() => handleSortBy(option)}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#e9e9ed] flex">
          <div className="w-[250px] border-r border-[#e9e9ed]">
            {/* Categories */}
            {/* <div className="border-b border-[#e9e9ed] pb-[20px]">
              <div className="text-left p-[20px] text-[14px] uppercase font-bold">
                Categories
              </div>
              <div className="text-left px-[20px] text-[14px] flex items-center gap-2">
                <input
                  type="checkbox"
                  id="tshirt-checkbox"
                  name="tshirt"
                  className="h-[18px] w-[18px] rounded-[3px] border-2 border-[#ff3f6c] text-[#ff3f6c] cursor-pointer accent-[#ff3f6c] appearance-none bg-[#fff] checked:text-[#fff] checked:bg-[#ff3f6c]"
                />
                <label
                  htmlFor="tshirt-checkbox"
                  className="ml-[10px] text-[14px] text-[#282c3f]  cursor-pointer hover:text-[#ff3f6c] font-[400]"
                >
                  Tshirt
                </label>
              </div>
              <div className="text-left px-[20px] text-[14px] flex items-center gap-2 mt-[5px]">
                <input
                  type="checkbox"
                  id="lounge-tshirt-checkbox"
                  name="lounge-tshirt"
                  className="h-[18px] w-[18px] rounded-[3px] border-2 border-[#ff3f6c] text-[#ff3f6c] cursor-pointer accent-[#ff3f6c] appearance-none bg-[#fff] checked:text-[#fff] checked:bg-[#ff3f6c]"
                />
                <label
                  htmlFor="lounge-tshirt-checkbox"
                  className="ml-[10px] text-[14px] text-[#282c3f]  cursor-pointer hover:text-[#ff3f6c] font-[400]"
                >
                  Lounge Tshirt
                </label>
              </div>
            </div> */}
            {/* Brands */}
            <div className="border-b border-[#e9e9ed] pb-[20px]">
              <div className="text-left p-[20px] text-[14px] uppercase font-bold">
                Brands
              </div>

              {brandList.map((brand) => (
                <div key={brand.id} className="text-left px-[20px] text-[14px] flex items-center gap-2 mt-[5px]">
                  <input
                    type="radio"
                    id={`brand-${brand.id}-radio`}
                    name="brand-selection"
                    checked={selectedBrand === brand.id}
                    onChange={() => setSelectedBrand(brand.id)}
                    className="h-[18px] w-[18px] rounded-[3px] border-2 border-[#ff3f6c] text-[#ff3f6c] cursor-pointer accent-[#ff3f6c] appearance-none bg-[#fff] checked:text-[#fff] checked:bg-[#ff3f6c]"
                  />
                  <label
                    htmlFor={`brand-${brand.id}-radio`}
                    className="ml-[10px] text-[14px] text-[#282c3f] cursor-pointer hover:text-[#ff3f6c] font-[400]"
                  >
                    {brand.name}
                  </label>
                </div>
              ))}
              {selectedBrand !== 0 && (
                <div
                  className="text-left px-[20px] text-[14px] mt-[5px] cursor-pointer text-[#ff3f6c] hover:underline"
                  onClick={() => setSelectedBrand(0)}
                >
                  Clear
                </div>
              )}
            </div>

            {/* Price Range */}
            <div className="border-b border-[#e9e9ed] p-[20px]">
              {/* Heading */}
              <div className="text-left text-[14px] uppercase font-bold mb-4">
                Price Range
              </div>

              {/* Range Slider */}
              <div className="relative w-full h-8">
                {/* Fixed Left Thumb */}
                <input
                  type="range"
                  min="100"
                  max="10000"
                  placeholder="d"
                  value="100"
                  disabled
                  className="absolute top-1/2 left-0 w-full h-[2px] appearance-none bg-[#ff3f6c] rounded-lg pointer-events-none 
      [&::-webkit-slider-thumb]:appearance-none 
      [&::-webkit-slider-thumb]:h-3 
      [&::-webkit-slider-thumb]:w-3 
      [&::-webkit-slider-thumb]:rounded-full 
      [&::-webkit-slider-thumb]:bg-[#fff]
      [&::-webkit-slider-thumb]:border-4 
      [&::-webkit-slider-thumb]:border-[#ff3f6c]
      [&::-moz-range-thumb]:h-5 
      [&::-moz-range-thumb]:w-5 
      [&::-moz-range-thumb]:rounded-full 
      [&::-moz-range-thumb]:bg-[#ff3f6c]
      [&::-moz-range-thumb]:border-4 
      [&::-moz-range-thumb]:border-white
      "
                />

                {/* Movable Right Thumb */}
                <input
                  type="range"
                  min="100"
                  max="10000"
                  value={priceRange[1]}
                  placeholder="d"
                  onChange={(e) =>
                    setPriceRange([100, parseInt(e.target.value)])
                  }
                  className="absolute top-1/2 left-0 w-full h-[2px] appearance-none bg-transparent rounded-lg cursor-pointer 
      [&::-webkit-slider-thumb]:appearance-none 
      [&::-webkit-slider-thumb]:h-3 
      [&::-webkit-slider-thumb]:w-3 
      [&::-webkit-slider-thumb]:rounded-full 
      [&::-webkit-slider-thumb]:bg-[#fff]
      [&::-webkit-slider-thumb]:border-4 
      [&::-webkit-slider-thumb]:border-[#ff3f6c]
      [&::-moz-range-thumb]:h-5 
      [&::-moz-range-thumb]:w-5 
      [&::-moz-range-thumb]:rounded-full 
      [&::-moz-range-thumb]:bg-[#ff3f6c]
      [&::-moz-range-thumb]:border-4 
      [&::-moz-range-thumb]:border-white
      "
                />
              </div>

              {/* Selected Range Display */}
              <div className="flex justify-between text-sm font-bold text-gray-800 mt-4">
                <span>
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                  {priceRange[1] == 10000 ? "+" : ""}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full p-[20px] flex flex-col">
            <div className="flex flex-wrap justify-start items-stretch">
              {loading && (
                <div className="flex flex-wrap">
                  {[...Array(10)].map((_, i) => (
                    <SkeletonProduct key={i} />
                  ))}
                </div>
              )}
              {productsList.length > 0 ? (
                productsList.map(
                  (product: {
                    id: number;
                    image: string[];
                    brand: { name: string };
                    name: string;
                    discount: number;
                    price: number;
                    ratingStats: { totalRatings: number; averageRating: number };
                  }) => (
                    <div
                      key={product.id}
                      className=""
                      onClick={() => {
                        handleGotoProduct(product.id);
                      }}
                    >
                      <ProductCard
                        imageUrl={product.image[0]}
                        isWishlisted={wishlistIDs.includes(product.id)}
                        brand={product.brand.name}
                        name={product.name}
                        price={
                          product?.discount === null
                            ? product?.price
                            : product?.price -
                              (product?.price * product?.discount) / 100
                        }
                        originalPrice={product.price}
                        discount={product.discount || 0}
                        totalReviews={product.ratingStats.totalRatings}
                        rating={product.ratingStats.averageRating}
                        additionalImages={product.image}
                        addToWishlist={() => handleAddToWishlist(product.id)}
                      />
                    </div>
                  )
                )
              ) : (
                <div className="w-full flex flex-col items-center justify-center my-12">
                  <img
                    src={EmptyCart}
                    alt="empty-cart"
                    className="w-44 h-44 mb-6"
                  />
                  <p className="text-gray-500 text-lg font-semibold mb-2">
                    No Products Found
                  </p>
                  <p className="text-gray-400 text-sm">
                    We couldn't find any products matching your search criteria.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {productsList.length !== 0 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  className={`default px-4 py-2 rounded-md font-bold flex justify-center items-center
      ${
        currentPage === 1
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-white text-[#282c3f] hover:bg-gray-100"
      }
    `}
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                >
                  <KeyboardDoubleArrowLeftIcon /> Page 1
                </button>

                <button
                  className={`default px-4 py-2 rounded-md font-bold flex justify-center items-center
      ${
        currentPage === 1
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-white text-[#282c3f] hover:bg-gray-100"
      }
    `}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft /> Previous
                </button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  className={`default px-4 py-2 rounded-md font-bold flex justify-center items-center
      ${
        currentPage === totalPages
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-white text-[#282c3f] hover:bg-gray-100"
      }
    `}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next <ChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
