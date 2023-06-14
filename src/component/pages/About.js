import {
  Button,
  Checkbox,
  Form,
  Input,
  Pagination,
  Radio,
  Select,
  Space,
  Table,
} from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiURLNhanVien, apiURLCuaHang } from "../../config/api";

const About = () => {
  let [listNhanVien, setListNhanVien] = useState([]);
  let [listCuaHang, setListCuaHang] = useState([]);
  let [ma, setMa] = useState("");
  let [ten, setTen] = useState("");
  let [gioiTinh, setGioiTinh] = useState("Nam");
  let [sdt, setSdt] = useState("");
  let [diaChi, setDiaChi] = useState("Thái Bình");
  let [idCuaHang, setIdCuaHang] = useState("");
  let [currentPage, setCurrentPage] = useState(0);
  let [totalPages, setToTalPages] = useState(0);

  useEffect(() => {
    loadDataListNhanVien(currentPage);
  }, [currentPage]);

  useEffect(() => {
    loadSelectCuaHang();
  }, []);

  const loadDataListNhanVien = (currentPage) => {
    axios
      .get(apiURLNhanVien + "/show?pageNo=" + currentPage)
      .then((response) => {
        setListNhanVien(response.data.content);
        setCurrentPage(response.data.number);
        setToTalPages(response.data.totalPages);
      })
      .catch((error) => {});
  };

  const loadSelectCuaHang = () => {
    axios
      .get(apiURLCuaHang)
      .then((response) => {
        setListCuaHang(response.data);
        setIdCuaHang(listCuaHang[0].id);
      })
      .catch((error) => {});
  };

  const renderTenCuaHang = (tenCuaHang) => {
    return tenCuaHang !== null ? tenCuaHang : "Không có";
  };

  const renderSoDienThoai = (sdt) => {
    return sdt !== null ? sdt : "Không có";
  };

  const addNhanVien = () => {
    let obj = {
      ma: ma,
      ten: ten,

    }
    axios
      .get(apiURLCuaHang)
      .then((response) => {
        setListCuaHang(response.data);
        setIdCuaHang(listCuaHang[0].id);
      })
      .catch((error) => {});
  }

  const columns = [
    {
      title: "Mã",
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: "Tên",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: "Giới Tính",
      dataIndex: "gioiTinh",
      key: "gioiTinh",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
      render: renderSoDienThoai,
    },
    {
      title: "Địa chỉ",
      dataIndex: "diaChi",
      key: "diaChi",
    },
    {
      title: "Tên cửa hàng",
      dataIndex: "tenCuaHang",
      key: "tenCuaHang",
      render: renderTenCuaHang,
    },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button key="detail" type="primary" htmlType="submit">
            Detail
          </Button>
          <Button key="update" type="primary" htmlType="submit">
            Update
          </Button>
          <Button key="delete" type="primary" htmlType="submit">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="test">
      <Form>
        <Form.Item label="Mã" rules={[{ required: true }]}>
          <Input
          placeholder="Nhập mã"
            value={ma}
            onChange={(e) => {
              setMa(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Tên" rules={[{ required: true }]}>
          <Input
            value={ten}
            onChange={(e) => {
              setTen(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Giới tính" rules={[{ required: true }]}>
          <Radio.Group
            value={gioiTinh}
            onChange={(e) => {
              setGioiTinh(e.target.value);
            }}
          >
            <Radio value="Nam">Nam</Radio>
            <Radio value="Nữ">Nữ</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Số điện thoại" rules={[{ required: true }]}>
          <Input
            value={sdt}
            onChange={(e) => {
              setSdt(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item label="Địa chỉ" rules={[{ required: true }]}>
          <Select
            value={diaChi}
            onChange={(e) => {
              setDiaChi(e);
            }}
          >
            <Select.Option value="Thái Bình">Thái Bình</Select.Option>
            <Select.Option value="Hải Dương">Hải Dương</Select.Option>
            <Select.Option value="Nam Định">Nam Định</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Tên cửa hàng" rules={[{ required: true }]}>
          <Select
            value={idCuaHang}
            onChange={(e) => {
              setIdCuaHang(e);
            }}
          >
            {listCuaHang.map((cuahang, index) => (
              <Select.Option key={index} value={cuahang.id}>
                {cuahang.ten}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
      <Table
        dataSource={listNhanVien}
        rowKey="id"
        columns={columns}
        pagination={false}
      />
      <Pagination
        simple
        current={currentPage + 1}
        onChange={(value) => {
          setCurrentPage(value - 1);
        }}
        total={totalPages * 10}
      />
    </div>
  );
};

export default About;
