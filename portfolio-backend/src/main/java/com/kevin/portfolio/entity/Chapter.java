package com.kevin.portfolio.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
 
@Entity
@Table(name = "chapters")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Chapter {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @Column(nullable = false, length = 10)
    private String number;        // e.g. "01", "02"
 
    @Column(nullable = false)
    private String title;
 
    @Column(columnDefinition = "TEXT")
    private String description;   // short teaser shown in the card
 
    @Column(columnDefinition = "TEXT")
    private String content;       // full chapter body (markdown)
 
    @Column(nullable = false)
    private boolean published;    // false = draft, true = visible to readers
}
 

/*

This is a data base schema for Chapter entity. It includes the following fields:
- id: a unique identifier for each chapter, generated automatically.
- number: a string representing the chapter number, e.g. "01", "02".
- title: the title of the chapter.
- description: a short teaser shown in the card, stored as text.
- content: the full chapter body, stored as text (markdown).
- published: a boolean indicating whether the chapter is published (true) or still a draft (
*/