import { createSlice } from "@reduxjs/toolkit";

export type expensesSliceType = {
  list: Array<unknown>;
};

export const initialState: expensesSliceType = {
  list: [],
};

const reducers = {
  setExpensesList(
    state: typeof initialState,
    { payload }: { payload: Array<unknown> }
  ) {
    state.list = payload;
  },
};

const slice = createSlice({
  name: "expenses",
  initialState,
  reducers,
});

export const { setExpensesList } = slice.actions;

export default slice.reducer;
