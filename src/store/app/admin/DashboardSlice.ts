import { axiosGet } from "@/utils/api";
import { createSlice } from "@reduxjs/toolkit";
import * as url from "../../../utils/urlHelper";
import { AppDispatch } from "../../store";

interface FormType {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    roleId: string | number;
    state: string;
}


const initialState: any = {
    data: [],
};

export const DashboardSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getItems: (state: any, action) => {
            state.data = action.payload.data
        },
    },
});

export const { getItems } = DashboardSlice.actions;

export const getItemsApi =
    () => async (dispatch: AppDispatch) => {
        try {
            const response: any = await axiosGet(`${url.GET_ITEMS}`);
            // Pass only serializable parts to the action
            dispatch(
                getItems({
                    data: response.data,
                })
            );
            return response.data
        } catch (error: any) {
            console.log(error);
        }
    };

export default DashboardSlice.reducer;