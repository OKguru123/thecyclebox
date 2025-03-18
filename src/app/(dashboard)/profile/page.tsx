"use client";
import React, { useState, useEffect } from "react";
import CommonButton from "@/components/Common/CommonButton";
import Input from "@/components/Common/Input";
import backArrow from "../../../assets/images/back-arrow.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "@/store/hooks";
import { updateUsersApi } from "@/store/app/user/MainUserSlice";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profileImage: null as File | null, // This will store the actual File object
    storedImage: "",
  });

  useEffect(() => {
    // Fetch data from localStorage
    const storedData = JSON.parse(localStorage.getItem("userInfo") || "{}");
    setId(storedData.id);
    setProfileData({
      firstName: storedData.firstName || "",
      lastName: storedData.lastName || "",
      email: storedData.email || "",
      phoneNumber: storedData.phoneNumber || "",
      profileImage: null,
      storedImage: storedData.image || "",
    });
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear the error when user types
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      // Store the File object directly in profileData
      setProfileData({ ...profileData, profileImage: file });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { firstName: "", lastName: "", email: "" };

    if (!profileData.firstName) {
      newErrors.firstName = "First name is required";
      valid = false;
    }
    if (!profileData.lastName) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }
    if (!profileData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setBtnDisable(true);
    const formData = new FormData();

    // Append each field to the FormData object
    formData.append("firstName", profileData.firstName);
    formData.append("lastName", profileData.lastName);
    formData.append("email", profileData.email);
    formData.append("phoneNumber", profileData.phoneNumber);

    // If there is a profile image, append it to the formData
    if (profileData.profileImage) {
      formData.append("file", profileData.profileImage); // profileImage is already a File object
    }

    try {
      const result = await dispatch(updateUsersApi(formData, id));

      if (result.status == 200) {
        // Update local storage if needed
        localStorage.setItem("userInfo", JSON.stringify(result.body));
        setProfileData({
          ...profileData,
          storedImage: result.body.image, // Assuming 'image' is the key in the response body
          profileImage: null, // Reset the profileImage as it's now uploaded
        });
        toast.success(result.message);
      } else {
        console.error("Failed to update profile");
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error("An error occurred while updating the profile.");
    }

    setIsEditing(false);
    setBtnDisable(false);
  };

  const getInitials = () => {
    const { firstName, lastName } = profileData;
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  const imgUrl = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}user-image/`;
  const profileImageUrl = profileData.profileImage ? URL.createObjectURL(profileData.profileImage) : profileData.storedImage.length > 1 ? imgUrl + profileData.storedImage : null;


  return (
    <>
      <div className="mb-6">
        <button onClick={() => router.back()} className="flex items-center gap-2 self-start text-gray-700 hover:text-green-600 mb-6">
          <Image src={backArrow} alt="Back" className="w-6 h-6" />
          <h4 className="text-xl sm:text-2xl font-medium">Back</h4>
        </button>

      </div>
      <div className="max-w-5xl mx-auto bg-white rounded-xl  overflow-hidden p-8 " style={{ boxShadow: "-4px 4px 25px 0px #00000040" }}>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4  sm:mb-12 text-start sm:text-center">
          Profile
        </h1>
        <div className="flex flex-col md:flex-row">
          {/* Left Section: Profile Image and Buttons */}
          <div className="w-full md:w-1/3 flex flex-col items-center justify-center mb-6 md:mb-0">
            <div className="relative mb-4">
              {profileImageUrl ? (
                <div className="w-36 h-36">
                  <Image
                    src={profileImageUrl}
                    alt="Profile"
                    width={100}
                    height={100}
                    className="rounded-full w-full h-full  object-cover shadow-md"
                  />
                </div>

              ) : (
                <div className="flex items-center justify-center bg-[#006838] text-white rounded-full w-36 h-36 text-3xl font-semibold shadow-md">
                  {getInitials()}
                </div>
              )}
              {isEditing && (
                <label
                  htmlFor="profileImageUpload"
                  className="w-[30px] h-[30px] flex justify-center items-center absolute right-0 bottom-0 bg-green-700 text-white p-1 rounded-full border shadow-md cursor-pointer"
                >
                  <span className="text-xl">✎</span>
                  <input
                    type="file"
                    id="profileImageUpload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>

            <h2 className="text-center text-2xl font-semibold mb-4 text-gray-800">
              {`${profileData.firstName} ${profileData.lastName}`}
            </h2>

            <div className="flex flex-col gap-4 w-full px-4">
              <CommonButton
                onClick={handleEditClick}
                className={`${isEditing ? "bg-red-500 hover:bg-red-700" : "bg-green-700 hover:bg-green-800"
                  } text-white w-full py-2 rounded-lg shadow-md`}
              >
                {isEditing ? "Cancel" : "Edit"}
              </CommonButton>
              {isEditing && (
                <CommonButton
                  onClick={handleSave}
                  className="bg-green-700 text-white rounded-lg hover:bg-green-800 w-full py-2 shadow-md"
                  disabled={btnDisable}
                >
                  Save
                </CommonButton>
              )}
            </div>
          </div>

          {/* Right Section: Input Fields */}
          <div className="w-full md:w-2/3 mt-4 md:mt-0 md:pl-8">
            <div className="sm:h-20 h-16 mb-[3px]">
              <Input
                value={profileData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                label="First Name"
                name="firstName"
                className={isEditing ? "border-gray-300" : "bg-gray-100 border-gray-200"}
                readOnly={!isEditing}
              />
            </div>
            <div className="sm:h-20 h-16 mb-[3px]">
              <Input
                value={profileData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                label="Last Name"
                name="lastName"
                className={isEditing ? "border-gray-300" : "bg-gray-100 border-gray-200"}
                readOnly={!isEditing}
              />
            </div>
            <div className="sm:h-20 h-16 mb-[3px]">
              <Input
                value={profileData.email}
                onChange={handleChange}
                error={errors.email}
                label="Email"
                name="email"
                className={isEditing ? "border-gray-300" : "bg-gray-100 border-gray-200"}
                readOnly={!isEditing}
              />
            </div>
            <div className="sm:h-20 h-16 mb-[3px]">
              <Input
                value={profileData.phoneNumber}
                onChange={handleChange}
                error={false}
                label="Phone Number"
                name="phoneNumber"
                className={isEditing ? "border-gray-300" : "bg-gray-100 border-gray-200"}
                readOnly={!isEditing}
              />
            </div>



          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
