import { useState, useEffect } from 'react';
import './SearchFilter.css';

function SearchFilter({ filters, onFilterChange }) {
  const [keyword, setKeyword] = useState(filters.keyword || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ ...filters, keyword });
    }, 400);
    return () => clearTimeout(timer);
  }, [keyword]);

  const handleStatusChange = (e) => {
    const value = e.target.value;
    const completed = value === 'all' ? undefined : value === 'completed';
    onFilterChange({ ...filters, completed });
  };

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Tìm kiếm công việc..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <select
        onChange={handleStatusChange}
        value={filters.completed === undefined ? 'all' : filters.completed ? 'completed' : 'pending'}
      >
        <option value="all">Tất cả</option>
        <option value="pending">Chưa hoàn thành</option>
        <option value="completed">Đã hoàn thành</option>
      </select>
    </div>
  );
}

export default SearchFilter;