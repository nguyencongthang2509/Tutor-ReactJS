import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // giá trị khởi tạo của state
  listNhanVien: [],
  listCuaHang: [],
};

const NhanVienSlice = createSlice({
  name: "nhanvien",
  initialState,
  reducers: {
    SetListNhanVien(state, action) {
      // truyền vào 1 tham số
      // data truyền vào hợp lệ
      let data = action.payload;
      state.listNhanVien = action.payload;
      return state;
    },
    AddNhanVien(state, action) {
      // truyền vào 1 tham số
      // data truyền vào hợp lệ
      let data = action.payload;
      let obj = {
        id: data.id,
        ten: data.ten,
        diaChi: data.diaChi,
        gioiTinh: data.gioiTinh,
        ma: data.ma,
        sdt: data.sdt,
        idCuaHang: data.cuaHang.id,
        tenCuaHang: data.cuaHang.ten,
      };
      state.listNhanVien.unshift(obj);
      state.listNhanVien.pop();
      return state;
    },
    SetListCuaHang(state, action) {
      // truyền vào 1 tham số
      // data truyền vào hợp lệ
      let data = action.payload;
      state.listCuaHang = action.payload;
    },
  }, // những cái sự kiện thêm, sửa, xóa, tìm kiếm, sắp xếp, ... của thằng initialState
});

export const { SetListNhanVien, SetListCuaHang, AddNhanVien } =
  NhanVienSlice.actions;

export const GetAbout = (state) => state.nhanvien;
export const GetNhanVien = (state) => state.nhanvien.listNhanVien;
export const GetCuaHang = (state) => state.nhanvien.listCuaHang;

export default NhanVienSlice.reducer;
