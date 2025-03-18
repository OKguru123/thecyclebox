import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import * as url from "../../../utils/urlHelper";
import { axiosGet } from "@/utils/api";

const initialState: any = {
    giftRecord: [],
};

export const GiftSlice = createSlice({
    name: "gift",
    initialState,
    reducers: {
        getGiftRecord: (state: any, action) => {
            state.giftRecord = action.payload.data
        },
    },
});

export const { getGiftRecord } = GiftSlice.actions;

export const getGitRecordApi =
    () => async (dispatch: AppDispatch) => {
        try {
            const response: any = await axiosGet(`${url.POST_DEDUCT_COUNT}`);
            // Pass only serializable parts to the action
            dispatch(
                getGiftRecord({
                    data: response.data.data,
                })
            );
            return response.data
        } catch (error: any) {
            console.log(error);
        }
    };

export default GiftSlice.reducer;
