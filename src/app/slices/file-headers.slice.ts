import { createSlice } from "@reduxjs/toolkit";

export type fileHeaderSliceType = {
  list: Array<string>;
  dateCellName: string;
  descCellName: string;
  valuesCellName: string;
  valuesCellIndex: number;
};

export const initialState: fileHeaderSliceType = {
  list: [],
  valuesCellIndex: 0,
  dateCellName: "FECHA",
  valuesCellName: "VALOR",
  descCellName: "DESCRIPCIÓN",
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
  setFileHeadersDescriptionCellName(
    state: typeof initialState,
    { payload }: { payload: string }
  ) {
    state.descCellName = payload;
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
  setFileHeadersDescriptionCellName,
} = slice.actions;

export default slice.reducer;
