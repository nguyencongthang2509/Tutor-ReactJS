import { Modal, Button, Form, Input, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hook";
import { AddNhanVien } from "../app/reducer/NhanVienSlice.reducer";

const { Option } = Select;
// props
const ModalCreateNhanVien = ({ visible, handleCancel }) => {
  const [listCuaHang, setListCuaHang] = useState([]);
  const [ma, setMa] = useState("");
  const [ten, setTen] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [gioiTinh, setGioiTinh] = useState("");
  const [sdt, setSdt] = useState("");
  const [idCuaHang, setIdCuaHang] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchCuaHang();

    return () => {
      setMa("");
      setTen("");
      setDiaChi("");
      setGioiTinh("");
      setSdt("");
      setIdCuaHang("");
    };
  }, [visible]);

  const fetchCuaHang = () => {
    axios
      .get("http://localhost:8080/cua-hang")
      .then((response) => {
        setListCuaHang(response.data);
        setIdCuaHang(response.data[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const themNhanVien = () => {
    let obj = {
      ma: ma,
      ten: ten,
      diaChi: diaChi,
      gioiTinh: gioiTinh,
      sdt: sdt,
      idCH: idCuaHang,
    };

    axios
      .post("http://localhost:8080/nhan-vien/add", obj)
      .then((response) => {
        let data = response.data;
        dispatch(AddNhanVien(data));
      })
      .catch((error) => {
        console.log(error);
      });
    handleCancel();
  };

  return (
    <Modal title="Tạo nhân viên" visible={visible} onCancel={handleCancel}>
      <Form>
        <Form.Item label="Tên">
          <Input
            value={ten}
            onChange={(e) => {
              setTen(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Địa chỉ">
          <Input
            value={diaChi}
            onChange={(e) => {
              setDiaChi(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Giới tính">
          <Input
            value={gioiTinh}
            onChange={(e) => {
              setGioiTinh(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Mã">
          <Input
            value={ma}
            onChange={(e) => {
              setMa(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Số điện thoại">
          <Input
            value={sdt}
            onChange={(e) => {
              setSdt(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Tên cửa hàng">
          <Select
            value={idCuaHang}
            onChange={(e) => {
              setIdCuaHang(e);
            }}
          >
            {listCuaHang.map((item, index) => (
              <Option value={item.id} key={index}>
                {item.ten}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <Button onClick={themNhanVien}>Thêm</Button>
    </Modal>
  );
};

export default ModalCreateNhanVien;
