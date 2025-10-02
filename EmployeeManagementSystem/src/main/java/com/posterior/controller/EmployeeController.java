package com.posterior.controller;

import com.posterior.model.Employee;
import com.posterior.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository repo;

    @GetMapping
    public List<Employee> getAllEmployees(HttpServletRequest request) {
        String role = (String) request.getAttribute("role");
        if (!"Admin".equalsIgnoreCase(role)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only Admin can view all employees");
        }
        return repo.findAll();
    }

    @GetMapping("/me")
    public Employee getMyProfile(HttpServletRequest request) {
        String sub = (String) request.getAttribute("sub");
        return repo.findByUserSub(sub)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));
    }

    @PostMapping
    public Employee addEmployee(@RequestBody Employee emp, HttpServletRequest request) {
        String role = (String) request.getAttribute("role");
        if (!"Admin".equalsIgnoreCase(role)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only Admin can add employees");
        }
        return repo.save(emp);
    }

    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable String id,
                                   @RequestBody Employee emp,
                                   HttpServletRequest request) {
        String role = (String) request.getAttribute("role");
        String sub = (String) request.getAttribute("sub");

        Employee existing = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found"));

        if ("Employee".equalsIgnoreCase(role) && !existing.getUserSub().equals(sub)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Employees can update only their own profile");
        }

        existing.setName(emp.getName());
        existing.setDepartment(emp.getDepartment());
        existing.setDesignation(emp.getDesignation());
        existing.setSalary(emp.getSalary());

        return repo.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable String id, HttpServletRequest request) {
        String role = (String) request.getAttribute("role");
        if (!"Admin".equalsIgnoreCase(role)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only Admin can delete employees");
        }
        repo.deleteById(id);
    }
}
