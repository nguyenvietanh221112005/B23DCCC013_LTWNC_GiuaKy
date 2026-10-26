import { useFilterStore } from '../features/filters/useFilterStore';
import { SearchIcon } from './icons';

export function SearchBar() {
  const keyword = useFilterStore((state) => state.keyword);
  const setKeyword = useFilterStore((state) => state.setKeyword);

  return (
    <div className="field field--grow">
      <label htmlFor="book-search" className="field__label">
        Tìm kiếm
      </label>
      <div className="search-input">
        <SearchIcon size={16} />
        <input
          id="book-search"
          type="search"
          placeholder="Nhập tên sách hoặc tác giả..."
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          autoComplete="off"
        />
      </div>
      <p className="field__hint">Tìm theo tên sách hoặc tác giả</p>
    </div>
  );
}
