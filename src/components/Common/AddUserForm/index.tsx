import {
  getUsersApi,
  postUsersApi,
  updateUsersAdminApi,
} from "@/store/app/admin/AdminUserSlice";
import { useDispatch } from "@/store/hooks";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import CommonButton from "../CommonButton";
import Dropdown from "../Drop-down";
import Input from "../Input";
import PasswordInput from "../PasswordInput"; // Import the custom PasswordInput component

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (val: any) => void;
  editdata?: any;
}

interface FormType {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roleId: string;
  state: string;
  password: string;
  confirmPassword: string;
}

// Convert roleOptions and statusOptions to string arrays
const roleOptions = ["Admin", "User"];
const statusOptions = ["Active", "Inactive"];

const UserFormDialog: React.FC<FormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  editdata,
}) => {
  const dispatch = useDispatch();
  const [btnDisable, setBtnDisable] = useState(false);
  const [formData, setFormData] = useState<FormType>({
    firstName: editdata?.firstName || "",
    lastName: editdata?.lastName || "",
    email: editdata?.email || "",
    phoneNumber: editdata?.phonenumber || "",
    roleId: editdata?.role || "Select Role", // Default to first option if none selected
    state: editdata?.state || "Select Status", // Default to first option if none selected
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormType>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    roleId: "",
    state: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleDropdownChange = (field: keyof FormType, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    setErrors({ ...errors, [field]: "" });
  };

  const validate = () => {
    let tempErrors = { ...errors };
    tempErrors.firstName = formData.firstName ? "" : "First Name is required";
    tempErrors.lastName = formData.lastName ? "" : "Last Name is required";
    tempErrors.email = formData.email
      ? /^\S+@\S+\.\S+$/.test(formData.email)
        ? ""
        : "Email is not valid"
      : "Email is required";
    tempErrors.phoneNumber = formData.phoneNumber
      ? /^\d{10}$/.test(formData.phoneNumber)
        ? ""
        : "Mobile number must be 10 digits"
      : "Mobile number is required";
    tempErrors.roleId =
      formData.roleId !== "Select Role" ? "" : "Role is required";
    tempErrors.state =
      formData.state !== "Select Status" ? "" : "Status is required";
    if (!editdata?.id) {
      if (!formData.password) {
        tempErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        tempErrors.password = "Password must be at least 6 characters";
      } else if (!/[A-Z]/.test(formData.password)) {
        tempErrors.password =
          "Password must contain at least one uppercase letter";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
        tempErrors.password =
          "Password must contain at least one special character";
      } else if (!/[0-9]/.test(formData.password)) {
        tempErrors.password = "Password must contain at least one number";
      } else {
        tempErrors.password = "";
      }

      if (!formData.confirmPassword) {
        tempErrors.confirmPassword = "Confirm Password is required";
      } else if (formData.confirmPassword !== formData.password) {
        tempErrors.confirmPassword = "Passwords do not match";
      } else {
        tempErrors.confirmPassword = "";
      }
    }
    setErrors(tempErrors);

    // Check if all fields are valid
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = async () => {
    if (validate()) {
      setBtnDisable(true);
      if (editdata && editdata?.id) {
        let Object = {
          roleId: formData.roleId === "Admin" ? 2 : 1,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          state: formData.state,
        };
        // console.log(Object);
        const result = await dispatch(updateUsersAdminApi(Object, editdata.id));
        if (result.status === 200) {
          toast.success(result.message);
          await dispatch(getUsersApi());
          setBtnDisable(false);
        }
      } else {
        let newObj = {
          ...formData,
          roleId: formData.roleId === "Admin" ? 2 : 1,
        };
        const result = await dispatch(postUsersApi(newObj));
        if (result.status === 201) {
          toast.success(result.message);
          await dispatch(getUsersApi());
          setBtnDisable(false);
        }
      }
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          background: "linear-gradient(90deg, #1db954, #1ed760)",
          color: "white",
          fontWeight: 700,
        }}
      >
        {editdata && editdata?.id ? "Edit User" : "Add User"}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className="h-20">
            <Input
              value={formData.firstName}
              onChange={handleInputChange}
              label="First Name"
              name="firstName"
              className="bg-white"
              error={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6} className="h-20">
            <Input
              value={formData.lastName}
              onChange={handleInputChange}
              label="Last Name"
              name="lastName"
              className="bg-white"
              error={errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6} className="h-20">
            <Dropdown
              options={roleOptions}
              selected={formData.roleId}
              onChange={(value: string) =>
                handleDropdownChange("roleId", value)
              }
              divClasses="bg-white"
              buttonClasses="text-black bg-white !p-[12px]"
              menuClasses="bg-white"
              optionClasses=""
              width="100%"
              error={errors.roleId}
            />
          </Grid>
          <Grid item xs={12} sm={6} className="h-20">
            <Dropdown
              options={statusOptions}
              selected={formData.state}
              onChange={(value: string) => handleDropdownChange("state", value)}
              divClasses="bg-white"
              buttonClasses="text-black bg-white !p-[12px]"
              menuClasses="bg-white"
              optionClasses=""
              width="100%"
              error={errors.state}
            />
          </Grid>
          <Grid item xs={12} className="h-20">
            <Input
              value={formData.email}
              onChange={handleInputChange}
              label="Email"
              name="email"
              className="bg-white"
              error={errors.email}
            />
          </Grid>
          <Grid item xs={12} className="h-20">
            <Input
              value={formData.phoneNumber}
              onChange={handleInputChange}
              label="Mobile Number"
              name="phoneNumber"
              className="bg-white"
              error={errors.phoneNumber}
            />
          </Grid>

          {/* if()

          <div className="h-16 invisible">invisible</div> */}

          {editdata && editdata?.id ? (
            ""
          ) : (
            <>
              <Grid item xs={12} sm={6} className="h-20">
                <PasswordInput
                  value={formData.password}
                  onChange={handleInputChange}
                  label="Password"
                  name="password"
                  className="bg-white"
                  error={errors.password}
                />
              </Grid>
              <Grid item xs={12} sm={6} className="h-20">
                <PasswordInput
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  label="Confirm Password"
                  name="confirmPassword"
                  className="bg-white"
                  error={errors.confirmPassword}
                />
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <CommonButton
          type="button"
          className="w-full p-2 border-2 border-green-800 text-green-800 rounded-[10px] hover:bg-gray-100 mb-3 lg:mb-2 xl:mb-4"
          onClick={onClose}
        >
          Cancel
        </CommonButton>
        <CommonButton
          type="button"
          className="w-full p-2 border-2 border-green-800 bg-green-800 text-white rounded-[10px] hover:bg-green-700 mb-3 lg:mb-2 xl:mb-4"
          onClick={handleSubmit}
          disabled={btnDisable}
        >
          {btnDisable ? (
            <CircularProgress size={23} className="!text-white" />
          ) : (
            "Submit"
          )}
        </CommonButton>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormDialog;
