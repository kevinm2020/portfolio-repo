package com.kevin.portfolio.service;

import com.kevin.portfolio.entity.Chapter;
import com.kevin.portfolio.repository.ChapterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
 
import java.util.List;
 
@Service
@RequiredArgsConstructor
public class ChapterService {
 
    private final ChapterRepository chapterRepository;
 
    // Returns all published chapters (no content body — for the chapter list)
    public List<Chapter> getPublishedChapters() {
        return chapterRepository.findAllByPublishedTrueOrderByNumberAsc();
    }

    public Chapter saveChapter(Chapter chapter) 
    {
        return chapterRepository.save(chapter);
    }
 
    // Returns a single chapter with full content
    public Chapter getChapterById(Long id) {
        return chapterRepository.findById(id)
                .filter(Chapter::isPublished)
                .orElseThrow(() -> new RuntimeException("Chapter not found or not published"));
    }
}
 