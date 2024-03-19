import { createSlice } from "@reduxjs/toolkit";

export type CustomCardItem = {
  name: string;
  note: string;
  total: number;
};

export type customCardsSliceType = {
  list: Array<CustomCardItem>;
};

export const initialState: customCardsSliceType = {
  list: [],
};

const reducers = {
  setCustomCardsList(
    state: customCardsSliceType,
    { payload }: { payload: Array<CustomCardItem> }
  ) {
    state.list = payload;
  },
};

const slice = createSlice({
  name: "customCards",
  initialState,
  reducers,
});

export const { setCustomCardsList } = slice.actions;

export default slice.reducer;
