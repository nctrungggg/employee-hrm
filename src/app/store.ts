import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/redux/authSlice";
import employeeReducer from "../modules/employee/redux/employeeSlice";
const rootReducer = {
  auth: authReducer,
  employee: employeeReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type AppDispatch = typeof store.dispatch;
