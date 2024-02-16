import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listUser: [],
};

const CRUDSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {
    SetListUser(state, action) {
      state.listUser = action.payload;
      return state;
    },
    CreateUser(state, action) {
      state.listUser.unshift(action.payload);
      return state;
    },
    UpdateUser(state, action) {
      const updatedUser = action.payload;
      const index = state.listUser.findIndex(
        (user) => user.id === updatedUser.id
      );
      if (index !== -1) {
        state.listUser[index] = updatedUser;
      }
      return state;
    },
    DeleteUser(state, action) {
      const userId = action.payload;
      state.listUser = state.listUser.filter((user) => user.id !== userId);
      return state;
    },
  }, // những cái sự kiện thêm, sửa, xóa, tìm kiếm, sắp xếp, ... của thằng initialState
});

export const { SetListUser, CreateUser, UpdateUser, DeleteUser } =
  CRUDSlice.actions;

export const GetListUser = (state) => state.crud.listUser;

export default CRUDSlice.reducer;
