import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/redux/authSlice";
import companyReducer from "../modules/auth/redux/companySlice";
import employeeReducer from "../modules/employee/redux/employeeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    company: companyReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
