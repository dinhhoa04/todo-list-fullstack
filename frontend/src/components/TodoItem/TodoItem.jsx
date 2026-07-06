import { useState } from 'react';
import TodoForm from '../TodoForm/TodoForm';
import './TodoItem.css';

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditSubmit = async (data) => {
    const result = await onEdit(todo.id, data);
    if (result.success) setIsEditing(false);
    return result;
  };

  const handleDelete = () => {
    if (window.confirm(`Xóa công việc "${todo.title}"?`)) {
      onDelete(todo.id);
    }
  };

  if (isEditing) {
    return (
      <li className="todo-item editing">
        <TodoForm
          initialData={todo}
          onSubmit={handleEditSubmit}
          onCancel={() => setIsEditing(false)}
        />
      </li>
    );
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <div className="todo-text">
          <span className="todo-title">{todo.title}</span>
          {todo.description && <p className="todo-description">{todo.description}</p>}
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={() => setIsEditing(true)}>Sửa</button>
        <button className="btn-delete" onClick={handleDelete}>Xóa</button>
      </div>
    </li>
  );
}

export default TodoItem;