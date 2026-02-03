import React, { useState } from "react";
import { Button, Modal } from "antd";
import Form from "./Form";

const Edit = ({ item, onUpdated }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="link" onClick={() => setOpen(true)}>
        Edit
      </Button>
      <Modal
        title="Edit Item"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnHidden 
      >
        <Form
          item={item}
          onSuccess={() => {
            setOpen(false);
            onUpdated && onUpdated();
          }}
        />
      </Modal>
    </>
  );
};

export default Edit;