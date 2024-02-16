import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useParams } from "react-router-dom";

const ModalDetail = ({ visible, handleCancel, user }) => {
  return (
    <Modal title="Basic Modal" visible={visible} onCancel={handleCancel}>
      <p>{user && user.username}</p>
      <p>{user && user.phoneNumber}</p>
      <p>{user && user.name}</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default ModalDetail;
