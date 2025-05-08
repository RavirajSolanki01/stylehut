import React, { useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "../../assets";
import {
  Autocomplete,
  Badge,
  InputAdornment,
  TextField,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { colorMap, headerMenuItems } from "../../utils/constants";
import { HeaderResponsive } from "../HeaderResponsive";
import { useNavigate } from "react-router-dom";
import { ProfileMenu } from "../ProfileMenu";
import { LoggedInUserProfileMenu } from "../LoggedInUserProfileMenu";
import { CategoriesPopover } from "../CategoriesPopover";
import { toast } from "react-toastify";
import { setLoading } from "../../store/slice/loading.slice";
import { getCategories } from "../../services/categoriesService";
import { CategoryResponse, ISearchOption } from "../../utils/types";
import useDebounce from "../../hooks";
import { getheaderSearch } from "../../services/headerSearch";
import { removeAuthToken } from "../../store/slice/auth.slice";

export const Header: React.FC = () => {
  const { auth } = useSelector((state: RootState) => ({
    auth: state.auth,
  }));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const buttonRef = useRef<HTMLDivElement | null>(null);
  const headerItemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const [activePopoverIndex, setActivePopoverIndex] = useState<number | null>(
    null
  );
  const [hoveredProfile, setHoveredProfile] = useState<HTMLElement | null>(
    null
  );
  const [menuItems, setMenuItems] = useState<
    { label: string; color: string, id:number }[]
  >([]);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [labelValue, setLabelValue] = useState("");
  const [options, setOptions] = useState<ISearchOption[]>([]);
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  const isUserLoggedIn = useMemo(() => !!auth?.token?.length, [auth.token]);

  const handlePopoverOpen = () => {
    if (window.innerWidth < 1380 && auth.token) {
      navigate("/profile/overview");
    } else {
      setHoveredProfile(buttonRef.current);
    }
  };

  const handlePopoverClose = () => setHoveredProfile(null);
  const open = Boolean(hoveredProfile);
  const id = open ? "profile-popover" : undefined;

  const handleNavigate = (path: string) => {
    if (labelValue?.length) {
      navigate(`/product-list?category=${labelValue + path}`);
    }
  };

  const handleCategoryClick = (index: number, label?: string) => {
    
    setLabelValue(label as string);
    setActivePopoverIndex((prevIndex) => (prevIndex !== index ? null : index));
    setActivePopoverIndex(index);
  };
  useEffect(() => {
    dispatch(setLoading(true));
    if (debouncedSearchTerm)
      getheaderSearch(inputValue)
        .then((res) => {
          const { success } = res.data;
          if (success) {
            const { brands, subCategoriesType } = res.data.data;            

            const groupedOptions: ISearchOption[] = [
              ...brands.map((item: ISearchOption) => ({
                ...item,
                group: "Brands",
              })),
              ...subCategoriesType.map((item: any) => ({
                ...item,
                name: `${item.name} for ${item.category.name}`,
                group: "SubCategories",
                path: `/product-list?category=${item.category.name}requestid${item.category.id}&subcategory=${item.sub_category.name}requestid${item.sub_category.id}&sub_category_type=${item.name}requestid${item.id}`
              })),
            ];

            setOptions(groupedOptions);
          }
        })
        .catch((err) => {
          setMenuItems(headerMenuItems);
          const errorMessage =
            err?.response?.data?.message ||
            err?.response?.data ||
            "Something went wrong.";
          toast.error(`Fetch categories data Failed: ${errorMessage}`);
        })
        .finally(() => dispatch(setLoading(false)));
  }, [debouncedSearchTerm]);


  useEffect(() => {
    dispatch(setLoading(true));
    getCategories()
      .then((res) => {
        const categoryData = res?.data?.data?.categories;
        if (categoryData) {
          const sorted = categoryData.sort(
            (a: { id: number }, b: { id: number }) => a.id - b.id
          );
          setMenuItems(
            sorted.map((cat: { name: string | number, id:number }) => ({
              label: cat.name,
              color: colorMap[cat.name],
              id: cat.id
            }))
          );
          setCategories(sorted);
        }
      })
      .catch((err) => {
        setMenuItems(headerMenuItems);
        const errorMessage =
          err?.response?.data?.message ||
          err?.response?.data ||
          "Something went wrong.";
        toast.error(`Fetch categories data Failed: ${errorMessage}`);
        if(err?.response?.data?.message === "Unauthorized: Invalid or expired token"){
          dispatch(removeAuthToken())
        }
      })
      .finally(() => dispatch(setLoading(false)));
  }, [debouncedSearchTerm]);

  return (
    <div className="fixed w-full top-0 z-50 bg-white flex justify-between gap-x-5 shadow-md px-[30px] mx-auto responsive-header">
      <div className="menuIcon">
        <HeaderResponsive categories={categories} menuItems={menuItems} />
      </div>

      <div className="w-full flex items-center py-[10px] headerItem">
        <img
          onClick={() => navigate("/home")}
          src={Logo}
          alt="myntra_logo"
          className="max-h-[60px] max-w-[60px] h-full w-full cursor-pointer"
        />

        <div className="relative ml-[20px]">
          <ul className="list-none flex gap-x-[20px] h-full max-h-[35px] text-[#282c3f] font-[700] cursor-pointer uppercase mb-0 relative">
            {menuItems.map((item, index) => (
              <li
                key={index}
                ref={(el) => {
                  headerItemRefs.current[index] = el;
                }}
                className="flex h-full pb-[18px] pt-[10px] max-h-[60px] items-center relative min-w-[55px] w-full justify-center"
                style={{
                  zIndex: 1000,
                  borderBottom:
                    activePopoverIndex === index
                      ? `4px solid ${item.color}`
                      : "",
                }}
                onMouseEnter={() => handleCategoryClick(index, `${item.label+'requestid'+ item.id}`)}
                onMouseLeave={() => handleCategoryClick(index, `${item.label+'requestid'+ item.id}`)}
                onClick={() => handleCategoryClick(index, `${item.label+'requestid'+ item.id}`)}
              >
                <div>{item.label}</div>
              </li>
            ))}
          </ul>

          {activePopoverIndex !== null && (
            <CategoriesPopover
              id={`header-popover-${activePopoverIndex}`}
              key={activePopoverIndex}
              handleNavigate={handleNavigate}
              handlePopoverClose={() => setActivePopoverIndex(null)}
              handlePopoverOpen={() =>
                setActivePopoverIndex(activePopoverIndex)
              }
              hoveredItem={headerItemRefs.current[activePopoverIndex]}
              open={Boolean(headerItemRefs.current[activePopoverIndex])}
              activePopoverIndex={activePopoverIndex}
              menuItems={menuItems}
              categories={categories}
            />
          )}
        </div>
      </div>

      <div className="w-full flex items-center py-[10px] justify-end gap-x-[50px] headerItem">
        <Autocomplete
          freeSolo
          open
          options={options}
          groupBy={(option) => option.group}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.name
          }
          onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
          onChange={(_, option) => {
            if (option && typeof option !== 'string') {
              navigate(option.path);
            }
          }}
          style={{ width: "100%" }}          
          renderGroup={(params) => (
            <li key={params.key}>
              <GroupHeader className="ul-test">{params.group && "All others"}</GroupHeader>
              <GroupItems>{params.children}</GroupItems>
            </li>
          )}
          renderOption={(props, option) => (
            <li {...props} key={option.id} className="cursor-pointer font-light my-1 pl-2 hover:text-[#ff3f6c]">
              {option.name}
            </li>
          )}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              placeholder="Search for products, brands and more"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className="search-icon" />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <div className="flex items-center gap-x-[30px]">
          <div
            className="text-[#282c3f] cursor-pointer h-full min-h-[60px] w-full min-w-[40px] flex flex-col items-center relative justify-center border-b-4 border-b-transparent hover:border-b-[#ff3f6c]"
            style={{ borderBottom: open ? "4px solid #ff3f6c" : "" }}
            ref={buttonRef}
            onClick={handlePopoverOpen}
          >
            <PersonOutlineIcon />
            <p className="text-[11px] my-[0px] font-[700]">Profile</p>
          </div>

          {isUserLoggedIn ? (
            <LoggedInUserProfileMenu
              id={id as string}
              handleNavigate={() => navigate("/profile/my-profile")}
              handlePopoverClose={handlePopoverClose}
              handlePopoverOpen={handlePopoverOpen}
              hoveredProfile={hoveredProfile}
              open={open}
            />
          ) : (
            <ProfileMenu
              id={id as string}
              handleNavigate={() => navigate("/login")}
              handlePopoverClose={handlePopoverClose}
              handlePopoverOpen={handlePopoverOpen}
              hoveredProfile={hoveredProfile}
              open={open}
            />
          )}

          <div
            className="text-[#282c3f] cursor-pointer h-full min-h-[60px] w-full min-w-[40px] flex flex-col items-center relative justify-center border-b-4 border-b-transparent hover:border-b-[#ff3f6c]"
            onClick={() => navigate("/wishlist")}
          >
            <FavoriteBorderOutlinedIcon />
            <p className="text-[11px] my-[0px] font-[700]">Wishlist</p>
          </div>

          <div onClick={() => navigate("/cart")} className="text-[#282c3f] cursor-pointer flex flex-col items-center h-full min-h-[60px] w-full min-w-[40px] justify-center border-b-4 border-b-transparent hover:border-b-[#ff3f6c]">
            <Badge
              badgeContent={5}
              color="error"
              overlap="circular"
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <ShoppingBagOutlinedIcon />
            </Badge>
            <p className="text-[11px] my-[0px] font-[700]">Bag</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomTextField = styled(TextField)({
  maxWidth: 600,
  width: "100%",
  height: 40,
  backgroundColor: "#f5f5f6",
  borderRadius: 4,
  "& .MuiOutlinedInput-root": {
    height: 40,
    paddingRight: 0,
    paddingLeft: 14,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "@media (max-width: 1450px)": {
    maxWidth: "420px",
  },
  "@media (max-width: 1350px)": {
    maxWidth: "420px",
  },
  "& .search-icon": {
    color: "#696e79",
    marginRight: 20,
  },
});

const GroupHeader = styled("div")({
  position: "sticky",
  top: 0,
  padding: "6px 10px",
  color: "#000",
  backgroundColor: "#f5f5f6",
  fontWeight: 700,
  borderBottom: `1px solid #f5f5f6`,
});

const GroupItems = styled("ul")({
  padding: 0,
  margin: 0,
  listStyle: "none",
});
