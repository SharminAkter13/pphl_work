import React from "react";

const ItemView = ({ item }) => {
  if (!item) return null;

  // Define the fields to display in the table
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

  return (
    <div>
      {/* Display profile image if available */}
      {item.profile_image && (
        <img
          src={`http://localhost:8000/storage/${item.profile_image}`}
          alt="Profile"
          className="h-32 mb-4 rounded"
        />
      )}
      {/* Table for employee details */}
      <table className="w-full text-sm border bg-white-800 text-white">
        <tbody>
          {fields.map((field, index) => (
            <tr key={index} className="border-t">
              <td className="p-2 font-bold bg-white-700">{field.label}:</td>
              <td className="p-2">{field.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Display resume link if available */}
      {item.resume && (
        <div className="mt-4">
          <a
            href={`http://localhost:8000/storage/${item.resume}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            View Resume
          </a>
        </div>
      )}
    </div>
  );
};

export default ItemView;