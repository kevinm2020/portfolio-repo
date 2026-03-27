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
 