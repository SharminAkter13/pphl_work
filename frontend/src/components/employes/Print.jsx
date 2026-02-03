// src/components/PrintButton.js
import React from "react";
import Button from "../Button";
// import { Button } from "antd";

const Print = ({ item }) => {
  const handlePrint = () => {
    if (!item) return;

    // Define the fields to display in the print table
    const fields = [
      { label: "ID", value: item.id },
      { label: "Name", value: item.name },
      { label: "Email", value: item.email },
      { label: "Phone", value: item.phone },
      { label: "Website", value: item.website },
      { label: "Age", value: item.age },
      { label: "Date of Birth", value: item.dob ? new Date(item.dob).toLocaleDateString() : "" },
      { label: "Office Time", value: item.office_time },
      { label: "Joining DateTime", value: item.joining_datetime ? new Date(item.joining_datetime).toLocaleString() : "" },
      { label: "Department", value: item.department },
      { label: "Active", value: item.is_active ? "Yes" : "No" },
      { label: "Salary Range", value: item.salary_range },
      { label: "Favorite Color", value: item.favorite_color },
      { label: "Joining Month", value: item.joining_month },
      { label: "Joining Week", value: item.joining_week },
      { label: "Created At", value: item.created_at ? new Date(item.created_at).toLocaleString() : "" },
      { label: "Updated At", value: item.updated_at ? new Date(item.updated_at).toLocaleString() : "" },
    ];

    // Generate HTML for printing
    const printContent = `
      <html>
        <head>
          <title>Employee Details - ${item.name}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            img { max-width: 150px; height: auto; margin-bottom: 20px; }
            a { color: blue; text-decoration: underline; }
          </style>
        </head>
        <body>
          <h1>Employee Details</h1>
          ${item.profile_image ? `<img src="http://localhost:8000/storage/${item.profile_image}" alt="Profile" />` : ""}
          <table>
            <tbody>
              ${fields.map(field => `
                <tr>
                  <td><strong>${field.label}:</strong></td>
                  <td>${field.value}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          ${item.resume ? `<p><a href="http://localhost:8000/storage/${item.resume}" target="_blank">View Resume</a></p>` : ""}
        </body>
      </html>
    `;

    // Open print window and write content
    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Button type="link" onClick={handlePrint}>
      Print
    </Button>
  );
};

export default Print;