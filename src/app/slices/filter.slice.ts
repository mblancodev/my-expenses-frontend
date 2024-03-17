import { createSlice } from "@reduxjs/toolkit";

export type filterSliceType = {
  searchTerm: string;
  columnName: string;
};

export const initialState: filterSliceType = {
  searchTerm: "",
  columnName: "",
};

const reducers = {
  setSearchTerm(state: typeof initialState, { payload }: { payload: string }) {
    state.searchTerm = payload;
  },
  setColumnName(state: typeof initialState, { payload }: { payload: string }) {
    state.columnName = payload;
  },
};

const slice = createSlice({
  name: "filter",
  initialState,
  reducers,
});

export const { setSearchTerm, setColumnName } = slice.actions;

export default slice.reducer;
