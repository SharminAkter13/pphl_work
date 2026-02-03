// src/components/employes/ItemTable.js
import React from "react";
import { Table } from "antd";
import Delete from "./Delete";
import Edit from "./Edit";
import View from "./View";
import Print from "./Print";

const ItemTable = ({ dataSource }) => {
  const generateColumns = (data) => {
    if (!data || data.length === 0) return [];

    const keys = Object.keys(data[0]);
    const dynamicColumns = keys.map((key) => ({
      title: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
      dataIndex: key,
      key,
      render: (value) => {
        if (key === "profile_image" && value) {
          return (
            <img
              src={`http://localhost:8000/storage/${value}`} 
              alt="Profile"
              style={{ width: 50, height: 50, objectFit: "cover" }}
            />
          );
        } else if ((key === "resume" || (value && typeof value === 'string' && value.endsWith && value.endsWith(".pdf"))) && value) {
          
          return (
            <a href={`http://localhost:8000/storage/${value}`} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
          );
        } else {
          return value;
        }
      },
    }));

    // Add Actions column with buttons like View
    dynamicColumns.push({
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <View item={record} />
          <Edit item={record} onUpdated={() => window.location.reload()} /> {/* Assuming onUpdated reloads or fetches */}
          <Delete itemId={record.id} onDeleted={() => window.location.reload()} />
          <Print item={record} />
        </div>
      ),
    });

    return dynamicColumns;
  };

  const columns = generateColumns(dataSource);

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      className="w-1/3"
      pagination={{ pageSize: 10 }}
    />
  );
};

export default ItemTable;