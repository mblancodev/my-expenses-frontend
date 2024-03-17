import { createSlice } from "@reduxjs/toolkit";

export type fileHeaderSliceType = {
  list: Array<string>;
  dateCellName: string;
  valuesCellName: string;
  valuesCellIndex: number;
};

export const initialState: fileHeaderSliceType = {
  list: [],
  dateCellName: "",
  valuesCellName: "",
  valuesCellIndex: 0,
};

const reducers = {
  setFileHeadersList(
    state: typeof initialState,
    { payload }: { payload: Array<string> }
  ) {
    state.list = payload;
  },
  setFileHeadersValuesCellName(
    state: typeof initialState,
    { payload }: { payload: string }
  ) {
    state.valuesCellName = payload;
  },
  setFileHeadersDateCellName(
    state: typeof initialState,
    { payload }: { payload: string }
  ) {
    state.dateCellName = payload;
  },
  setFileHeadersValuesCellIndex(
    state: typeof initialState,
    { payload }: { payload: number }
  ) {
    state.valuesCellIndex = payload;
  },
};

const slice = createSlice({
  name: "fileHeaders",
  initialState,
  reducers,
});

export const {
  setFileHeadersList,
  setFileHeadersDateCellName,
  setFileHeadersValuesCellName,
  setFileHeadersValuesCellIndex,
} = slice.actions;

export default slice.reducer;
