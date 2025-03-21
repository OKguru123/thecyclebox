import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";
import * as url from "../../../utils/urlHelper";
import { axiosDelete, axiosGet, axiosPost, axiosPut } from "@/utils/api";

const initialState: any = {
  data: [],
  addmachines: {},
  updatedMachines: {},
  machineData: [],
  scanData: [],
};

export const MachineSlice = createSlice({
  name: "machine",
  initialState,
  reducers: {
    getMachines: (state: any, action) => {
      state.data = action.payload.data;
    },
    AddMachines: (state: any, action) => {
      state.addmachines = action.payload.data;
    },
    UpdatedMachines: (state: any, action) => {
      state.updatedMachines = action.payload.data;
    },
    getUserMachines: (state: any, action) => {
      state.machineData = action.payload.data;
    },
    getScanedQR: (state: any, action) => {
      state.scanData = action.payload.data;
    },
  },
});

export const {
  getMachines,
  AddMachines,
  getUserMachines,
  UpdatedMachines,
  getScanedQR,
} = MachineSlice.actions;

export const getMachinesApi = () => async (dispatch: AppDispatch) => {
  try {
    const response: any = await axiosGet(`${url.GET_MACHINE}`);
    // Pass only serializable parts to the action
    dispatch(
      getMachines({
        data: response.data.body,
      })
    );
  } catch (error: any) {
    console.log(error);
  }
};

export const postMachinesApi =
  (payload: any) => async (dispatch: AppDispatch) => {
    try {
      const response: any = await axiosPost(`${url.POST_MACHINE}`, payload);
      // Pass only serializable parts to the action
      dispatch(
        AddMachines({
          data: response.data,
        })
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  };

export const postScanApi = (payload: any) => async (dispatch: AppDispatch) => {
  try {
    const response: any = await axiosPost(`${url.POST_SCAN}`, payload);
    // Pass only serializable parts to the action
    dispatch(
      getScanedQR({
        data: response.data,
      })
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const putMachinesApi =
  (payload: any, id: string) => async (dispatch: AppDispatch) => {
    try {
      const response: any = await axiosPut(
        `${url.POST_MACHINE}/${id}`,
        payload
      );
      // Pass only serializable parts to the action

      dispatch(
        UpdatedMachines({
          data: response.data,
        })
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  };

export const deleteMachinesApi =
  (id: string | undefined) => async (dispatch: AppDispatch) => {
    try {
      const response: any = await axiosDelete(`${url.POST_MACHINE}/${id}`);
      // Pass only serializable parts to the action
      // console.log(response, "papa");

      // dispatch(
      //   UpdatedMachines({
      //     data: response.data,
      //   })
      // );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  };

export const getUserMachinesApi = () => async (dispatch: AppDispatch) => {
  try {
    const response: any = await axiosGet(`${url.GET_MACHINE_USER}`);
    // Pass only serializable parts to the action
    dispatch(
      getUserMachines({
        data: response.data.body,
      })
    );
  } catch (error: any) {
    console.log(error);
  }
};

export default MachineSlice.reducer;
