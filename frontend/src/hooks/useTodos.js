import { useState, useEffect, useCallback } from 'react';
import todoApi from '../api/todoApi';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ keyword: '', completed: undefined });

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filters.keyword) params.keyword = filters.keyword;
      if (filters.completed !== undefined) params.completed = filters.completed;

      const res = await todoApi.getAll(params);
      setTodos(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tải danh sách công việc');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (todoData) => {
    try {
      await todoApi.create(todoData);
      await fetchTodos();
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Thêm thất bại' };
    }
  };

  const editTodo = async (id, todoData) => {
    try {
      await todoApi.update(id, todoData);
      await fetchTodos();
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Cập nhật thất bại' };
    }
  };

  const removeTodo = async (id) => {
    try {
      await todoApi.delete(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError('Xóa thất bại');
    }
  };

  const toggleTodo = async (id) => {
    try {
      const res = await todoApi.toggleComplete(id);
      setTodos((prev) => prev.map((t) => (t.id === id ? res.data.data : t)));
    } catch (err) {
      setError('Cập nhật trạng thái thất bại');
    }
  };

  return {
    todos,
    loading,
    error,
    filters,
    setFilters,
    addTodo,
    editTodo,
    removeTodo,
    toggleTodo,
  };
}