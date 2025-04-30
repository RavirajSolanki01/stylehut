import React from "react";
import { Popover } from "@mui/material";
import { CategoryResponse } from "../../utils/types";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
interface CategoriesPopoverProps {
  id: string;
  open: boolean;
  hoveredItem: HTMLElement | null;
  activePopoverIndex: number;
  menuItems: { label: string; color: string }[];
  categories: CategoryResponse[];
  handlePopoverClose: () => void;
  handlePopoverOpen: () => void;
  handleNavigate: (path: string) => void;
}

export const CategoriesPopover: React.FC<CategoriesPopoverProps> = ({
  id,
  open,
  hoveredItem,
  menuItems,
  categories,
  activePopoverIndex,
  handlePopoverClose,
  handlePopoverOpen,
}) => {
  const activeCategory = categories[activePopoverIndex];
  const color = menuItems[activePopoverIndex]?.color || "#ff3f6c";

  return (
    <Popover
      id={id}
      className="header-popover"
      open={open}
      anchorEl={hoveredItem}
      onClose={handlePopoverClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      disableRestoreFocus
      slotProps={{
        root: { sx: { zIndex: 1 } },
        paper: {
          onMouseEnter: handlePopoverOpen,
          onMouseLeave: handlePopoverClose,
          sx: {
            boxShadow: "0 4px 12px 0 rgba(0,0,0,.05)",
            borderRadius: "0px",
          },
        },
      }}
    >
      {menuItems[activePopoverIndex]?.label.toLowerCase() === "studio" ? (
        <div className="flex flex-col items-center p-8 h-full w-full max-w-[950px] pb-4">
          <div className="flex flex-col items-center gap-2 align-middle">
            <img
              className="max-w-[100px] w-full h-full max-h-[30px]"
              src="https://constant.myntassets.com/web/assets/img/studio-logo-new.svg"
              alt="studio-logo"
            />
            <p className="text-[#535766] text-[16px] font-normal text-center">
              Your daily inspiration for everything fashion
            </p>
            <img
              className="max-w-[514px] w-full h-full max-h-[274px] mt-[20px]"
              src="https://constant.myntassets.com/web/assets/img/sudio-nav-banner.png"
              alt="studio-banner"
            />
          </div>
          <button className="max-w-[184px] w-full h-full text-center flex items-center justify-center uppercase border border-[#d4d5d8] mt-4 align-middle p-3 ">
            Explore Studio{" "}
            <ChevronRightIcon fontSize="small" className="ml-2" />
          </button>
        </div>
      ) : (
        <div className="p-[10px] min-h-[435px] h-full w-full max-w-[950px]">
          <div className="pt-[20px] columns-5 gap-6">
            {activeCategory?.sub_categories?.map((category) => (
              <div key={category.id} className="break-inside-avoid mb-4">
                <h4
                  className="text-sm font-semibold text-[#ff3f6c] mb-[5px] mt-[0px] text-left min-w-[100px]"
                  style={{ color }}
                >
                  {category.name}
                </h4>
                <ul className="list-none text-left p-0 mt-[10px]">
                  {category.sub_category_types.map((sub) => (
                    <li
                      key={sub.id}
                      className="text-sm text-[#282C3F] font-[400] w-full my-[5px] cursor-pointer break-keep whitespace-normal hover:text-[#40414b] hover:font-[700] max-w-[170px]"
                    >
                      {sub.name}
                    </li>
                  ))}
                </ul>
                {category.sub_category_types.length > 0 && (
                  <hr className="border-t-[1px] w-full border-[#d2d2d2] mt-[15px] mb-[15px]" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Popover>
  );
};
