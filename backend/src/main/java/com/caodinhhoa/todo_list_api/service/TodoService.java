package com.caodinhhoa.todo_list_api.service;

import com.caodinhhoa.todo_list_api.dto.request.TodoCreateRequest;
import com.caodinhhoa.todo_list_api.dto.request.TodoUpdateRequest;
import com.caodinhhoa.todo_list_api.dto.response.TodoResponse;

import java.util.List;

public interface TodoService {
    List<TodoResponse> getAllTodos(String keyword, Boolean completed);
    TodoResponse getTodoById(Long id);
    TodoResponse createTodo(TodoCreateRequest request);
    TodoResponse updateTodo(Long id, TodoUpdateRequest request);
    void deleteTodo(Long id);
    TodoResponse toggleComplete(Long id);
}