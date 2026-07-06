import { useTodos } from '../hooks/useTodos';
import TodoForm from '../components/TodoForm/TodoForm';
import TodoList from '../components/TodoList/TodoList';
import SearchFilter from '../components/SearchFilter/SearchFilter';

function TodoPage() {
  const {
    todos, loading, error, filters, setFilters,
    addTodo, editTodo, removeTodo, toggleTodo,
  } = useTodos();

  return (
    <div className="todo-page">
      <h1>Quản lý công việc</h1>
      <TodoForm onSubmit={addTodo} />
      <SearchFilter filters={filters} onFilterChange={setFilters} />
      <TodoList
        todos={todos}
        loading={loading}
        error={error}
        onToggle={toggleTodo}
        onEdit={editTodo}
        onDelete={removeTodo}
      />
    </div>
  );
}

export default TodoPage;