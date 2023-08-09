import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // giá trị khởi tạo của state
  listNhanVien: [],
};

const AboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    SetListNhanVien(state, action) {
      // truyền vào 1 tham số
      // data truyền vào hợp lệ
      state.listNhanVien = action.payload;
    },
    AddNhanVien(state, action) {
      // truyền vào 1 tham số
      // data truyền vào hợp lệ
      let data = action.payload;
      state.listNhanVien.push(data);
    },
  }, // những cái sự kiện thêm, sửa, xóa, tìm kiếm, sắp xếp, ... của thằng initialState
});

export const { SetListNhanVien, AddNhanVien } = AboutSlice.actions;

export const GetAbout = (state) => state.about;
export const GetListNhanVien = (state) => state.about.listNhanVien;

export default AboutSlice.reducer;
