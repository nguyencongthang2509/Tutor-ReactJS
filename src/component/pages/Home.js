import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Table,
  Radio,
  Checkbox,
  Select,
  Space,
} from "antd";
import "./home.css";

const Home = () => {
  //useState : biến
  // useEffect: hàm tạo

  let [count, setCount] = useState(0);
  let [name, setName] = useState("");
  let [age, setAge] = useState(0);
  let [address, setAddress] = useState("");
  let [hobbies, setHobbies] = useState([]);
  let [gender, setGender] = useState("Male");
  let [country, setCountry] = useState("USA");
  let [check, setCheck] = useState(false);
  let [listInfo, setListInfor] = useState([]);
  let [pagingtion, setPagingtion] = useState(1);

  let [bien1, setBien1] = useState(0);
  let [bien2, setBien2] = useState(0);

  const create = () => {
    // gọi API thêm ở backend
    // sau đó
    // return result - giá trị trả về từ phía backend: response // false : thêm thất bại, true: thành công
    setResult(true);
  };

  const handleClickBien2 = () => {
    setBien2(bien2 + 1);
  };

  let [result, setResult] = useState(false);

  const handleClickBien1 = () => {
    setBien1(bien1 + 1);
  };

  // useEffect(() => {
  //   console.log("Tăng biến 1 thành công");
  //   console.log("Tăng biến 2 thành công");
  //   console.log("Chạy 1 lần");
  // }, []); // chỉ gọi 1 lần

  // useEffect(() => {
  //   console.log("Tăng biến 1 thành công");
  //   console.log("Tăng biến 2 thành công");
  // }, [bien1, bien2]); // 1 trong 2 thay đổi mới gọi

  // useEffect(() => {
  //   console.log("Tăng biến 1 thành công");
  // }, [bien1]); // biến 1 thay đổi mới gọi

  // useEffect(() => {
  //   console.log("Tăng biến 2 thành công");
  // }, [bien2]); // biến 2 thay đổi mới gọi

  const loadDataToTable = () => {
    let array = [
      {
        id: 1,
        name: "Thắng",
        age: 18,
        address: "AAAA",
        hobbies: ["Reading"],
        gender: "Male",
        country: "aaaaaaaaaaa",
      },
      {
        id: 2,
        name: "Thắng 123",
        age: 20,
        address: "AAAA 1q23",
        hobbies: ["Cooking"],
        gender: "Female",
        country: "aaaaaaaaaaa",
      },
      {
        id: 3,
        name: "Thắng 34534",
        age: 18,
        address: "AAAA 345",
        hobbies: ["Sports"],
        gender: "Female",
        country: "aaaaaaaaaaa 345",
      },
      {
        id: 4,
        name: "Thắng 34534",
        age: 16,
        address: "AAAA",
        hobbies: ["Sports", "Reading"],
        gender: "Male",
        country: "aaaaaaaaaaa 3534",
      },
    ];
    if (JSON.stringify(array) !== JSON.stringify(listInfo)) {
      setListInfor(array);
    }
  };

  // useEffect có truyền vào biến, thì biến có thay đổi, sẽ gọi lại code trong useEffect
  // useEffect ko truyền vào biến, thì mặc định là nó sẽ theo dõi tất cả các state

  // useEffect liên quan đến tối ưu việc render lại componenrt , useEffect ko truyền vào biến mặc định load lại
  // khi có bất kì state nào được cập nhật // về mặt tối ưu: không

  //  useEffect có truyền vào biến, chỉ load lại code, logic trong useEffect khi mà cái biến truyền vào thhay đổi
  // ví dụ: khi thay đổi state A chỉ muốn load lại dữ liệu của A, thì dùng useEffect có truyền vào biến

  useEffect(() => {
    loadDataToTable();
  }, [listInfo]);

  // useEffect(() => {
  //   console.log("count vừa thay đổi");
  // }, [count]);

  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  const clickCount = () => {
    setCount(count + 1);
  };

  const onFinish = (values) => {
    const newData = {
      key: Date.now(),
      ...values,
    };
    setData([...data, newData]);
    form.resetFields();
  };

  const add = () => {
    let newData = {
      id: listInfo.length + 1,
      name: name,
      age: age,
      address: address,
      hobbies: hobbies,
      gender: gender,
      country: country,
    };

    setListInfor([newData, ...listInfo]);
  };

  const handleDetail = (id) => {
    let obj = findRecordById(id);
    setName(obj.name);
    setAge(obj.age);
    setAddress(obj.address);
    setHobbies(obj.hobbies);
    setGender(obj.gender);
    setCountry(obj.country);
    setCheck(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Hobbies",
      dataIndex: "hobbies",
      key: "hobbies",
      render: (hobbies) => hobbies.join(", "),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            key="detail"
            type="primary"
            onClick={() => handleDetail(record.id)}
            htmlType="submit"
          >
            Detail
          </Button>
          <Button
            key="update"
            type="primary"
            onClick={() => handleUpdate(record.id)}
            htmlType="submit"
          >
            Update
          </Button>
          <Button
            key="delete"
            onClick={() => handleDelete(record.id)}
            type="primary"
            htmlType="submit"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (id) => {
    // C1: thao tác trực tiếp trên mảng: list cũ: 1, 2, 3 // list.splice(3)
    // C2: Tạo ra list mớilist mới : 1, 2

    let updatedListInfo = listInfo.filter((record) => record.id !== id);

    setListInfor(updatedListInfo);
  };

  const handleUpdate = (id) => {
    if (check === false) {
      alert("Hãy chọn bản ghi cần update");
      return;
    }

    let newData = {
      name: name,
      age: age,
      address: address,
      hobbies: hobbies,
      gender: gender,
      country: country,
    };

    let updatedListInfo = listInfo.map((record) => {
      if (record.id === id) {
        return { ...record, ...newData };
      }
      return record;
    });

    setListInfor(updatedListInfo);
  };

  const findRecordById = (id) => {
    return listInfo.find((item) => item.id === id);
  };

  return (
    <div className="test">
      <span>{bien1}</span>
      <button onClick={handleClickBien1}>Biến 1</button>
      <span>{bien2}</span>
      <button onClick={handleClickBien2}>Biến 2</button>
      <Form form={form} onFinish={onFinish}>
        <Form.Item label="Name" rules={[{ required: true }]}>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Age" rules={[{ required: true }]}>
          <Input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Address" rules={[{ required: true }]}>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Item>
        <Form.Item label="Hobbies">
          <Checkbox.Group
            value={hobbies}
            onChange={(values) => setHobbies(values)}
          >
            <Checkbox value="Reading">Reading</Checkbox>
            <Checkbox value="Sports">Sports</Checkbox>
            <Checkbox value="Cooking">Cooking</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item label="Gender" rules={[{ required: true }]}>
          <Radio.Group
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Country" rules={[{ required: true }]}>
          <Select value={country} onChange={(value) => setCountry(value)}>
            <Select.Option value="USA">USA</Select.Option>
            <Select.Option value="Canada">Canada</Select.Option>
            <Select.Option value="UK">UK</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={add}>
            Add
          </Button>
        </Form.Item>
      </Form>
      <Table
        dataSource={listInfo}
        rowKey="id"
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default Home;
