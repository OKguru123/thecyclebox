"use client";

import PasswordInput from "@/components/Common/PasswordInput";
import Layout from "@/components/PageLayout/Layout";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import CommonButton from "@/components/Common/CommonButton";
import { updateUserPassword } from "@/store/app/authentication/AuthSlice";
import { useDispatch, useSelector } from "@/store/hooks";
import { validatePassword } from "@/helper/FormHelper";
import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import backArrow from "../../../assets/images/back-arrow.svg";
import Image from "next/image";
import { toast } from "react-toastify";

const Page = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const userInfoString = window.localStorage.getItem("userInfo");
    const userInfo = userInfoString && JSON.parse(userInfoString);

    const [apiResponse, setApiResponse] = useState<{
        oldPasswordError?: string;
        successResponse?: string;
    }>({});
    const [loading, setLoading] = useState(false);

    const getPasswordAPIResponse: any = useSelector(
        (state: RootState) => state.AuthReducer.passwordUpdateState
    );

    useEffect(() => {
        if (getPasswordAPIResponse?.data?.status === 404) {
            setApiResponse({
                oldPasswordError: "Old password doesn't match",
            });
        } else {
            if (getPasswordAPIResponse?.data?.status === 200) {
                setApiResponse({
                    oldPasswordError: "",
                    successResponse: "Password change suceesfully",
                });
                formik.resetForm();
                toast.success("Password change suceesfully")
            }
        }
    }, [getPasswordAPIResponse]);

    const validationSchema = Yup.object({
        currentPassword: Yup.string().required("*Field is required"),
        newPassword: Yup.string()
            .required("*Field is required")
            .test(
                "is-valid-password",
                "Password must contain at least one uppercase letter, one special character, and be at least 8 characters long",
                (value) => validatePassword(value || "")
            ),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword")], "Passwords must match")
            .required("*Field is required"),
    });

    const initialValues = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    };

    const handleBack = () => {
        router.back();
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            const payload = {
                email: userInfo.email,
                password: values.newPassword,
                OldPassword: values.currentPassword,
            };

            await dispatch(updateUserPassword(payload));
            setLoading(false);
        },
    });

    return (
        <>
            <div>
                <button onClick={() => router.back()} className="flex items-center gap-2 self-start text-gray-700 hover:text-green-600 mb-6">
                    <Image src={backArrow} alt="Back" className="w-6 h-6" />
                    <h4 className="text-xl sm:text-2xl font-medium">Back</h4>
                </button>

            </div>
            <div className="w-full max-w-lg mx-auto mt-6 sm:mt-10 px-4 sm:px-0">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-12 text-start sm:text-center">
                    Change Password
                </h1>
                <div
                    className="bg-white p-8 sm:p-16 rounded-sm shadow-md"
                    style={{ boxShadow: "-4px 4px 25px 0px #00000040" }}
                >
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-6">
                            <PasswordInput
                                value={formik.values.currentPassword}
                                onChange={(e) => {
                                    setApiResponse({
                                        oldPasswordError: "",
                                    });
                                    formik.handleChange(e);
                                }}
                                error={
                                    formik.touched.currentPassword &&
                                    (formik.errors.currentPassword ||
                                        apiResponse.oldPasswordError)
                                }
                                label="Current Password"
                                name="currentPassword"
                            />
                        </div>
                        <div className="mb-6">
                            <PasswordInput
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                error={formik.touched.newPassword && formik.errors.newPassword}
                                label="New Password"
                                name="newPassword"
                            />
                        </div>
                        <div className="mb-6">
                            <PasswordInput
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.confirmPassword &&
                                    formik.errors.confirmPassword
                                }
                                label="Confirm Password"
                                name="confirmPassword"
                            />
                        </div>
                        <CommonButton
                            type="submit"
                            className="bg-green-800 text-white rounded-lg hover:bg-green-700 mb-4"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save"}
                        </CommonButton>
                        <CommonButton
                            type="button"
                            onClick={formik.handleReset}
                            className="border text-green-800 hover:bg-gray-100 border-[#006838] rounded-lg"
                        >
                            Cancel
                        </CommonButton>
                        {apiResponse.successResponse && (
                            <h4 className="mt-3 text-green-800">
                                {apiResponse.successResponse}...
                            </h4>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default Page;
