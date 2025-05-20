import { Autocomplete, InputAdornment, TextField, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getheaderSearch } from "../../services/headerSearch";
import { setLoading } from "../../store/slice/loading.slice";
import { headerMenuItems } from "../../utils/constants";
import { ISearchOption } from "../../utils/types";
import useDebounce from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

export const HeaderSearch: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state: RootState) => ({
    categoryList: state.categories,
  }));
  const [inputValue, setInputValue] = useState("");
  const debouncedSearchTerm = useDebounce(inputValue, 500);
  const [menuItems, setMenuItems] = useState<
    { label: string; color: string; id: number }[]
  >(categoryList.categories);
  const [options, setOptions] = useState<ISearchOption[]>([]);
  useEffect(() => {
    // dispatch(setLoading({ key: "search", value: true }));
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
                name: item.name,
              })),
              ...subCategoriesType.map((item: any) => ({
                ...item,
                name: `${item.name} for ${item.category.name}`,
                group: "SubCategories",
                path: `/product-list?category=${item.category.name}requestid${item.category.id}&subcategory=${item.sub_category.name}requestid${item.sub_category.id}&sub_category_type=${item.name}requestid${item.id}`,
              })),
            ];
            console.log("abc=> groupedOptions", groupedOptions);

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
        .finally(() => dispatch(setLoading({ key: "search", value: false })));
  }, [debouncedSearchTerm]);
  return (
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
        if (option && typeof option !== "string" && option.path) {
          navigate(option.path);
        }
      }}
      style={{ width: "100%" }}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader className="ul-test">
            {params.group && "All others"}
          </GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
      renderOption={(props, option) => (
        <li
          {...props}
          key={option.id}
          className="cursor-pointer font-light my-1 pl-2 hover:text-[#3880FF]"
        >
          {option.name}
        </li>
      )}
      renderInput={(params) => (
        <CustomHederSearchTextField
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
  );
};

export const CustomHederSearchTextField = styled(TextField)({
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
  "& .MuiInputAdornment-root": {
    "@media (max-width:1024px)": {
      marginRight: 0,
    },
  },
  "& .search-icon": {
    color: "#696e79",
    marginRight: 20,
    "@media (max-width:1024px)": {
      marginRight: 0,
    },
  },
});

export const GroupHeader = styled("div")({
  position: "sticky",
  top: 0,
  padding: "6px 10px",
  color: "#000",
  backgroundColor: "#f5f5f6",
  fontWeight: 700,
  borderBottom: `1px solid #f5f5f6`,
});

export const GroupItems = styled("ul")({
  padding: 0,
  margin: 0,
  listStyle: "none",
});
