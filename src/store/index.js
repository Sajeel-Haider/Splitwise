import { configureStore } from "@reduxjs/toolkit";
import authUserSlice from "./slices/authUser-slice";
import expenseSlice from "./slices/expenseSlice";

const store = configureStore({
  reducer: {
    user: authUserSlice,
    expenses: expenseSlice,
  },
});

export default store;
