"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  CircularProgress,
} from "@mui/material";

import CommonButton from "../Common/CommonButton";
import Input from "../Common/Input";
import { toast } from "react-toastify";

interface EditMaterialFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    aluminum: number;
    plastic: number;
    glass: number;
  }) => void;
}

const EditMaterialForm: React.FC<EditMaterialFormProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    aluminum: "",
    plastic: "",
    glass: "",
  });
  const [btnDisable, setBtnDisable] = useState(false);
  const [errors, setErrors] = useState({
    aluminum: "",
    plastic: "",
    glass: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = { aluminum: "", plastic: "", glass: "" };
    let valid = true;
    if (!formData.aluminum) {
      newErrors.aluminum = "Aluminum count is required";
      valid = false;
    }
    if (!formData.plastic) {
      newErrors.plastic = "Plastic count is required";
      valid = false;
    }
    if (!formData.glass) {
      newErrors.glass = "Glass count is required";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setBtnDisable(true);

    try {
      const response = await fetch("http://localhost:4000/material-details", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          aluminum: Number(formData.aluminum),
          plastic: Number(formData.plastic),
          glass: Number(formData.glass),
        }),
      });

      if (response.ok) {
        toast.success("Materials updated successfully!");
        onSubmit({
          aluminum: Number(formData.aluminum),
          plastic: Number(formData.plastic),
          glass: Number(formData.glass),
        });
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      toast.error("Failed to update materials. Please try again later.");
    } finally {
      setBtnDisable(false);
      onClose();
    }
  };

  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      // Allow only digits
      handleChange(e);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          background:
            "linear-gradient(93deg, rgba(16,120,56,1) 0%, rgba(84,165,62,1) 100%)",
          color: "white",
          fontWeight: 700,
        }}
      >
        Edit Materials
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Input
              label="Aluminum"
              name="aluminum"
              value={formData.aluminum}
              onChange={handleNumericChange}
              error={errors.aluminum}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input
              label="Plastic"
              name="plastic"
              value={formData.plastic}
              onChange={handleNumericChange}
              error={errors.plastic}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input
              label="Glass"
              name="glass"
              value={formData.glass}
              onChange={handleNumericChange}
              error={errors.glass}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <CommonButton
          type="button"
          className="w-full p-2 border-2 border-green-800 text-green-800 rounded-[10px] hover:bg-gray-100"
          onClick={onClose}
        >
          Cancel
        </CommonButton>
        <CommonButton
          type="button"
          className="w-full p-2 border-2 border-green-800 bg-green-800 text-white rounded-[10px] hover:bg-green-700"
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

export default EditMaterialForm;
