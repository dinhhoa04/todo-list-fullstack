import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

function TodoList({ todos, loading, error, onToggle, onEdit, onDelete }) {
  if (loading) return <p className="status-message">Đang tải...</p>;
  if (error) return <p className="status-message error">{error}</p>;
  if (todos.length === 0) {
    return <p className="status-message">Không có công việc nào phù hợp.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TodoList;