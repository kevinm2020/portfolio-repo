package com.kevin.portfolio.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User 
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String firstName;

    private String lastName;

    @Enumerated(EnumType.STRING)
    private Role role;

}

/*
Entity classes are how the application see Data. In this case
we are defining the User class, as in what data properties 
a User in our application should have.

@Entity → Tells JPA this maps to a database table
@Table(name = "users") → Table will be called users
Lombok annotations → No need to manually write getters/setters
*/