import { Button, Input, Select, Table } from "antd";
import { useState } from "react";

const { Option } = Select;

const Test = () => {
  // useState: Quản lý biến trong component
  // useEffect: Hàm tạo

  let [bien1, setBien1] = useState(0);

  const clickBien1 = () => {
    setBien1(bien1 + 1);
  };

  const list = [
    { id: 1, name: "aaaaaaaaaaaaa", address: { id: 1, name: "Hà Nội" } },
    { id: 2, name: "aaaaaaaaaaaaa", address: { id: 2, name: "Thái Bình" } },
    { id: 3, name: "aaaaaaaaaaaaa", address: { id: 3, name: "Hà Nam" } },
    { id: 4, name: "aaaaaaaaaaaaa", address: { id: 2, name: "Thái Bình" } },
    { id: 5, name: "aaaaaaaaaaaaa", address: { id: 1, name: "Hà Nội" } },
  ];

  const [listObj, setListObj] = useState(list);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (text, record) => <span>{record.address.name}</span>,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button onClick={() => handleDetail(record.id)}>Detail</Button>
          <Button>Update</Button>
          <Button>Delete</Button>
        </div>
      ),
    },
  ];

  const handleDetail = (id) => {};

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState(1);

  const listAddress = [
    { id: 1, name: "Hà Nội" },
    { id: 2, name: "Thái Bình" },
    { id: 3, name: "Hà Nam" },
  ];

  const findAddressById = (id) => {
    return listAddress.find((item) => item.id === id);
  };

  const handleChangeId = (event) => {
    setId(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeAddress = (event) => {
    setAddress(event);
  };

  const handleAddObject = () => {
    let obj = {
      id: parseInt(id),
      name: name,
      address: findAddressById(address),
    };

    // Call api backend

    // đẩy phần tử vào cuối mảng
    // setListObj(...listObj, obj);

    // đẩy phần tử lên đầu mảng
    setListObj([obj, ...listObj]);
  };

  return (
    <div>
      Test
      <br />
      {bien1}
      <Button onClick={clickBien1} type="primary">
        Primary Button
      </Button>
      <br />
      <label>Id:</label>
      <Input
        type="number"
        value={id}
        onChange={handleChangeId}
        placeholder="Mời nhập id"
      />
      <label>Name:</label>
      <Input
        type="text"
        value={name}
        onChange={handleChangeName}
        placeholder="Mời nhập tên"
      />
      <Select value={address} onChange={handleChangeAddress}>
        {listAddress.map((item) => (
          <Option key={item.id} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
      <Button onClick={handleAddObject}>Thêm</Button>
      <Table
        dataSource={listObj}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: 2,
        }}
      />
      ;
    </div>
  );
};

export default Test;
