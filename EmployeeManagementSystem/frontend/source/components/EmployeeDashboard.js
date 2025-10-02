import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EmployeeDashboard() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({});
  const [formData, setFormData] = useState({});

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // saved during login

  useEffect(() => {
    if (!token || !userId) {
      navigate("/");
    } else {
      fetchEmployee();
    }
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/employees/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployee(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/employees/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully!");
      fetchEmployee();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Update failed!");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container">
      <h2 className="page-title">Employee Dashboard</h2>
      <button className="btn logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <div className="form-container">
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department || ""}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={formData.designation || ""}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary || ""}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn add-btn">
            Update Profile
          </button>
        </form>
      </div>

      <div className="employee-details">
        <h3>My Details</h3>
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Designation:</strong> {employee.designation}</p>
        <p><strong>Salary:</strong> {employee.salary}</p>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
