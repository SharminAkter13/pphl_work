import React, { useState } from "react";
import ItemView from "./ItemView";
import Button from "../Button";
import { Modal } from "antd";

const View = ({ item }) => {
  const [open, setOpen] = useState(false); // Changed to 'open' for Ant Design v4+

  return (
    <>
      <Button type="link" onClick={() => setOpen(true)}>
        View
      </Button>
      <Modal
        title="View Item"
        open={open} // Changed from 'visible' to 'open'
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <ItemView item={item} />
      </Modal>
    </>
  );
};

export default View;