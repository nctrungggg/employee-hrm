import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/redux/authSlice";
import employeeReducer from "../modules/employee/redux/employeeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
