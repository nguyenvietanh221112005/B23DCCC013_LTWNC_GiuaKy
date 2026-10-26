import { useMemo } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectBooks } from '../features/books/booksSelectors';
import { useFilterStore } from '../features/filters/useFilterStore';
import { BOOK_CATEGORIES, type CategoryFilterValue } from '../types/book';

const OPTIONS: CategoryFilterValue[] = ['Tất cả', ...BOOK_CATEGORIES];

export function CategoryFilter() {
  const books = useAppSelector(selectBooks);
  const category = useFilterStore((state) => state.category);
  const setCategory = useFilterStore((state) => state.setCategory);

  const counts = useMemo(() => {
    const result: Record<CategoryFilterValue, number> = {
      'Tất cả': books.length,
      CNTT: 0,
      'Kinh tế': 0,
      'Ngoại ngữ': 0,
    };
    books.forEach((book) => {
      result[book.category] += 1;
    });
    return result;
  }, [books]);

  return (
    <div className="field">
      <span className="field__label" id="category-label">
        Thể loại
      </span>
      <div className="chips" role="group" aria-labelledby="category-label">
        {OPTIONS.map((option) => {
          const isActive = option === category;
          return (
            <button
              key={option}
              type="button"
              className={`chip${isActive ? ' chip--active' : ''}`}
              aria-pressed={isActive}
              onClick={() => setCategory(option)}
            >
              {option}
              {books.length > 0 && <span className="chip__count mono">{counts[option]}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
