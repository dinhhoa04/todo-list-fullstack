package com.caodinhhoa.todo_list_api.controller;

import com.caodinhhoa.todo_list_api.dto.request.TodoCreateRequest;
import com.caodinhhoa.todo_list_api.dto.request.TodoUpdateRequest;
import com.caodinhhoa.todo_list_api.dto.response.ApiResponse;
import com.caodinhhoa.todo_list_api.dto.response.TodoResponse;
import com.caodinhhoa.todo_list_api.service.TodoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<TodoResponse>>> getAllTodos(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Boolean completed) {
        List<TodoResponse> todos = todoService.getAllTodos(keyword, completed);
        return ResponseEntity.ok(ApiResponse.success("Lấy danh sách thành công", todos));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TodoResponse>> getTodoById(@PathVariable Long id) {
        TodoResponse todo = todoService.getTodoById(id);
        return ResponseEntity.ok(ApiResponse.success("Lấy công việc thành công", todo));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<TodoResponse>> createTodo(
            @Valid @RequestBody TodoCreateRequest request) {
        TodoResponse created = todoService.createTodo(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Tạo công việc thành công", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TodoResponse>> updateTodo(
            @PathVariable Long id,
            @Valid @RequestBody TodoUpdateRequest request) {
        TodoResponse updated = todoService.updateTodo(id, request);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật thành công", updated));
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<ApiResponse<TodoResponse>> toggleComplete(@PathVariable Long id) {
        TodoResponse updated = todoService.toggleComplete(id);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật trạng thái thành công", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.ok(ApiResponse.success("Xóa thành công", null));
    }
}