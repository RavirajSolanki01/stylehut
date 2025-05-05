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
import { Logo } from "../../assets";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import { useNavigate } from "react-router-dom";
import { CategoryResponse } from "../../utils/types";

interface HeaderResponsiveProps {
  menuItems: { label: string; color: string }[];
  categories: CategoryResponse[]
}

export const HeaderResponsive: React.FC<HeaderResponsiveProps> = ({categories, menuItems}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);
  
  const sidebarRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate()

  const { auth } = useSelector((state: RootState) => ({
    auth: state.auth,
  }));

  const isUserLoggedIn = auth?.token?.length > 0;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
      <div className="flex justify-between w-full">
        <div className="flex justify-between max-w-[70px] w-full items-center">
          <div ref={iconRef}>
            <MenuIcon
              fontSize="medium"
              onClick={toggleSidebar}
              className="text-[#ff2f5f] cursor-pointer"
            />
          </div>
        </div>
        <div className="flex justify-between max-w-[105px] w-full items-center">
          <img
            src={Logo}
            onClick={() => navigate("/home")}
            alt="myntra_logo"
            className="max-h-[30px] max-w-[30px] h-full w-full cursor-pointer"
          />
          <p className="text-[#ff3f6c] text-[20px]">Myntra</p>
        </div>
      </div>

      <CustomBox
        ref={sidebarRef}
        className={`${isOpen ? "open sidebar-open" : "closed"}`}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div>
          {menuItems.map((item, index) => (
            <div>
              {item.label.toLowerCase() !== "studio" && <div>
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
                  expandIcon={<ExpandMoreIcon className="text-[#000] cursor-pointer" />}
                >
                  <Typography component="span">{item.label}</Typography>
                </AccordionSummary>
                <SmoothAccordionDetails onClick={(e) => e.stopPropagation()}>
                  {categories[hoveredIndex as number]?.sub_categories.map((i, index) => (
                    <CustomSubcategoriesAccordion
                      key={index}
                      expanded={hoveredItemIndex === index}
                      onClick={() =>
                        setHoveredItemIndex((prevIndex) =>
                          prevIndex === index ? null : index
                        )
                      }
                    >
                      <AccordionSummary
                        expandIcon={
                          <ExpandMoreIcon className="text-[#ff2f5f] cursor-pointer"/>
                        }
                      >
                        <Typography  className="text-[#ff3f6c]" component="span">
                          {i.name}
                        </Typography>
                      </AccordionSummary>
                      <SmoothAccordionDetails className="h-full max-h-[250px] overflow-auto">
                        {i.sub_category_types.map((sub, subIndex) => (
                          <Typography
                            key={subIndex}
                            className="text-sm text-[#282C3F] text-start py-[5px]"
                          >
                            {sub.name}
                          </Typography>
                        ))}
                      </SmoothAccordionDetails>
                    </CustomSubcategoriesAccordion>
                  ))}
                </SmoothAccordionDetails>
              </CustomAccordion>
              {index === menuItems.length - 2 && (
                <div className="border-t border-[#ff3f6c]"></div>
              )}
            </div>}
            </div>
          ))}
        </div>
        <div>
          <div className="flex flex-col justify-between w-full items-center mb-[100px]">
            <div onClick={() => navigate("/profile/overview")} className="flex pl-[25px] border-b py-[12px] border-[#ff3f6c] w-full text-[#282c3f] cursor-pointer items-center">
              <PersonOutlineIcon />
              <p className="text-[14px] my-[0px] font-[500] ml-[15px]">
                Profile
              </p>
            </div>
            {isUserLoggedIn && (
              <div className="flex pl-[25px] border-b border-[#ff3f6c] py-[12px] w-full text-[#282c3f] cursor-pointer items-center">
                <PowerSettingsNewOutlinedIcon />
                <p className="text-[14px] my-[0px] font-[500] ml-[15px]">
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>
      </CustomBox>
    </div>
  );
};

const SmoothAccordionDetails = styled(AccordionDetails)({
  scrollbarWidth: "thin",
  overflowY: "auto",
  padding: "8px 8px 16px 32px",
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
    borderColor: "#ff3f6c",
  },
  "&.Mui-focused": {
    borderColor: "#ff3f6c",
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
  borderTop: "1px solid #ff3f6c",
  boxShadow: "none",
  minHeight: "50px",
  margin: "0px",
  borderTopLeftRadius: "0px !important",
  borderTopRightRadius: "0px !important",
  "&.Mui-expanded": {
    borderColor: "#ff3f6c",
  },
  "& .MuiAccordionSummary-content": {
    margin: "0px",
  },
  "&.Mui-focused": {
    borderColor: "#ff3f6c",
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
  scrollbarColor: '#ff3f6c #f1f1f1',
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
