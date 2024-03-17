import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import expenses, { expensesSliceType } from "./slices/expenses.slice";
import fileHeaders, { fileHeaderSliceType } from "./slices/file-headers.slice";
import filter, { filterSliceType } from "./slices/filter.slice";

type AppState = {
  filter: filterSliceType;
  expenses: expensesSliceType;
  fileHeaders: fileHeaderSliceType;
};

export type RootState = AppState;

const rootReducer = combineReducers({
  filter,
  expenses,
  fileHeaders,
});

export const store = configureStore({
  reducer: rootReducer,
});
