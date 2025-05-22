import React, { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  styled,
  Box,
  BoxProps,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useDispatch, useSelector } from "react-redux";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { useNavigate } from "react-router-dom";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Logo } from "../../assets";
import { RootState } from "../../store";
import { CategoryResponse } from "../../utils/types";
import { HeaderSearch } from "../HeaderSearch";
import { ConfirmLogoutModal } from "../ConfirmLogoutDialog";
import { removeAuthToken } from "../../store/slice/auth.slice";
import { removeLoggedInUser } from "../../store/slice/users.slice";
interface HeaderResponsiveProps {
  menuItems: { label: string; color: string }[];
  categories: CategoryResponse[];
  handleNavigate: (path: string) => void;
}

export const HeaderResponsive: React.FC<HeaderResponsiveProps> = ({
  categories,
  menuItems,
  handleNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);

  const [openLogoutDialog, setOpenLogoutDialog] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleLogout = () => {
    handleNavigate("/login");
    dispatch(removeAuthToken());
    dispatch(removeLoggedInUser());
  };

  const sidebarRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { auth } = useSelector((state: RootState) => ({
    auth: state.auth,
  }));

  const isUserLoggedIn = auth?.token?.length > 0;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseConfirmLogoutDialog = () => setOpenLogoutDialog(false);
  const handleOpenConfirmLogoutDialog = () => setOpenLogoutDialog(true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="fixed w-full top-[0px] left-[0px] pl-[28px] pr-[28px] z-50 max-w-[600px] mx-auto bg-white flex justify-between menuIcon">
      <div className="flex justify-between w-full gap-[20px] sm:gap-[50px]">
        <div className="flex justify-between max-w-[20px] w-full items-center">
          <div ref={iconRef}>
            <MenuIcon
              fontSize="medium"
              onClick={toggleSidebar}
              className="text-primary cursor-pointer"
            />
          </div>
        </div>
        <HeaderSearch />
        <div className="flex justify-between max-w-[105px] w-full items-center">
          <img
            src={Logo}
            onClick={() => navigate("/home")}
            alt="logo"
            className="max-h-[30px] max-w-[30px] h-full w-full cursor-pointer"
          />
          <p className="text-primary text-[20px]">Stylehut</p>
        </div>
      </div>

      <CustomBox
        ref={sidebarRef}
        className={`${isOpen ? "open sidebar-open" : "closed"}`}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div>
          {menuItems.map((item, index) => (
            <div key={`menu-item-${index}-${item.label}`}>
              {item.label.toLowerCase() !== "studio" && (
                <div>
                  <CustomAccordion
                    key={index}
                    expanded={hoveredIndex === index}
                    onClick={() =>
                      setHoveredIndex((prevIndex) =>
                        prevIndex === index ? null : index
                      )
                    }
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon className="text-[#000] cursor-pointer" />
                      }
                    >
                      <Typography component="span">{item.label}</Typography>
                    </AccordionSummary>
                    <SmoothAccordionDetails
                      onClick={(e) => e.stopPropagation()}
                    >
                      {categories[hoveredIndex as number]?.sub_categories.map(
                        (i, index) => (
                          <CustomSubcategoriesAccordion
                            key={`sub-${index}-${hoveredIndex}`}
                            expanded={hoveredItemIndex === index}
                            onClick={() =>
                              setHoveredItemIndex((prevIndex) =>
                                prevIndex === index ? null : index
                              )
                            }
                          >
                            <AccordionSummary
                              expandIcon={
                                <ExpandMoreIcon className="text-primary cursor-pointer" />
                              }
                            >
                              <Typography
                                className="text-primary"
                                component="span"
                              >
                                {i.name}
                              </Typography>
                            </AccordionSummary>
                            <SmoothAccordionDetails className="h-full max-h-[250px] overflow-auto">
                              {i.sub_category_types.map((sub, subIndex) => (
                                <Typography
                                  key={`${sub.name}-${subIndex}`}
                                  onClick={() => {
                                    const path = `/product-list?category=${encodeURIComponent(
                                      item.label
                                    )}&subcategory=${encodeURIComponent(
                                      i.name
                                    )}requestid${
                                      i.id
                                    }&sub_category_type=${encodeURIComponent(
                                      sub.name
                                    )}requestid${sub.id}`;
                                    navigate(path);
                                    setIsOpen(false);
                                  }}
                                  className="text-sm text-[#282C3F] text-start py-[5px] cursor-pointer hover:text-primary"
                                >
                                  {sub.name}
                                </Typography>
                              ))}
                            </SmoothAccordionDetails>
                          </CustomSubcategoriesAccordion>
                        )
                      )}
                    </SmoothAccordionDetails>
                  </CustomAccordion>
                  {index === menuItems.length - 2 && (
                    <div className="border-t border-[#3880FF]"></div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        <div>
          <div className="flex flex-col justify-between w-full items-center mb-[100px]">
            <div
              onClick={() => navigate("/profile/overview")}
              className="flex pl-[25px] border-b py-[12px] border-[#3880FF] w-full text-[#282c3f] cursor-pointer items-center"
            >
              <PersonOutlineIcon />
              <p className="text-[14px] my-[0px] font-[500] ml-[15px]">
                Profile
              </p>
            </div>
            {isUserLoggedIn && (
              <div className="w-full">
                <div
                  onClick={() => navigate("/wishlist")}
                  className="flex pl-[25px] border-b border-[#3880FF] py-[12px] w-full text-[#282c3f] cursor-pointer items-center"
                >
                  <FavoriteBorderOutlinedIcon />
                  <p className="text-[14px] my-[0px] font-[500] ml-[15px]">
                    Wishlist
                  </p>
                </div>

                <div
                  onClick={() => navigate("/cart")}
                  className="flex pl-[25px] border-b border-[#3880FF] py-[12px] w-full text-[#282c3f] cursor-pointer items-center"
                >
                  <ShoppingBagOutlinedIcon />
                  <p className="text-[14px] my-[0px] font-[500] ml-[15px]">
                    Bag
                  </p>
                </div>

                <div
                  onClick={handleOpenConfirmLogoutDialog}
                  className="flex pl-[25px] border-b border-[#3880FF] py-[12px] w-full text-[#282c3f] cursor-pointer items-center"
                >
                  <PowerSettingsNewOutlinedIcon />
                  <p className="text-[14px] my-[0px] font-[500] ml-[15px]">
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CustomBox>
      <ConfirmLogoutModal
        handleCloseConfirmDialog={handleCloseConfirmLogoutDialog}
        handleConfirmLogout={handleLogout}
        openConfirmDialog={openLogoutDialog}
      />
    </div>
  );
};

const SmoothAccordionDetails = styled(AccordionDetails)({
  scrollbarWidth: "thin",
  overflowY: "auto",
  padding: "8px 8px 10px 32px",
  transition: "max-height 0.4s ease, opacity 0.3s ease",
});

type CustomBoxProps = BoxProps & {
  children: React.ReactNode;
};

const CustomSubcategoriesAccordion = styled(Accordion)(() => ({
  border: "unset",
  boxShadow: "none",
  margin: "0px !important",
  "& .MuiAccordionSummary-content": {
    margin: "0px",
  },
  "&.Mui-expanded": {
    borderColor: "#3880FF",
  },
  "&.Mui-focused": {
    borderColor: "#3880FF",
  },
  "&:before": {
    display: "none",
  },
  transition: "border-color 0.3s ease",
  "& .MuiAccordionSummary-root": {
    minHeight: "35px",
    paddingTop: "5px",
    paddingLeft: "0px",
    paddingRight: "8px",
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
    "&.Mui-focused": {
      outline: "none",
      boxShadow: "none",
    },
    "& button": {
      outline: "none",
      boxShadow: "none",
    },
  },
}));

const CustomAccordion = styled(Accordion)(() => ({
  borderTop: "1px solid #3880FF",
  boxShadow: "none",
  minHeight: "50px",
  margin: "0px",
  borderTopLeftRadius: "0px !important",
  borderTopRightRadius: "0px !important",
  "&.Mui-expanded": {
    borderColor: "#3880FF",
  },
  "& .MuiAccordionSummary-content": {
    margin: "0px",
  },
  "&.Mui-focused": {
    borderColor: "#3880FF",
  },
  "&:before": {
    display: "none",
  },
  transition: "border-color 0.3s ease",
  "& .MuiAccordionSummary-root": {
    minHeight: "35px",
    paddingTop: "13px",
    paddingLeft: "32px",
    paddingRight: "16px",
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
    "&.Mui-focused": {
      outline: "none",
      boxShadow: "none",
    },
    "& button": {
      outline: "none",
      boxShadow: "none",
    },
  },
}));

const CustomBox = styled(
  React.forwardRef<HTMLDivElement, CustomBoxProps>((props, ref) => (
    <Box ref={ref} {...props} />
  ))
)({
  minWidth: "250px",
  maxWidth: "250px",
  zIndex: 10,
  backgroundColor: "#fff",
  height: "100vh",
  position: "fixed",
  top: 60,
  left: 0,
  overflowY: "auto",
  scrollbarWidth: "thin",
  display: "flex",
  flexDirection: "column",
  scrollbarColor: "#3880FF #f1f1f1",
  transition: "all 0.3s ease",
  "&.closed": {
    transform: "translateX(-100%)",
  },
  "&.open": {
    transform: "translateX(0)",
  },
  "@media (max-width: 768px)": {
    minWidth: "250px",
  },
  "@media (max-width: 460px)": {},
});
