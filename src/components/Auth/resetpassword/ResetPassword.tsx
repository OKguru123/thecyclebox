import PasswordInput from "@/components/Common/PasswordInput";
import CommonButton from "@/components/Common/CommonButton";
import { changeUserPassword } from "@/store/app/authentication/AuthSlice";
import { useDispatch, useSelector } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logoImg from "../../../assets/images/logo.png";
import { CircularProgress } from "@mui/material";

const UserForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const getResponse = useSelector(state => state.AuthReducer.changePassword);

    const [disabled, setDisabled] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [formError, setFormError] = useState({

        password: "",
        confirmPassword: "",
    });

    const validatePassword = (password: any) => {
        if (!password) {
            return 'Password is required';
        } else if (password.length < 6) {
            return 'Password must be at least 6 characters long';
        } else if (!/[A-Z]/.test(password)) {
            return 'Password must contain at least one uppercase letter';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return 'Password must contain at least one special character';
        } else if (!/[0-9]/.test(password)) {
            return 'Password must contain at least one number';
        }
        return ''; // No errors
    };

    // Submit function with integrated password validation
    const submit = async () => {
        // Validate the password
        const passwordError = validatePassword(formData.password);

        if (passwordError) {
            setFormError({
                ...formError,
                password: passwordError,
            });
        } else if (formData.confirmPassword === "") {
            setFormError({
                ...formError,
                confirmPassword: "Please enter confirm password",
            });
        } else if (formData.password !== formData.confirmPassword) {
            setFormError({
                ...formError,
                confirmPassword: "Password and confirm password do not match",
            });
        } else {
            try {
                setDisabled(true);
                const dataValue = JSON.parse(String(localStorage.getItem("data")));
                const payload = { email: dataValue.email, otp: dataValue.otp, password: formData.password }
                // console.log("value", { email: dataValue.email, otp: dataValue.otp, password: formData.password });
                await dispatch(changeUserPassword(payload));
                console.log(getResponse);
                if (getResponse.status === 201) {
                    toast.success("Password changed Successfully")
                    setDisabled(false);
                    router.push("/login");
                } else {
                    setDisabled(false);
                    // toast.error(getResponse.error);
                }
            } catch (err) {
                console.log("Error", err);
                setDisabled(false);
            }
        }
    };


    return (
        <div className="mx-6 sm:mx-0 bg-white px-7 pb-8 md:pb-10 md:px-10 lg:pb-8 2xl:pt-4 xl:pb-12 xl:px-16 rounded-lg shadow-lg w-[360px]  md:w-[75%] lg:w-[460px] 2xl:w-[500px]">
            <div className="flex justify-center xl:mb-2">
                <Image
                    src={logoImg}
                    alt="The Box Cycle Logo"
                    className="!w-[50%] md:max-w-[100%]"
                />
            </div>

            <h1 className="text-[24px] md:text-[28px] xl:text-[32px] font-medium text-center">
                Reset Password
            </h1>
            <p className="text-center mb-6 xl:mb-10 text-[11px] md:text-[13px] xl:text-[14px] font-medium lg:mb-10">
                Enter your new password and confirm
            </p>
            <div className="sm:h-20 h-16">
                <PasswordInput
                    name="password"
                    value={formData.password}
                    onChange={(e) => {
                        setFormError({ ...formError, password: "", confirmPassword: "" });
                        setFormData({
                            ...formData,
                            password: (e.target as HTMLInputElement).value,
                        });
                    }}
                    error={formError.password}
                    label="Password"
                    className={
                        formError.password
                            ? "border-[red] border-[1px] sm:h-auto h-[40px]"
                            : "sm:h-auto h-[40px]"
                    }
                />
            </div>
            <div className=" sm:h-20 h-16">
                <PasswordInput
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => {
                        setFormError({ ...formError, password: "", confirmPassword: "" });
                        setFormData({
                            ...formData,
                            confirmPassword: (e.target as HTMLInputElement).value,
                        });
                    }}
                    error={formError.confirmPassword}
                    label="Confirm Password"
                    className={
                        formError.confirmPassword
                            ? "border-[red] border-[1px] sm:h-auto h-[40px]"
                            : "sm:h-auto h-[40px]"
                    }
                />
            </div>
            <CommonButton
                type="submit"
                className="w-full p-2 bg-green-800 text-white rounded-[10px] hover:bg-green-700 mb-2 lg:mb-2 xl:mb-4"
                onClick={submit}
                disabled={disabled}
            >
                {disabled ? <CircularProgress size={23} className="!text-white" /> : "Save"}
            </CommonButton>
            <p className="text-center text-[11px] sm:text-[15px] xl:text-[17px]">
                Already have an account?{" "}
                <Link href={"/"} className="text-[#000000] font-semibold">
                    Login
                </Link>
            </p>
            <ToastContainer />
        </div>
    );
};

export default UserForm;
