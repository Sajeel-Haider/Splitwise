import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenseData: [],
  loanDataLend: [],
  loanDataRec: [],
  userLentNames: [],
  userDebtNames: [],
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialState,
  reducers: {
    setFetchedData(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setFetchedData } = expenseSlice.actions;

export default expenseSlice.reducer;
