package com.caodinhhoa.todo_list_api.repository;

import com.caodinhhoa.todo_list_api.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByCompleted(boolean completed);
    List<Todo> findByTitleContainingIgnoreCase(String keyword);
    @Query("SELECT t FROM Todo t " +
            "WHERE (:keyword IS NULL OR LOWER(t.title) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND (:completed IS NULL OR t.completed = :completed) " +
            "ORDER BY t.createdAt DESC")
    List<Todo> searchAndFilter(@Param("keyword") String keyword,
                               @Param("completed") Boolean completed);
}