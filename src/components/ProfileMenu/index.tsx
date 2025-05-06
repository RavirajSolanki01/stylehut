import React from "react";
import { ProfileDataItems, ProfileMenuItems } from "../../utils/constants";
import { Popover } from "@mui/material";

interface ProfileMenuProps {
  id: string;
  open: boolean;
  hoveredProfile: HTMLElement | null;
  handlePopoverClose: () => void;
  handlePopoverOpen: () => void;
  handleNavigate: (path: string) => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  id,
  open,
  hoveredProfile,
  handlePopoverClose,
  handlePopoverOpen,
  handleNavigate,
}) => {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={hoveredProfile}
      onClose={handlePopoverClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      disableRestoreFocus
      slotProps={{
        paper: {
          onMouseEnter: handlePopoverOpen,
          sx: {
            boxShadow: "0 4px 12px 0 rgba(0,0,0,.05)",
            borderRadius: "0px",
          },
        },
      }}
    >
      <div className="p-[20px] min-h-[435px] h-full min-w-[250px] w-full">
        <p className="text-[#282c3f] font-[700] mt-[10px] mb-[5px]">Welcome</p>
        <p className="text text-[#696b79] my-[0px] font-normal">
          To access account and manage oders
        </p>
        <button
          onClick={() => handleNavigate("login")}
          className="cursor-pointer bg-transparent border border-[#d2d2d2] text-[#ff3f6c] text-center 
              px-[10px] w-[145px] py-[10px] my-[15px] text-[14px] font-[700] rounded-none uppercase 
             hover:font-[700] transition-colors duration-300
              hover:border-[#ff3f6c]  focus:outline-none"
        >
          Login/Signup
        </button>
        <hr className="my-4 border-t-[1px] border-[#d2d2d2] mb-[10px]" />
        <div>
          <ul className="list-none h-full text-[#282c3f] cursor-pointer mb-0 pl-[0px]">
            {ProfileMenuItems.map((item, index) => (
              <li
                key={index}
                className="text-[#6c6c6c] mt-[3px] mb-[3px] font-[400] w-full justify-center hover:text-[#40414b] hover:font-[700]"
                onClick={() => handleNavigate(item.path)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-4 border-t-[1px] border-[#d2d2d2] mb-[10px]" />
        <ul className="list-none h-full text-[#282c3f] cursor-pointer mb-[0px] pl-[0px]">
          {ProfileDataItems.map((item) => (
            <li className="text-[#6c6c6c] mt-[3px] mb-[3px] font-[400] w-full justify-center hover:text-[#40414b] hover:font-[700]">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Popover>
  );
};
