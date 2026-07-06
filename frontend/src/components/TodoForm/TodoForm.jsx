import { useState, useEffect } from 'react';
import './TodoForm.css';

function TodoForm({ initialData, onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Tiêu đề không được để trống';
    } else if (title.length > 255) {
      newErrors.title = 'Tiêu đề không được vượt quá 255 ký tự';
    }
    if (description.length > 1000) {
      newErrors.description = 'Mô tả không được vượt quá 1000 ký tự';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const payload = { title: title.trim(), description: description.trim() };
    if (initialData) payload.completed = initialData.completed;

    const result = await onSubmit(payload);
    setSubmitting(false);

    if (result.success) {
      setTitle('');
      setDescription('');
      setErrors({});
    } else {
      setErrors({ form: result.message });
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Nhập tên công việc..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={errors.title ? 'input-error' : ''}
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      <div className="form-group">
        <textarea
          placeholder="Mô tả (tùy chọn)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
        {errors.description && <span className="error-text">{errors.description}</span>}
      </div>

      {errors.form && <span className="error-text error-form">{errors.form}</span>}

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? 'Đang lưu...' : initialData ? 'Cập nhật' : 'Thêm công việc'}
        </button>
        {onCancel && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Hủy
          </button>
        )}
      </div>
    </form>
  );
}

export default TodoForm;