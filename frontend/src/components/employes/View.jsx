// src/components/ViewButton.js
import React, { useState } from "react";
import { Button, Modal } from "antd";
import ItemView from "./ItemView";

const View = ({ item }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="link" onClick={() => setVisible(true)}>
        View
      </Button>
      <Modal
        title="View Item"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <ItemView item={item} />
      </Modal>
    </>
  );
};

export default View;