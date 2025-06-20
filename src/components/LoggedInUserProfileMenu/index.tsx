import React, { useState } from "react";
import { Popover } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ProfileDataItems, ProfileMenuItems } from "../../utils/constants";
import { removeAuthToken } from "../../store/slice/auth.slice";
import { RootState } from "../../store";
import { removeLoggedInUser } from "../../store/slice/users.slice";
import { ConfirmLogoutModal } from "../ConfirmLogoutDialog";

interface LoggedInProfileMenuProps {
  id: string;
  open: boolean;
  hoveredProfile: HTMLElement | null;
  handlePopoverClose: () => void;
  handlePopoverOpen: () => void;
  handleNavigate: (path: string) => void;
}

export const LoggedInUserProfileMenu: React.FC<LoggedInProfileMenuProps> = ({
  id,
  open,
  hoveredProfile,
  handlePopoverClose,
  handlePopoverOpen,
  handleNavigate,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users } = useSelector((state: RootState) => ({
    users: state.users.user,
  }));

  const [openLogoutDialog, setOpenLogoutDialog] = useState<boolean>(false);

  const handleLogout = () => {
    handleNavigate("/login");
    dispatch(removeAuthToken());
    dispatch(removeLoggedInUser());
    handlePopoverClose();
    handleCloseConfirmLogoutDialog();
  };

  const handleCloseConfirmLogoutDialog = () => setOpenLogoutDialog(false);
  const handleOpenConfirmLogoutDialog = () => setOpenLogoutDialog(true);

  const handleNavigation = (path: string) => {
    if (path === "/wishlist") {
      navigate(`${path}`, { replace: true });
    } else {
      navigate(`/profile${path}`, { replace: true });
    }
  };

  const handleItemsClick = (path: string) => {
    handleNavigation(path);
    handlePopoverClose();
  };

  return (
    <>
      <Popover
        id={id}
        open={open}
        className="login-popover"
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
        <div className="p-[20px] min-h-[415px] h-full min-w-[250px] w-full">
          <p className="text-[#282c3f] font-[700] mt-[10px] mb-[5px]">
            Hello Makwana
          </p>
          <p className="text text-[#696b79] text-xs my-[0px] font-normal">
            {users.email}
          </p>
          <hr className="my-4 border-t-[1px] border-[#d2d2d2] mb-[10px]" />
          <div>
            <ul className="list-none h-full text-[#282c3f] cursor-pointer mb-0 pl-[0px]">
              {ProfileMenuItems.map((item, index) => (
                <li
                  key={index}
                  className="text-[#6c6c6c] mt-[3px] mb-[3px] font-[400] w-full justify-center hover:text-[#40414b] hover:font-[700]"
                  onClick={() => handleItemsClick(item.path)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
          <hr className="my-4 border-t-[1px] border-[#d2d2d2] mb-[10px]" />
          <ul className="list-none h-full text-[#282c3f] cursor-pointer mb-[0px] pl-[0px]">
            {ProfileDataItems.map((item, index) => (
              <li
                key={index}
                onClick={() => handleItemsClick(item.path)}
                className="text-[#6c6c6c] mt-[3px] mb-[3px] font-[400] w-full justify-center hover:text-[#40414b] hover:font-[700]"
              >
                {item.title}
              </li>
            ))}
          </ul>

          <hr className="my-4 border-t-[1px] border-[#d2d2d2] mb-[10px]" />
          <ul className="list-none h-full text-[#282c3f] cursor-pointer mb-[0px] pl-[0px]">
            <li
              onClick={() => {
                navigate("/profile/my-profile");
                handlePopoverClose();
              }}
              className="text-[#6c6c6c] mt-[3px] mb-[3px] font-[400] w-full justify-center hover:text-[#40414b] hover:font-[700]"
            >
              Edit Profile
            </li>
            <li
              onClick={handleOpenConfirmLogoutDialog}
              className="text-[#6c6c6c] mt-[3px] mb-[3px] font-[400] w-full justify-center hover:text-[#40414b] hover:font-[700]"
            >
              Logout
            </li>
          </ul>
        </div>
      </Popover>
      <ConfirmLogoutModal
        handleCloseConfirmDialog={handleCloseConfirmLogoutDialog}
        handleConfirmLogout={handleLogout}
        openConfirmDialog={openLogoutDialog}
      />
    </>
  );
};
