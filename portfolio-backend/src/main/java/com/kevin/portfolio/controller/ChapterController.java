package com.kevin.portfolio.controller;

import com.kevin.portfolio.entity.Chapter;
import com.kevin.portfolio.service.ChapterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
 
import java.util.List;
 
@RestController
@RequestMapping("/api/chapters")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ChapterController {
 
    private final ChapterService chapterService;

     // CREATE chapter
    @PostMapping
    public Chapter createChapter(@RequestBody Chapter chapter) {
        return chapterService.saveChapter(chapter);
    }
 
    // GET /api/chapters — list of all published chapters
    @GetMapping
    public List<Chapter> getAllChapters() {
        return chapterService.getPublishedChapters();
    }
 
    // GET /api/chapters/{id} — single chapter with full content
    @GetMapping("/{id}")
    public Chapter getChapter(@PathVariable Long id) {
        return chapterService.getChapterById(id);
    }
}