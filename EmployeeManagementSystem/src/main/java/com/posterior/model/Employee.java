package com.posterior.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "employees")
@Data
public class Employee {
    @Id
    private String id;
    private String name;
    private String email;
    private String department;
    private String designation;
    private Double salary;
    private String userSub;   
    private String role;      
}
