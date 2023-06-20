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
import Home from "./Home";

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

  // useRef
  // useCallBack
  // useReducer
  // useMomo

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
        console.log(response.data.content);
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
      gioiTinh: gioiTinh,
      sdt: sdt,
      diaChi: diaChi,
      idCH: idCuaHang,
    };

    axios
      .post(apiURLNhanVien + "/add", obj)
      .then((response) => {
        // Cách 1: gọi lại API load list từ database
        // loadDataListNhanVien(0);
        // Cách 2: Nhận kết quả trả về từ backend, thêm / sửa / xóa ngay trên list

        // list chứa đối tượng có 3 thuộc tính A B C thì đối tượng mình định thêm mới cũng phải có bấy nhiêu thuộc tính
        // điều kiện:
        // thêm: phải có đầy đủ đối tượng mới
        // update: phải có đầy đủ đối tượng mới
        // detail: id | cả đối tượng
        // delete: id

        let res = response.data;
        let newNhanVienResponse = {
          diaChi: res.diaChi,
          gioiTinh: res.gioiTinh,
          id: res.id,
          idCuaHang: res.cuaHang.id,
          ma: res.ma,
          sdt: res.sdt,
          ten: res.ten,
          tenCuaHang: res.cuaHang.ten,
        };

        setListNhanVien([newNhanVienResponse, ...listNhanVien]);
      })
      .catch((error) => {
        alert("Thêm thất bại");
      });
  };

  const detail = (id) => {
    axios
      .get(apiURLNhanVien + "/detail/" + id)
      .then((response) => {
        let obj = response.data;
        setMa(obj.ma);
        setTen(obj.ten);
        setGioiTinh(obj.gioiTinh);
        setDiaChi(obj.diaChi);
        setSdt(obj.sdt);
        setMa(obj.ma);
        setIdCuaHang(obj.cuaHang == null ? "" : obj.cuaHang.id);
      })
      .catch((error) => {});
  };

  const funcDelete = (id) => {
    axios
      .delete(apiURLNhanVien + "/delete/" + id)
      .then((response) => {
        let id = response.data;
        listNhanVien.forEach((item) => {
          if (item.id === id) {
            let updatedListNhanVien = listNhanVien.filter(
              (record) => record.id !== id
            );
            setListNhanVien(updatedListNhanVien);
            alert("Xóa thành công");
          }
        });
      })
      .catch((error) => {});
  };

  const update = (id) => {
    let obj = {
      ma: ma,
      ten: ten,
      gioiTinh: gioiTinh,
      sdt: sdt,
      diaChi: diaChi,
      idCH: idCuaHang,
    };

    axios
      .put(apiURLNhanVien + "/update/" + id, obj)
      .then((response) => {
        let res = response.data;
        let newNhanVienResponse = {
          diaChi: res.diaChi,
          gioiTinh: res.gioiTinh,
          id: res.id,
          idCuaHang: res.cuaHang.id,
          ma: res.ma,
          sdt: res.sdt,
          ten: res.ten,
          tenCuaHang: res.cuaHang.ten,
        };

        listNhanVien.forEach((item) => {
          if (item.id === res.id) {
            let updatedListNhanVien = listNhanVien.map((record) => {
              if (record.id === id) {
                return { ...record, ...newNhanVienResponse };
              }
              return record;
            });

            setListNhanVien(updatedListNhanVien);
          }
        });

        alert("Cập nhật thành công");
      })
      .catch((error) => {
        alert("Cập nhật thất bại");
      });
  };

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
          <Button
            key="detail"
            onClick={() => {
              detail(record.id);
            }}
            type="primary"
            htmlType="submit"
          >
            Detail
          </Button>
          <Button
            key="update"
            onClick={() => {
              update(record.id);
            }}
            type="primary"
            htmlType="submit"
          >
            Update
          </Button>
          <Button
            key="delete"
            onClick={() => {
              funcDelete(record.id);
            }}
            type="primary"
            htmlType="submit"
          >
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
          <Button onClick={addNhanVien} type="primary" htmlType="submit">
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
