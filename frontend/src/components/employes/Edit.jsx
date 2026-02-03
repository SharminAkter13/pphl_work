// src/components/EditButton.js
import React, { useState } from "react";
import { Button, Modal } from "antd";
import Form from "./Form";

const Edit = ({ item, onUpdated }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="link" onClick={() => setVisible(true)}>
        Edit
      </Button>
      <Modal
        title="Edit Item"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          item={item}
          onSuccess={() => {
            setVisible(false);
            onUpdated && onUpdated();
          }}
        />
      </Modal>
    </>
  );
};

export default Edit;
