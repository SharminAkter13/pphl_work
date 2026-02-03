// src/components/DeleteButton.js
import React from "react";
import { Button, Popconfirm, message } from "antd";
import { deleteItem } from "../../services/api";

const Delete = ({ itemId, onDeleted }) => {
  const handleDelete = async () => {
    try {
      await deleteItem(itemId);
      message.success("Item deleted successfully");
      onDeleted && onDeleted();
    } catch (err) {
      message.error("Failed to delete item");
    }
  };

  return (
    <Popconfirm
      title="Are you sure to delete this item?"
      onConfirm={handleDelete}
      okText="Yes"
      cancelText="No"
    >
      <Button type="link" danger>
        Delete
      </Button>
    </Popconfirm>
  );
};

export default Delete;
