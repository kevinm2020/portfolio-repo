package com.kevin.portfolio.repository;

 
import com.kevin.portfolio.entity.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
 
import java.util.List;
 
public interface ChapterRepository extends JpaRepository<Chapter, Long> {
 
    // Only return chapters you've marked as published
    List<Chapter> findAllByPublishedTrueOrderByNumberAsc();
}
 

/*
This repository interface extends JpaRepository, which provides basic CRUD operations for the Chapter entity. 
The custom method findAllByPublishedTrueOrderByNumberAsc() retrieves all chapters that are marked as published (published = true) and orders them by their number in ascending order. 
This allows the application to easily fetch only the chapters that should be visible to readers, while keeping drafts hidden.
*/