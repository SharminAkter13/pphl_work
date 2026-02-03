// src/components/ItemTable.js
import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
import { fetchItems } from "../services/api";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import ViewButton from "./ViewButton";
import PrintButton from "./PrintButton";

const Table = () => {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    try {
      const res = await fetchItems();
      setItems(res.data);
    } catch (err) {
      message.error("Failed to fetch items");
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <EditButton item={record} onUpdated={loadItems} />
          <DeleteButton itemId={record.id} onDeleted={loadItems} />
          <ViewButton item={record} />
          <PrintButton item={record} />
        </>
      ),
    },
  ];

  return <Table columns={columns} dataSource={items} rowKey="id" />;
};

export default Table;
