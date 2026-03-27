package com.kevin.portfolio.repository;

 
import com.kevin.portfolio.entity.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
 
import java.util.List;
 
public interface ChapterRepository extends JpaRepository<Chapter, Long> {
 
    // Only return chapters you've marked as published
    List<Chapter> findAllByPublishedTrueOrderByNumberAsc();
}
 