# Employee Management System

A full-stack **Employee Management System** built with **Java Spring Boot** (backend) and **React** (frontend).  
The system supports **role-based access control**, with authentication handled via **Supabase** and employee data stored in **MongoDB**.

---

## 🏆 Assessment Task Overview

This project implements:

1. **User registration and login** using Supabase authentication (roles: **Admin** and **Employee**).  
2. **Role-based dashboards**:  
   - **Admin Dashboard**: Add employees, view all employees, update employee details, delete employees.  
   - **Employee Dashboard**: View and update only their own details.  
3. Employee information (name, department, designation, salary, etc.) is stored in **MongoDB**.  
4. Backend APIs handle **CRUD operations** securely.  
5. Frontend consumes these APIs and displays the data via a clean UI.

---

## 🛠 Technology Stack

**Backend**:
- Java 17
- Spring Boot
- Spring Data MongoDB
- JWT authentication
- Maven

**Frontend**:
- React.js
- Axios (for API calls)
- React Router DOM (for routing)
- CSS for styling

**Database**:
- MongoDB (local or cloud)

**Authentication**:
- Supabase (token-based, role-based access)

---

## 📁 Project Structure

EmployeeManagementSystem/
│
├─ backend/ # Spring Boot Backend
│ ├─ src/main/java/com/posterior
│ │ ├─ controller
│ │ │ ├─ AuthController.java
│ │ │ └─ EmployeeController.java
│ │ ├─ dto
│ │ │ ├─ AuthRequest.java
│ │ │ └─ AuthResponse.java
│ │ ├─ model
│ │ │ └─ Employee.java
│ │ ├─ repository
│ │ │ └─ EmployeeRepository.java
│ │ └─ security
│ │ └─ JwtAuthFilter.java
│ └─ src/main/resources
│ └─ application.properties
│ └─ pom.xml
│
├─ frontend/ # React Frontend
│ ├─ src
│ │ ├─ components
│ │ │ ├─ Login.js
│ │ │ ├─ Register.js
│ │ │ ├─ AdminDashboard.js
│ │ │ └─ EmployeeDashboard.js
│ │ ├─ App.js
│ │ └─ index.js

---

## ⚙️ Backend Setup (Spring Boot + MongoDB)

1. Navigate to the backend folder:
```bash
  cd EmployeeManagementSystem/backend

2. Configure MongoDB in application.properties:
  spring.data.mongodb.uri=mongodb://localhost:27017/employee_db


Replace localhost and employee_db with your MongoDB host and database name.

3. Configure Supabase credentials in your backend environment for authentication.

4. Build and run the backend:
   mvn clean install
   mvn spring-boot:run

5. Backend server will run at: http://localhost:8080

Frontend Setup (React)
  1.Navigate to the frontend folder:
    cd EmployeeManagementSystem/frontend
  
  2.Install dependencies:
    npm install

  3. Start the frontend:
     npm start

  4.Frontend will run at: http://localhost:3000


🔑 Login Workflow
    Admin
    Email: admin@example.com
    Password: admin123

Employee
    Email: employee@example.com
    Password: employee123

Authentication is handled by Supabase. Tokens are stored in the frontend for API access.


🖥 Features
  Admin Dashboard:
    1.Add employees
    2.View all employees
    3.Update employee details
    4.Delete employees
   Employee Dashboard:
    1.View own profile
    2.Update own profile


📦 API Endpoints
    Authentication (AuthController):
       1.POST /api/auth/login → Login, return JWT
       2.POST /api/auth/register → Register a new employee

    Employee Management (EmployeeController):
        1.GET /api/employees → Admin only, list all employees
        2.GET /api/employees/me → Employee, fetch own profile
        3.POST /api/employees → Admin only, add employee
        4.PUT /api/employees/{id} → Admin or Employee (self) update
        5.DELETE /api/employees/{id} → Admin only, delete employee
