import { axiosGet, axiosPost } from "@/utils/api";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import * as url from "../../../utils/urlHelper";

const creditState = {
    creditScore: 0,
};

export const CreditSlice = createSlice({
    name: 'credit',
    initialState: creditState,
    reducers: {
        getCreditScore: (state: any, action) => {
            state.creditScore = action.payload.creditScore;
        },
    },
});

export const { getCreditScore } = CreditSlice.actions
export default CreditSlice.reducer;
export const getCreditScoreApi = () => async (dispatch: AppDispatch) => {
    try {
        const response: any = await axiosGet(`${url.GET_CREDIT_COUNT}`);
        // Pass only serializable parts to the action

        dispatch(
            getCreditScore({
                creditScore: response.data.totalPoints,
            })
        );
        return response.data
    } catch (error: any) {
        console.log(error);
    }
}

export const postDeductCount =
    (payload: any) => async (dispatch: AppDispatch) => {
        try {
            const response: any = await axiosPost(`${url.POST_DEDUCT_COUNT}`, payload);
            // Pass only serializable parts to the action
            dispatch(
                getCreditScore({
                    creditScore: response.data.totalPoints,
                })
            );
            return response.data
        } catch (error: any) {
            console.log(error);
        }
    };
