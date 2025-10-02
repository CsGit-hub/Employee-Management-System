import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    department: "",
    designation: "",
    salary: "",
  });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // Load all employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update Employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:8080/api/employees/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("http://localhost:8080/api/employees", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({ name: "", department: "", designation: "", salary: "" });
      setEditId(null);
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit Employee
  const handleEdit = (employee) => {
    setForm(employee);
    setEditId(employee.id);
  };

  // Delete Employee
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout} className="logout-btn">Logout</button>

      {/* Add/Update Form */}
      <form onSubmit={handleSubmit} className="employee-form">
        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={form.designation}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"} Employee</button>
      </form>

      {/* Employees List */}
      <h3>All Employees</h3>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>{emp.designation}</td>
              <td>{emp.salary}</td>
              <td>
                <button onClick={() => handleEdit(emp)}>Edit</button>
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
