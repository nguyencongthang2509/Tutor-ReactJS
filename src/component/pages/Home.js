import React, { useState } from "react";
import { Form, Input, Button, Table, Radio, Checkbox, Select } from "antd";
import "./home.css";

const Home = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  const onFinish = (values) => {
    const newData = {
      key: Date.now(),
      ...values,
    };
    setData([...data, newData]);
    form.resetFields();
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
      render: (hobbies) => (
        <ul>
          {hobbies.map((hobby) => (
            <li key={hobby}>{hobby}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="test">
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="age" label="Age" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="hobbies" label="Hobbies">
          <Checkbox.Group>
            <Checkbox value="Reading">Reading</Checkbox>
            <Checkbox value="Sports">Sports</Checkbox>
            <Checkbox value="Cooking">Cooking</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="country" label="Country" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="USA">USA</Select.Option>
            <Select.Option value="Canada">Canada</Select.Option>
            <Select.Option value="UK">UK</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default Home;
