// function CRUD() {}

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetListUser, SetListUser } from "../app/reducer/CRUDSlice.reducer";
import { useAppSelector } from "../app/hook";
import { Button, Space, Table } from "antd";
import ModalDetail from "./crud/ModalDetail";
const api = "https://63ddb6c1f1af41051b085a9b.mockapi.io/user";
const CRUD = () => {
  const [abc, setAbc] = useState("");

  const dispatch = useDispatch();
  const loadData = () => {
    axios.get(api).then(
      (response) => {
        dispatch(SetListUser(response.data));
      },
      (error) => {}
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  const dataTable = useAppSelector(GetListUser);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên tài khoản",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "emailFE",
      dataIndex: "emailFE",
      key: "emailFE",
    },
    {
      title: "emailFPT",
      dataIndex: "emailFPT",
      key: "emailFPT",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record, index) => (
        <Space>
          <Button
            onClick={() => {
              openModalDetail(record);
            }}
            type="primary"
          >
            Detail
          </Button>
          <Button onClick={() => {}} type="primary">
            Update
          </Button>
          <Button onClick={() => {}} type="primary">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const [isOpenModalDetail, setIsOpenModalDetail] = useState(false);
  const [userDetail, setUserDetail] = useState(null);

  const openModalDetail = (record) => {
    setIsOpenModalDetail(true);
    setUserDetail(record);
  };

  const cancelModalDetail = () => {
    setIsOpenModalDetail(false);
    setUserDetail(null);
  };

  return (
    <>
      <h1>CRUD</h1>
      <Table
        dataSource={dataTable}
        rowKey="id"
        columns={columns}
        pagination={false}
      />
      <ModalDetail
        visible={isOpenModalDetail}
        handleCancel={cancelModalDetail}
        user={userDetail}
      />
    </>
  );
};

export default CRUD;
