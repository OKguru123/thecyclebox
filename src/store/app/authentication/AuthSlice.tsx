import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import * as url from "../../../utils/urlHelper";
import { axiosPost } from "@/utils/api";

interface StateType {
  passwordUpdateState: {
    status?: number;
    data?: any;
  };
  changePassword: {
    status?: number;
    data?: any;
  };
}

const initialState: StateType = {
  passwordUpdateState: {},
  changePassword: {},
};

export const AuthSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    passwordUpdate: (state: StateType, action) => {
      state.passwordUpdateState = {
        status: action.payload.status,
        data: action.payload.data,
      };
    },
    changePassword: (state: StateType, action) => {
      state.changePassword = {
        status: action.payload.status,
        data: action.payload.data,
      };
    },
  },
});

export const { passwordUpdate, changePassword } = AuthSlice.actions;

export const updateUserPassword =
  (payload: any) => async (dispatch: AppDispatch) => {
    try {
      const response: any = await axiosPost(`${url.UPDATE_USER_PASSWORD}`, payload);
      // Pass only serializable parts to the action
      dispatch(
        passwordUpdate({
          status: response.status,
          data: response.data,
        })
      );
    } catch (error: any) {
      console.log(error);
    }
  };

export const changeUserPassword =
  (payload: any) => async (dispatch: AppDispatch) => {
    try {

      const response: any = await axiosPost(`${url.CHANGE_USER_PASSWORD}`, payload);
      // Pass only serializable parts to the action

      dispatch(
        changePassword({
          status: response.status,
          data: response.data,
        })
      );
    } catch (error: any) {
      console.log(error);
    }
  };

export default AuthSlice.reducer;
