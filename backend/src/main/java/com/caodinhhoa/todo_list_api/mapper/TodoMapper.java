package com.caodinhhoa.todo_list_api.mapper;

import com.caodinhhoa.todo_list_api.dto.request.TodoCreateRequest;
import com.caodinhhoa.todo_list_api.dto.response.TodoResponse;
import com.caodinhhoa.todo_list_api.entity.Todo;

public class TodoMapper {

    public static Todo toEntity(TodoCreateRequest request) {
        return Todo.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .completed(false)
                .build();
    }

    public static TodoResponse toResponse(Todo todo) {
        return TodoResponse.builder()
                .id(todo.getId())
                .title(todo.getTitle())
                .description(todo.getDescription())
                .completed(todo.isCompleted())
                .createdAt(todo.getCreatedAt())
                .updatedAt(todo.getUpdatedAt())
                .build();
    }
}