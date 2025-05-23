import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../store";
import { LoaderOverlay } from "../../components/Loader";

export const Profile: React.FC = () => {
  const { users } = useSelector((state: RootState) => ({
    users: state.users.userData,
  }));

  return (
    <>
      <LoaderOverlay />
      <div className="relative">
        <div className="flex justify-center items-center h-full overflow-hidden">
          <div className="pt-[25px] w-full max-w-[1050px] mx-auto responsive-profile-page mb-[40px]">
            <div className="flex flex-col items-start account-section">
              <p className="text text-[16px] font-[700] m-[0px]">Account</p>
              <p className="text text-xs text-[#363d42] font-[400] m-[0px]">
                {users?.full_name}
              </p>
              <hr className="border-t-[1px] w-full border-[#d2d2d2] mt-[15px] mb-[0px]" />
            </div>
            <div className="flex items-stretch">
              <div className="flex flex-col max-w-[200px] w-full justify-start profile-sidebar">
                <NavLink
                  to="overview"
                  className={({ isActive }) =>
                    `text-start text-[14px] font-[400] cursor-pointer my-[25px] ${
                      isActive
                        ? "text-[#3880FF] font-[700] hover:text-[#3880FF] focus:outline-none"
                        : "text-[#363d42] hover:text-[#363d42] focus:outline-none"
                    }`
                  }
                >
                  Overview
                </NavLink>
                <hr className="border-t-[1px] w-full border-[#d2d2d2] mt-[0px]" />
                <div className="flex flex-col justify-start">
                  <p className="text-start text-xs text-[#7e818c] font-[400] uppercase mb-[10px] mt-3">
                    Orders
                  </p>
                  <NavLink
                    to="orders"
                    className={({ isActive }) =>
                      `text-start text-[14px] font-[400] cursor-pointer my-[5px] ${
                        isActive
                          ? "text-[#3880FF] font-[700]"
                          : "text-[#363d42] hover:text-[#363d42]"
                      }`
                    }
                  >
                    Orders & Returns
                  </NavLink>
                </div>
                <hr className="border-t-[1px] w-full border-[#d2d2d2] mt-[10px]" />

                <div className="flex flex-col justify-start">
                  <p className="text-start text-[#7e818c] text-xs font-[400] mb-[10px] mt-3 uppercase">
                    Creadits
                  </p>
                  <NavLink
                    to="coupons"
                    className={({ isActive }) =>
                      `text-start text-[14px] font-[400] cursor-pointer my-[5px] ${
                        isActive
                          ? "text-[#3880FF] font-[700]"
                          : "text-[#363d42] hover:text-[#363d42]"
                      }`
                    }
                  >
                    Coupons
                  </NavLink>
                  <NavLink
                    to="credit"
                    className={({ isActive }) =>
                      `text-start text-[14px] font-[400] cursor-pointer my-[5px] ${
                        isActive
                          ? "text-[#3880FF] font-[700]"
                          : "text-[#363d42] hover:text-[#363d42]"
                      }`
                    }
                  >
                    Myntra Credit
                  </NavLink>
                  <NavLink
                    to="myncash"
                    className={({ isActive }) =>
                      `text-start text-[14px] font-[400] cursor-pointer my-[5px] ${
                        isActive
                          ? "text-[#3880FF] font-[700]"
                          : "text-[#363d42] hover:text-[#363d42]"
                      }`
                    }
                  >
                    Myncash
                  </NavLink>
                </div>

                <hr className="border-t-[1px] w-full border-[#d2d2d2] mt-[10px]" />

                <div className="flex flex-col justify-start">
                  <p className="text-start text-xs text-[#7e818c] mb-[10px] mt-3 font-[400] uppercase">
                    Account
                  </p>
                  <NavLink
                    to="my-profile"
                    className={({ isActive }) =>
                      `text-start text-[14px] font-[400] cursor-pointer my-[5px] ${
                        isActive
                          ? "text-[#3880FF] font-[700]"
                          : "text-[#363d42] hover:text-[#363d42]"
                      }`
                    }
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="saved-cards"
                    className={({ isActive }) =>
                      `text-start text-[14px] font-[400] cursor-pointer my-[5px] ${
                        isActive
                          ? "text-[#3880FF] font-[700]"
                          : "text-[#363d42] hover:text-[#363d42]"
                      }`
                    }
                  >
                    Saved Cards
                  </NavLink>

                  <NavLink
                    to="saved-upi"
                    className={({ isActive }) =>
                      `text-start text-[14px] font-[400] cursor-pointer my-[5px] ${
                        isActive
                          ? "text-[#3880FF] font-[700]"
                          : "text-[#363d42] hover:text-[#363d42]"
                      }`
                    }
                  >
                    Saved UPI
                  </NavLink>
                  <NavLink
                    to="saved-wallets"
                    className={({ isActive }) =>
                      `text-start text-[14px] font-[400] cursor-pointer my-[5px] ${
                        isActive
                          ? "text-[#3880FF] font-[700]"
                          : "text-[#363d42] hover:text-[#363d42]"
                      }`
                    }
                  >
                    Saved Wallets/BNPL
                  </NavLink>
                  <NavLink
                    to="Addresses"
                    className={({ isActive }) =>
                      `text-start text-[14px] font-[400] cursor-pointer my-[5px] ${
                        isActive
                          ? "text-[#3880FF] font-[700]"
                          : "text-[#363d42] hover:text-[#363d42]"
                      }`
                    }
                  >
                    Addresses
                  </NavLink>
                  <NavLink
                    to="insider"
                    className={({ isActive }) =>
                      `text-start text-[14px] font-[400] cursor-pointer my-[5px] ${
                        isActive
                          ? "text-[#3880FF] font-[700]"
                          : "text-[#363d42] hover:text-[#363d42]"
                      }`
                    }
                  >
                    Myntra Insider
                  </NavLink>
                  <NavLink
                    to="delete-account"
                    className={({ isActive }) =>
                      `text-start text-[14px] font-[400] cursor-pointer my-[5px] ${
                        isActive
                          ? "text-[#3880FF] font-[700]"
                          : "text-[#363d42] hover:text-[#363d42]"
                      }`
                    }
                  >
                    Delete Account
                  </NavLink>
                </div>

                <hr className="border-t-[1px] w-full border-[#d2d2d2] mt-[10px]" />

                <div className="flex flex-col justify-start">
                  <p className="text-start text-xs mb-[10px] mt-3 text-[#7e818c] font-[400] uppercase">
                    Legal
                  </p>
                  <NavLink
                    to="terms"
                    className={({ isActive }) =>
                      `text-start text-[14px] font-[400] cursor-pointer my-[5px] ${
                        isActive
                          ? "text-[#3880FF] font-[700]"
                          : "text-[#363d42] hover:text-[#363d42]"
                      }`
                    }
                  >
                    Terms of Use
                  </NavLink>
                  <NavLink
                    to="privacy-policy"
                    className={({ isActive }) =>
                      `text-start text-[14px] font-[400] cursor-pointer my-[5px] ${
                        isActive
                          ? "text-[#3880FF] font-[700]"
                          : "text-[#363d42] hover:text-[#363d42]"
                      }`
                    }
                  >
                    Privacy Policy
                  </NavLink>
                </div>
              </div>

              <hr className="w-[1px] mt-[0px] h-auto bg-[#d2d2d2] border-0 mx-[20px] profile-sidebar" />
              <div className="flex w-full">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
