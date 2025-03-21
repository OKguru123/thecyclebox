import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import * as url from "../../../utils/urlHelper";
import { axiosGet, axiosPut } from "@/utils/api";

const initialState: any = {
  updatedUserData: [],
};

export const MainUserSlice = createSlice({
  name: "mainuser",
  initialState,
  reducers: {
    UpdateUsers: (state: any, action) => {
      state.updatedUserData = action.payload.data;
    },
  },
});

export const { UpdateUsers } = MainUserSlice.actions;

export const updateUsersApi =
  (payload: any, id: string) => async (dispatch: AppDispatch) => {
    try {
      const response: any = await axiosPut(`${url.GET_USER}/${id}`, payload);
      // Pass only serializable parts to the action
      // console.log(response);

      dispatch(
        UpdateUsers({
          data: response.data,
        })
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  };

export default MainUserSlice.reducer;
