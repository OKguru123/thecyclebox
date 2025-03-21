import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import * as url from "../../../utils/urlHelper";
import { axiosDelete, axiosGet, axiosPost, axiosPut } from "@/utils/api";

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
  adduser: {},
  updateUserAdminData: {},
};

export const AdminUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsers: (state: any, action) => {
      state.data = action.payload.data;
    },
    AddUser: (state: any, action) => {
      state.adduser = action.payload.data;
    },
    UpdateUsersAdmin: (state: any, action) => {
      state.updateUserAdminData = action.payload.data;
    },
  },
});

export const { getUsers, AddUser, UpdateUsersAdmin } = AdminUserSlice.actions;

export const getUsersApi = () => async (dispatch: AppDispatch) => {
  try {
    const response: any = await axiosGet(`${url.GET_USER}`);
    // Pass only serializable parts to the action
    // console.log("users data", response.data);
    dispatch(
      getUsers({
        data: response.data,
      })
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const postUsersApi =
  (payload: FormType) => async (dispatch: AppDispatch) => {
    try {
      const response: any = await axiosPost(`${url.CREATE_USER}`, payload);
      // Pass only serializable parts to the action
      dispatch(
        AddUser({
          data: response.data,
        })
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  };

export const updateUsersAdminApi =
  (payload: any, id: string) => async (dispatch: AppDispatch) => {
    try {
      const response: any = await axiosPut(`${url.GET_USER}/${id}`, payload);
      // Pass only serializable parts to the action
      // console.log(response);

      dispatch(
        UpdateUsersAdmin({
          data: response.data,
        })
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  };

export const deleteUserApi =
  (id: string | undefined) => async (dispatch: AppDispatch) => {
    try {
      const response: any = await axiosDelete(`${url.GET_USER}/${id}`);
      // Pass only serializable parts to the action

      // dispatch(
      //   AddUser({
      //     data: response.data,
      //   })
      // );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  };

export default AdminUserSlice.reducer;
