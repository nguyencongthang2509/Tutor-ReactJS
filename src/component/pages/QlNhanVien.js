import { Button, Pagination, Table } from "antd";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  GetNhanVien,
  SetListNhanVien,
} from "../app/reducer/NhanVienSlice.reducer";
import ModalCreateNhanVien from "./ModalCreateNhanVien";
import LoadingIndicator from "./loading";

const QlNhanVien = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setToTalPages] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    axios
      .get("http://localhost:8080/nhan-vien/show?pageNo=" + currentPage)
      .then((response) => {
        setCurrentPage(response.data.number);
        setToTalPages(response.data.totalPages);
        dispatch(SetListNhanVien(response.data.content));

        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      key: "diaChi",
    },
    {
      title: "Giới tính",
      dataIndex: "gioiTinh",
      key: "gioiTinh",
    },
    {
      title: "Mã",
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
    },
    {
      title: "Tên cửa hàng",
      dataIndex: "tenCuaHang",
      key: "tenCuaHang",
    },
  ];

  const listNhanVienRedux = useAppSelector(GetNhanVien);

  //   useEffect(() => {
  //     setListNhanVien(listNhanVienRedux);
  //   }, [listNhanVienRedux]);

  const [isModalCreate, setIsModalCreate] = useState(false);

  const handleClickModalCreateNhanVien = () => {
    setIsModalCreate(true);
  };

  const handleCancel = () => {
    setIsModalCreate(false);
  };

  return (
    <div>
      {isLoading && <LoadingIndicator />}
      <h2>Quản lý nhân viên</h2>
      <Button onClick={handleClickModalCreateNhanVien}>Tạo nhân viên</Button>
      <Table
        dataSource={listNhanVienRedux}
        pagination={false}
        rowKey="id"
        columns={columns}
      />
      <Pagination
        simple
        current={currentPage + 1}
        onChange={(value) => {
          setCurrentPage(value - 1);
        }}
        total={totalPages * 10}
      />
      <ModalCreateNhanVien
        visible={isModalCreate}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default QlNhanVien;
