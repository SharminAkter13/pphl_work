// src/components/employes/EmployeeCrud.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import InputGroup from "../../components/InputGroup";
import View from "../../components/employes/View";  // Import the View component
import Print from "../../components/employes/Print";  // Import the Print component
import Form from "../../components/employes/Form";  // Import the Print component
import ItemTable from "../../components/employes/ItemTable";

const API = "http://localhost:8000/api/employees";
const IMAGE_URL = "http://localhost:8000/storage/";

const EmployeeCrud = () => {
  const initialForm = {
    name: "",
    email: "",
    password: "",
    phone: "",
    website: "",
    age: "",
    dob: "",
    office_time: "",
    joining_datetime: "",
    department: "",
    is_active: false,
    salary_range: 50,
    favorite_color: "#000000",
    joining_month: "",
    joining_week: ""
  };

  const [form, setForm] = useState(initialForm);
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  // Removed [viewEmployee, setViewEmployee] since View component handles its own modal

  const [errors, setErrors] = useState({});

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [resume, setResume] = useState(null);

  /* ---------------- FETCH ---------------- */
  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API);
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  /* ---------------- FORM ---------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    // Clear errors on change
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append form data, converting booleans to 1/0 for Laravel validation
    Object.keys(form).forEach(key => {
      if (typeof form[key] === 'boolean') {
        data.append(key, form[key] ? 1 : 0);
      } else {
        data.append(key, form[key]);
      }
    });
    if (profileImage) data.append("profile_image", profileImage);
    if (resume) data.append("resume", resume);

    try {
      if (editingId) {
        await axios.post(`${API}/${editingId}?_method=PUT`, data);
      } else {
        await axios.post(API, data);
      }
      resetForm();
      fetchEmployees();
      setErrors({});
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Submission error:", error.response?.data || error.message);
      }
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setProfileImage(null);
    setImagePreview(null);
    setResume(null);
    setErrors({});
  };

  /* ---------------- ACTIONS ---------------- */
  const handleEdit = (emp) => {
    setForm({
      ...emp,
      is_active: !!emp.is_active,
      salary_range: emp.salary_range || 50,
    });
    setEditingId(emp.id);
    setImagePreview(emp.profile_image ? IMAGE_URL + emp.profile_image : null);
    setErrors({});
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete employee?")) {
      try {
        await axios.delete(`${API}/${id}`);
        fetchEmployees();
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  // Removed handlePrint since Print component handles it

  /* ---------------- UI ---------------- */
  return (
    <div className="p-6 bg-white-900 min-h-screen text-white w-1/3">
      <h2 className="text-xl mb-4">
        {editingId ? "Update Employee" : "Create Employee"}
      </h2>

      {/* Display errors if any */}
      {Object.keys(errors).length > 0 && (
        <div className="mb-4 p-4 bg-red-600 text-white rounded">
          <h3 className="font-bold">Validation Errors:</h3>
          <ul>
            {Object.entries(errors).map(([field, messages]) => (
              <li key={field}>{field}: {messages.join(', ')}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ================= FORM ================= */}
      <Form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-8">
        <InputGroup label="Name" name="name" value={form.name} onChange={handleChange} />
        <InputGroup label="Email" type="email" name="email" value={form.email} onChange={handleChange} />
        <InputGroup label="Password" type="password" name="password" onChange={handleChange} />
        <InputGroup label="Phone" type="tel" name="phone" value={form.phone} onChange={handleChange} />
        <InputGroup label="Website" type="url" name="website" value={form.website} onChange={handleChange} />
        <InputGroup label="Age" type="number" name="age" value={form.age} onChange={handleChange} />
        <InputGroup label="DOB" type="date" name="dob" value={form.dob} onChange={handleChange} />
        <InputGroup label="Office Time" type="time" name="office_time" value={form.office_time} onChange={handleChange} />
        <InputGroup label="Joining DateTime" type="datetime-local" name="joining_datetime" value={form.joining_datetime} onChange={handleChange} />

        {/* RADIO */}
        <div>
          <label className="block mb-1">Department</label>
          <label className="mr-4">
            <input type="radio" name="department" value="HR" checked={form.department === "HR"} onChange={handleChange} /> HR
          </label>
          <label>
            <input type="radio" name="department" value="IT" checked={form.department === "IT"} onChange={handleChange} /> IT
          </label>
        </div>

        {/* CHECKBOX */}
        <label>
          <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} /> Active
        </label>

        {/* RANGE */}
        <InputGroup label="Salary Range" type="range" name="salary_range" value={form.salary_range} onChange={handleChange} />

        {/* COLOR */}
        <InputGroup label="Favorite Color" type="color" name="favorite_color" value={form.favorite_color} onChange={handleChange} />

        {/* FILES */}
        <div>
          <label>Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <img src={imagePreview} alt="preview" className="mt-2 h-24 rounded border" />
          )}
        </div>

        <div>
          <label>Resume</label>
          <input type="file" onChange={(e) => setResume(e.target.files[0])} />
        </div>

        <InputGroup label="Joining Month" type="month" name="joining_month" value={form.joining_month} onChange={handleChange} />
        <InputGroup label="Joining Week" type="week" name="joining_week" value={form.joining_week} onChange={handleChange} />

        <button type="submit" className="bg-green-600 p-2 rounded">
          {editingId ? "Update" : "Submit"}
        </button>
        <button type="button" onClick={resetForm} className="bg-white-600 p-2 rounded">
          Reset
        </button>
      </Form>

      {/* ================= TABLE ================= */}
      <ItemTable dataSource={employees} className=" w-1/3"/>

      {/* Removed the VIEW section since View component handles the modal */}
    </div>
  );
};

export default EmployeeCrud;