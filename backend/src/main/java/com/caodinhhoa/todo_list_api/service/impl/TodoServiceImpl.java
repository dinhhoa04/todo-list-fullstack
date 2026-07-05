package com.caodinhhoa.todo_list_api.service.impl;

import com.caodinhhoa.todo_list_api.dto.request.TodoCreateRequest;
import com.caodinhhoa.todo_list_api.dto.request.TodoUpdateRequest;
import com.caodinhhoa.todo_list_api.dto.response.TodoResponse;
import com.caodinhhoa.todo_list_api.entity.Todo;
import com.caodinhhoa.todo_list_api.exception.ResourceNotFoundException;
import com.caodinhhoa.todo_list_api.mapper.TodoMapper;
import com.caodinhhoa.todo_list_api.repository.TodoRepository;
import com.caodinhhoa.todo_list_api.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;

    @Override
    public List<TodoResponse> getAllTodos(String keyword, Boolean completed) {
        String normalizedKeyword = (keyword == null || keyword.isBlank()) ? null : keyword;
        return todoRepository.searchAndFilter(normalizedKeyword, completed)
                .stream()
                .map(TodoMapper::toResponse)
                .toList();
    }

    @Override
    public TodoResponse getTodoById(Long id) {
        Todo todo = findTodoOrThrow(id);
        return TodoMapper.toResponse(todo);
    }

    @Override
    public TodoResponse createTodo(TodoCreateRequest request) {
        Todo todo = TodoMapper.toEntity(request);
        Todo saved = todoRepository.save(todo);
        return TodoMapper.toResponse(saved);
    }

    @Override
    public TodoResponse updateTodo(Long id, TodoUpdateRequest request) {
        Todo todo = findTodoOrThrow(id);
        todo.setTitle(request.getTitle());
        todo.setDescription(request.getDescription());
        todo.setCompleted(request.isCompleted());
        Todo updated = todoRepository.save(todo);
        return TodoMapper.toResponse(updated);
    }

    @Override
    public void deleteTodo(Long id) {
        Todo todo = findTodoOrThrow(id);
        todoRepository.delete(todo);
    }

    @Override
    public TodoResponse toggleComplete(Long id) {
        Todo todo = findTodoOrThrow(id);
        todo.setCompleted(!todo.isCompleted());
        Todo updated = todoRepository.save(todo);
        return TodoMapper.toResponse(updated);
    }

    // Tránh lặp code find-or-throw ở mọi method
    private Todo findTodoOrThrow(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy công việc với id: " + id));
    }
}