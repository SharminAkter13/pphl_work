import React from "react";
import { Descriptions } from "antd";

const View = ({ item }) => {
  if (!item) return null;

  return (
    <Descriptions bordered column={1}>
      <Descriptions.Item label="ID">{item.id}</Descriptions.Item>
      <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
      <Descriptions.Item label="Description">{item.description}</Descriptions.Item>
    </Descriptions>
  );
};

export default View;
