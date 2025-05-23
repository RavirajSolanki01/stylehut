import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { UserProfile } from "../../../assets";
import { RootState } from "../../../store";
import { useNavigate } from "react-router-dom";
import { removeAuthToken } from "../../../store/slice/auth.slice";
import {
  accountSections,
  FooterSections,
  ordersAndCollection,
  PaymentSections,
  ProfileSection,
} from "../../../utils/constants";
import { removeLoggedInUser } from "../../../store/slice/users.slice";
import { ConfirmLogoutModal } from "../../ConfirmLogoutDialog";

export const Overview: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users } = useSelector((state: RootState) => ({
    users: state.users.user,
  }));

  const [openLogoutDialog, setOpenLogoutDialog] = useState<boolean>(false);

  const handleNavigate = (path: string) => {
    navigate(`/profile/${path}`);
  };

  const handleLogout = () => {
    handleNavigate("/login");
    dispatch(removeAuthToken());
    dispatch(removeLoggedInUser());
  };

  const handleCloseConfirmLogoutDialog = () => setOpenLogoutDialog(false);
  const handleOpenConfirmLogoutDialog = () => setOpenLogoutDialog(true);

  return (
    <div className="profile-section justify-center">
      <div className="my-[20px] max-w-[810px] w-full h-full mb-[50px] overview-container">
        <div className="flex justify-between min-w-[545px] w-full px-[20px] bg-[#F5F5F6] h-full max-h-[150px]">
          <div className="flex items-center">
            <img
              className="max-h-[100px] h-full max-w-[100px] w-full mr-[20px]"
              alt="UserProfile"
              src={UserProfile}
            />
            <p>{users.email}</p>
          </div>
          <button
            onClick={() => handleNavigate("my-profile")}
            className="max-h-[30px] h-full max-w-[110px] w-full items-center rounded-none 
            cursor-pointer border border-[#d2d2d2] text-[11px] font-[600] uppercase
          hover:border-[#3880FF] focus:outline-none p-[0px] mt-[22px]"
          >
            Edit Profile
          </button>
        </div>
        <div className="grid grid-cols-3 gap-[20px] py-[20px]">
          {accountSections.map((section, index) => (
            <div
              key={index}
              onClick={() => handleNavigate(section.path)}
              className="flex flex-col justify-center min-h-[255px] h-full max-w-[255px] w-full cursor-pointer items-center text-center border-[#EAEAEC] border-[0.5px] py-[30px] px-[10px] hover:bg-[#F5F5F6] transition-all duration-200"
            >
              <img
                className="w-[25px] h-[25px] mb-[10px]"
                src={section.icon}
                alt={section.title}
              />
              <p className="text-[15px] font-[600] text-[050505] m-[0px] py-[5px]">
                {section.title}
              </p>
              <p className="text-xs text-[#b7b7b7] font-[400] m-[0px] py-[5px]">
                {section.subtitle}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-start pb-[80px]">
          <button
            onClick={() => handleOpenConfirmLogoutDialog()}
            className="cursor-pointer bg-[#3880FF] text-center px-[12px] w-full py-[12px] 
        text-[#fff] text-[16px] font-[700] rounded-none focus:outline-none focus:border-none hover:outline-none hover:border-transparent uppercase logout-button"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="bg-[#F5F5F6] overview-responsive-container">
        <div className="mb-[9px] max-w-[810px] gap-[40px] bg-[#fff] w-full pb-[110px] flex flex-col items-center">
          <div className="relative flex justify-center">
            <div className="bg-[#F5F5F6] w-full min-w-[775px] min-h-[180px]"></div>
            <div className="flex flex-col gap-4 items-center absolute top-[100px]">
              <img
                className="max-h-[120px] h-full max-w-[120px] w-full"
                alt="UserProfile"
                src={UserProfile}
              />
              <p>{users.email}</p>
            </div>
          </div>
        </div>
        <div className="my-2">
          {ordersAndCollection.map((section, index) => (
            <div
              key={index}
              onClick={() => handleNavigate(section.path)}
              className="flex max-h-[65px] bg-[#fff] h-full w-full cursor-pointer items-center border-b-[0.5px] border-[#EAEAEC] py-[38px] px-[25px] hover:bg-[#F5F5F6] transition-all duration-200"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex justify-between items-center">
                  <img
                    className="w-[25px] h-[25px] mb-[10px]"
                    src={section.icon}
                    alt={section.title}
                  />
                  <div className="flex flex-col gap-0.5 mx-5">
                    <p className="text-[15px] font-[600] text-[050505] m-[0px]">
                      {section.title}
                    </p>
                    <p className="text-xs text-[#b7b7b7] font-[400] m-[0px]">
                      {section.subtitle}
                    </p>
                  </div>
                </div>
                <ChevronRightIcon fontSize="small" />
              </div>
            </div>
          ))}
        </div>
        <div className="my-2">
          {PaymentSections.map((section, index) => (
            <div
              key={index}
              onClick={() => handleNavigate(section.path)}
              className="flex max-h-[65px] bg-[#fff] h-full w-full cursor-pointer items-center border-b-[0.5px] border-[#EAEAEC] py-[38px] px-[25px] hover:bg-[#F5F5F6] transition-all duration-200"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex justify-between items-center">
                  <img
                    className="w-[25px] h-[25px] mb-[10px]"
                    src={section.icon}
                    alt={section.title}
                  />
                  <div className="flex flex-col gap-0.5 mx-5">
                    <p className="text-[15px] font-[600] text-[050505] m-[0px]">
                      {section.title}
                    </p>
                    <p className="text-xs text-[#b7b7b7] font-[400] m-[0px]">
                      {section.subtitle}
                    </p>
                  </div>
                </div>
                <ChevronRightIcon fontSize="small" />
              </div>
            </div>
          ))}
        </div>
        <div className="my-2">
          {ProfileSection.map((section, index) => (
            <div
              key={index}
              onClick={() => handleNavigate(section.path)}
              className="flex max-h-[65px] bg-[#fff] h-full w-full cursor-pointer items-center border-b-[0.5px] border-[#EAEAEC] py-[38px] px-[25px] hover:bg-[#F5F5F6] transition-all duration-200"
            >
              <div className="flex justify-between items-center w-full">
                <div className="flex justify-between items-center">
                  <img
                    className="w-[25px] h-[25px] mb-[10px]"
                    src={section.icon}
                    alt={section.title}
                  />
                  <div className="flex flex-col gap-0.5 mx-5">
                    <p className="text-[15px] font-[600] text-[050505] m-[0px]">
                      {section.title}
                    </p>
                    <p className="text-xs text-[#b7b7b7] font-[400] m-[0px]">
                      {section.subtitle}
                    </p>
                  </div>
                </div>
                <ChevronRightIcon fontSize="small" />
              </div>
            </div>
          ))}
        </div>
        <div className="my-2 pb-[20px]">
          <ul className="bg-[#fff] px-[70px] py-4">
            {FooterSections.map((section, index) => (
              <li
                key={index}
                className="py-1.5 text-[11px] text-[#282C3F] font-bold uppercase opacity-70"
              >
                {section}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center pb-[20px]">
          <button
            onClick={() => handleOpenConfirmLogoutDialog()}
            className="cursor-pointer bg-primary max-w-[750px] mb-4 text-center px-[12px] w-full py-[12px] 
        text-[#fff] text-[14px] font-[700] rounded focus:outline-none focus:border-none hover:outline-none hover:border-transparent logout-button uppercase"
          >
            Logout
          </button>
        </div>
      </div>
      <ConfirmLogoutModal
        handleCloseConfirmDialog={handleCloseConfirmLogoutDialog}
        handleConfirmLogout={handleLogout}
        openConfirmDialog={openLogoutDialog}
      />
    </div>
  );
};
