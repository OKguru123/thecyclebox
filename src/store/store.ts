import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "@/store/app/authentication/AuthSlice";
import AdminUserReducer from "@/store/app/admin/AdminUserSlice";
import GiftReducer from "@/store/app/admin/GiftSlice";
import DashbaordReducer from "@/store/app/admin/DashboardSlice";
import MainUserReducer from "@/store/app/user/MainUserSlice"
import MachineReducer from "@/store/app/machine/MachineSlice";
import CreditReducer from "@/store/app/credit/CreditSlice";
export const store = configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    AdminUserReducer: AdminUserReducer,
    DashbaordReducer: DashbaordReducer,
    GiftReducer: GiftReducer,
    MachineReducer: MachineReducer,
    CreditReducer: CreditReducer,
    MainUserReducer: MainUserReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
