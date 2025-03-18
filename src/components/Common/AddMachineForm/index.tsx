"use client";

import demoimg from "@/assets/images/drag_drop.png";
import {
  getMachinesApi,
  postMachinesApi,
  putMachinesApi,
} from "@/store/app/machine/MachineSlice";
import { useDispatch, useSelector } from "@/store/hooks";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import CommonButton from "../CommonButton";
import Input from "../Input";

interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  editdata: any;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 29.747010680964586,
  lng: -95.36335317937738,
};

const FormDialog: React.FC<FormDialogProps> = ({ open, onClose, editdata }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAhlyzLDrKYMriRJ-AZ7Unq-Zj8jGQGghc", // Replace with your Google Maps API key
  });

  const [formState, setFormState] = useState({
    position: center,
    title: "",
    number: "",
    imageFile: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [btnDisable, setBtnDisable] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editdata?.id) {
      const updatedData = {
        position: {
          lat: Number(editdata.latitude),
          lng: Number(editdata.longitude),
        },
        title: editdata.title,
        number: editdata.number,
        imageFile: editdata.image,
      };
      setImagePreview(editdata.image);
      setFormState(updatedData);
    }
  }, [editdata]);

  // useEffect(() => {
  //     if (editdata?.id) {
  //         const updatedData = {
  //             position: {
  //                 lat: Number(editdata.latitude),
  //                 lng: Number(editdata.longitude),
  //             },
  //             title: editdata.title,
  //             number: editdata.number,
  //             imageFile: editdata.image,
  //         };

  //         // Perform a shallow comparison
  //         if (
  //             formState.position.lat !== updatedData.position.lat ||
  //             formState.position.lng !== updatedData.position.lng ||
  //             formState.title !== updatedData.title ||
  //             formState.number !== updatedData.number ||
  //             formState.imageFile !== updatedData.imageFile
  //         ) {
  //             setImagePreview(editdata.image);
  //             setFormState(updatedData);
  //         }
  //     }
  // }, [editdata, formState]);

  const [formErrors, setFormErrors] = useState({
    title: "",
    number: "",
    imageFile: "",
  });

  const onLoad = useCallback((mapInstance: google.maps.Map) => {
    setFormState((prev) => ({ ...prev, map: mapInstance }));
  }, []);

  const onUnmount = useCallback(() => {
    setFormState((prev) => ({ ...prev, map: null }));
  }, []);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setFormState((prev) => ({
        ...prev,
        position: {
          lat: event.latLng!.lat(),
          lng: event.latLng!.lng(),
        },
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setFormState((prev) => ({ ...prev, imageFile: file }));
        setImagePreview(URL.createObjectURL(file));
        setFormErrors((prev) => ({ ...prev, imageFile: "" }));
      } else {
        setFormErrors((prev) => ({
          ...prev,
          imageFile: "Please upload an image file.",
        }));
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormState((prev) => ({ ...prev, imageFile: file }));
      setImagePreview(URL.createObjectURL(file));
      setFormErrors((prev) => ({ ...prev, imageFile: "" }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        imageFile: "Please upload an image file.",
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const validateForm = () => {
    let valid = true;
    let errors = { title: "", number: "", imageFile: "" };

    if (!formState.title) {
      errors.title = "Title is required";
      valid = false;
    }
    if (!formState.number) {
      errors.number = "Number is required";
      valid = false;
    }
    if (!formState.imageFile) {
      errors.imageFile = "Image is required";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setBtnDisable(true);
    const formData = new FormData();
    formData.append("title", formState.title);
    formData.append("number", formState.number);
    formData.append("latitude", formState.position.lat.toString());
    formData.append("longitude", formState.position.lng.toString());
    if (formState.imageFile) {
      formData.append("file", formState.imageFile);
    }

    // Dispatch the POST request with formData
    if (editdata.id) {
      const result = await dispatch(putMachinesApi(formData, editdata.id));
      if (result.status === 200) {
        await dispatch(getMachinesApi());
        toast.success(result.message);
      }
    } else {
      const result = await dispatch(postMachinesApi(formData));
      if (result.status === 201) {
        await dispatch(getMachinesApi());
        toast.success(result.message);
      }
    }
    onClose();
    // Reset form state
    setFormState({
      position: center,
      title: "",
      number: "",
      imageFile: null,
    });
    setImagePreview(null);

    // Reset form errors
    setFormErrors({
      title: "",
      number: "",
      imageFile: "",
    });
    setBtnDisable(false);
  };

  const handleCancel = () => {
    // Reset form state
    setFormState({
      position: center,
      title: "",
      number: "",
      imageFile: null,
    });
    setImagePreview(null);

    // Reset form errors
    setFormErrors({
      title: "",
      number: "",
      imageFile: "",
    });

    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="md" fullWidth>
      <DialogTitle className="font-semibold text-[25px]">
        Add Machine Details
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} className="mt-px">
          <Grid item xs={12}>
            <Input
              value={formState.title}
              onChange={(e) => {
                setFormState((prev) => ({ ...prev, title: e.target.value }));
                setFormErrors((prev) => ({ ...prev, title: "" }));
              }}
              label="Title"
              name="title"
              error={formErrors.title}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              value={formState.number}
              onChange={(e) => {
                setFormState((prev) => ({ ...prev, number: e.target.value }));
                setFormErrors((prev) => ({ ...prev, number: "" }));
              }}
              label="Number"
              name="number"
              error={formErrors.number}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Upload Image
            </Typography>
            <Box
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              sx={{
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
                borderRadius: "10px",
                cursor: "pointer",
                backgroundColor: "#f9f9f9",
                position: "relative",
                transition: "border-color 0.3s, background-color 0.3s",
                "&:hover": {
                  borderColor: "#007bff",
                  backgroundColor: "#f0f8ff",
                },
              }}
            >
              <input
                type="file"
                id="file"
                name="file"
                accept="image/*" // Restrict file input to image files only
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
                onChange={handleFileChange} // Add change handler for image input
              />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Selected Image"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    transition: "opacity 0.3s",
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src={demoimg}
                    alt="Upload"
                    width={50}
                    style={{ marginBottom: "10px" }}
                  />
                  <Typography variant="body1">
                    Drag and Drop or{" "}
                    <span style={{ color: "#007bff", cursor: "pointer" }}>
                      browse
                    </span>{" "}
                    your file to upload
                  </Typography>
                </div>
              )}
            </Box>
            {formErrors.imageFile && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                {formErrors.imageFile}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Location
            </Typography>
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={formState.position}
                zoom={10}
                onClick={handleMapClick}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                <Marker position={formState.position} />
              </GoogleMap>
            )}
          </Grid>
          <Grid item xs={6}>
            <Input
              value={formState.position.lat?.toString()}
              onChange={() => {}}
              label="Latitude"
              name="latitude"
              error={false}
              className="bg-gray-100"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              value={formState.position.lng?.toString()}
              onChange={() => {}}
              label="Longitude"
              name="longitude"
              error={false}
              className="bg-gray-100"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <CommonButton
          type="button"
          className="w-full p-2 border-2 border-green-800 text-green-800 rounded-[10px] hover:bg-gray-100 mb-3 lg:mb-2 xl:mb-4"
          onClick={handleCancel}
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

export default FormDialog;
