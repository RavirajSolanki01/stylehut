import { Dialog, FormControl, CircularProgress } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import {
  CustomInput,
  CustomRadioGroup,
  CustomFormControlLabel,
  CustomRadioButton,
} from "../UserProfile/Addresses";
import { FormAddressData } from "../../utils/types";

interface AddressDialogProps {
  open: boolean;
  handleClose: () => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  control: Control<FormAddressData>;
  errors: FieldErrors<FormAddressData>;
  editIndex: number | null;
  isLoading: boolean;
  typeOfAddress: string;
  CustomCheckboxComponent: React.ElementType;
}

export const AddressDialog: React.FC<AddressDialogProps> = ({
  open,
  control,
  errors,
  editIndex,
  isLoading,
  typeOfAddress,
  handleClose,
  handleFormSubmit,
  CustomCheckboxComponent,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
    >
      <div>
        <div className="font-semibold text-[16px] p-6 uppercase border-b-[#d4d5d9] text-[#5c5e69]">
          {editIndex !== null ? "Edit Address" : "Add New Address"}
        </div>

        <div className="bg-[#F5F5F6] h-4"> </div>
        <div>
          <form className="space-y-1" onSubmit={handleFormSubmit}>
            <div className="flex flex-col gap-[10px] justify-center bg-[#F5F5F6]">
              <div className="bg-white mb-1 p-6 pb-2">
                <Controller
                  name="full_name"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      id="full_name"
                      label="Name"
                      fullWidth
                      error={Boolean(errors.full_name)}
                      helperText={errors.full_name?.message}
                      variant="outlined"
                      autoComplete="off"
                    />
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      id="phone"
                      label="Mobile"
                      autoComplete="off"
                      onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, "");
                        if (onlyDigits.length <= 10) {
                          field.onChange(onlyDigits);
                        }
                      }}
                      fullWidth
                      error={Boolean(errors.phone)}
                      helperText={errors.phone?.message}
                      variant="outlined"
                    />
                  )}
                />
              </div>
              <div className="bg-white mb-1.5 px-6 pt-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pincode-container">
                  <Controller
                    name="postal_code"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        id="postal_code"
                        label="Pincode"
                        fullWidth
                        error={Boolean(errors.postal_code)}
                        helperText={errors.postal_code?.message}
                        autoComplete="off"
                        variant="outlined"
                      />
                    )}
                  />

                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <CustomInput
                        {...field}
                        id="state"
                        label="State"
                        fullWidth
                        error={Boolean(errors.state)}
                        helperText={errors.state?.message}
                        autoComplete="off"
                        variant="outlined"
                        disabled={true}
                      />
                    )}
                  />
                </div>

                <Controller
                  name="address_line1"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      id="address_line1"
                      label="Address (House No, Building , Street, Area)"
                      autoComplete="off"
                      fullWidth
                      error={Boolean(errors.address_line1)}
                      helperText={errors.address_line1?.message}
                      variant="outlined"
                    />
                  )}
                />
                <Controller
                  name="address_line2"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      autoComplete="off"
                      id="address_line2"
                      label="Locality / Town"
                      fullWidth
                      error={Boolean(errors.address_line2)}
                      helperText={errors.address_line2?.message}
                      variant="outlined"
                    />
                  )}
                />
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <CustomInput
                      {...field}
                      id="city"
                      label="City / District"
                      autoComplete="off"
                      fullWidth
                      error={Boolean(errors.city)}
                      helperText={errors.city?.message}
                      variant="outlined"
                      disabled={true}
                    />
                  )}
                />
              </div>

              <div className="bg-white mb-4 p-6 pb-3">
                <Controller
                  name="address_type"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl>
                      <label className="text-[#535766]" id="address_type">
                        Type of Address
                      </label>
                      <CustomRadioGroup
                        aria-labelledby="address_type"
                        row
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        sx={{ gap: 10, marginTop: "5px" }}
                      >
                        <CustomFormControlLabel
                          value="HOME"
                          control={<CustomRadioButton />}
                          label="Home"
                        />
                        <CustomFormControlLabel
                          value="OFFICE"
                          control={<CustomRadioButton />}
                          label="Office"
                        />
                      </CustomRadioGroup>
                    </FormControl>
                  )}
                />

                {typeOfAddress?.toLowerCase() === "office" && (
                  <div className="mt-3 flex flex-col gap-1">
                    <label className="text-[#535766]">
                      Is your office open on weekends?
                    </label>
                    <Controller
                      name="is_open_saturday"
                      control={control}
                      defaultValue={false}
                      render={({ field: { value, onChange } }) => (
                        <CustomFormControlLabel
                          control={
                            <CustomCheckboxComponent
                              checked={value}
                              onChange={(e: {
                                target: { checked: boolean };
                              }) => {
                                onChange(e.target.checked);
                              }}
                            />
                          }
                          label="Opens on Saturday"
                        />
                      )}
                    />
                    <Controller
                      name="is_open_sunday"
                      control={control}
                      defaultValue={false}
                      render={({ field: { value, onChange } }) => (
                        <CustomFormControlLabel
                          control={
                            <CustomCheckboxComponent
                              checked={value}
                              onChange={(e: {
                                target: { checked: boolean };
                              }) => {
                                onChange(e.target.checked);
                              }}
                            />
                          }
                          label="Opens on Sunday"
                        />
                      )}
                    />
                  </div>
                )}

                <hr className="my-2 border-gray-300" />

                <Controller
                  name="is_default"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <CustomFormControlLabel
                      control={
                        <CustomCheckboxComponent
                          checked={field.value}
                          onChange={(e: { target: { checked: boolean } }) => {
                            field.onChange(e.target.checked);
                          }}
                        />
                      }
                      label="Make this as my default address"
                    />
                  )}
                />
              </div>

              <div className="bg-white">
                <div className="flex items-center text-sm font-semibold my-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 text-[#636363] p-1 focus:outline-none cursor-pointer uppercase"
                  >
                    Cancel
                  </button>
                  <div className="border-l border-gray-300 h-5 mx-2" />
                  <button
                    type="submit"
                    className="flex-1 uppercase text-[#ff3f6c] p-1 focus:outline-none cursor-pointer"
                  >
                    {isLoading ? (
                      <CircularProgress size={20} style={{ color: "#fff" }} />
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};
