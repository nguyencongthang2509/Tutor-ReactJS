import { configureStore } from "@reduxjs/toolkit";
import AboutSliceReducer from "./reducer/AboutSlice.reducer";
import NhanVienSliceReducer from "./reducer/NhanVienSlice.reducer";
import CRUDSliceReducer from "./reducer/CRUDSlice.reducer";

export const store = configureStore({
  reducer: {
    about: AboutSliceReducer,
    nhanvien: NhanVienSliceReducer,
    crud: CRUDSliceReducer
  },
});

export const dispatch = store.dispatch;
export const getState = store.getState;
