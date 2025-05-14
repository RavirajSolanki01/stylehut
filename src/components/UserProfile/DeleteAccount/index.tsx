import React, { useState } from "react";
import { DeleteAccountImage } from "../../../assets";
import { Checkbox, FormControlLabel } from "@mui/material";

export const DeleteAccount: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <div className="my-[15px] max-w-[810px] w-full border border-[#d2d2d2] p-[30px] delete-account">
      <div className="w-full mx-auto">
        <p className="text text-[16px] font-[700] m-[0px]">Delete Account</p>
        <hr className="border-t-[0px] w-full border-[#d2d2d2] mt-[15px] mb-[0px]" />

        <img
          className="py-[30px]"
          alt="delete_account"
          src={DeleteAccountImage}
        />
        <div className="px-[30px]">
          <p className="flex justify-start text-[14px] font-[700]">
            Is this goodbye? Are you sure you don't want to reconsider?
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[14px]">
            <li className="text-[14px] font-[700] text-start py-[8px]">
              You'll lose your order history, saved details, Myntra Credit,
              MynCash, SuperCoins and all other coupons and benefits.
            </li>
            <p className="text-start text-xs">
              Any account related benefits will be forfeited once the account is
              deleted and will no longer be available to you. You cannot recover
              the same. However, you can always create a new account. By
              deleting your account, you acknowledge you have read our {""}
              <span className="text-[#3880FF] text-xs cursor-pointer">
                Privacy Policy.
              </span>
            </p>
            <li className="text-[14px] font-[700] text-start py-[8px]">
              Any pending orders, exchanges, returns or refunds will no longer
              be accessible via your account.
            </li>
            <p className="flex justify-start text-start text-xs">
              Myntra will try to complete the open transactions in the next 30
              days on a best effort basis. However, we cannot ensure tracking &
              traceability of transactions once the account is deleted.
            </p>
            <li className="text-[14px] font-[700] text-start py-[8px]">
              Myntra may not extend New User coupon if an account is created
              with the same mobile number or email id.
            </li>
            <li className="text-[14px] font-[700] text-start py-[8px]">
              Myntra may refuse or delay deletion in case there are any pending
              grievances related to orders, shipments, cancellations or any
              other services offered by Myntra.
            </li>
            <li className="text-[14px] font-[700] text-start py-[8px]">
              Myntra may retain certain data for legitimate reasons such as
              security, fraud prevention, future abuse, regulatory compliance
              including exercise of legal rights or comply with legal orders
              under applicable laws.
            </li>
          </ul>
        </div>
        <div className="flex justify-start pb-[10px] px-[45px]">
          <FormControlLabel
            label="I agree to all the terms and conditions*"
            control={
              <Checkbox
                checked={checked}
                onChange={handleChange}
                sx={{
                  color: "#3880FF",
                  "&.Mui-checked": {
                    color: "#3880FF",
                  },
                }}
              />
            }
          />
        </div>
        <div className="flex justify-between px-[45px] gap-2 delete-account-actions">
          <button
            type="submit"
            disabled={!checked}
            className="cursor-pointer text-[#3880FF] border border-[#3880FF] text-center px-[12px] w-full max-w-[320px] py-[12px] 
            text-[14px] font-[700] rounded-none uppercase
            disabled:text-[#3880FF] disabled:border-[#3880FF] disabled:cursor-not-allowed
            focus:outline-none hover:outline-none hover:border-[#3880FF] delete-account-buttons"
          >
           Delete Anyway
          </button>
          <button
            type="submit"
            className="cursor-pointer bg-[#3880FF] text-center px-[12px] w-full max-w-[320px] py-[12px] 
            text-[#fff] text-[14px] font-[700] rounded-none uppercase
            focus:outline-none focus:border-none hover:outline-none hover:border-transparent delete-account-buttons"
          >
            Keep Account
          </button>
        </div>
      </div>
    </div>
  );
};
