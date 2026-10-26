import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectBooks, selectBorrowedIds } from '../features/books/booksSelectors';
import { borrowBook } from '../features/books/booksSlice';
import { useFilterStore } from '../features/filters/useFilterStore';
import { useDebounce } from '../hooks/useDebounce';
import { matchesKeyword } from '../types/book';
import { BookItem } from './BookItem';

export function BookList() {
  const books = useAppSelector(selectBooks);
  const borrowedIds = useAppSelector(selectBorrowedIds);
  const dispatch = useAppDispatch();

  const keyword = useFilterStore((state) => state.keyword);
  const category = useFilterStore((state) => state.category);
  const debouncedKeyword = useDebounce(keyword, 300);

  const filteredBooks = useMemo(() => {
    const normalizedKeyword = debouncedKeyword.trim().toLowerCase();
    return books.filter((book) => {
      const matchesCategory = category === 'Tất cả' || book.category === category;
      return matchesCategory && matchesKeyword(book, normalizedKeyword);
    });
  }, [books, category, debouncedKeyword]);

  const borrowedSet = useMemo(() => new Set(borrowedIds), [borrowedIds]);

  const handleBorrow = useCallback(
    (id: string) => {
      dispatch(borrowBook(id));
    },
    [dispatch],
  );

  return (
    <section>
      <div className="section-head">
        <h2>Danh sách sách</h2>
        <span className="muted small">
          Hiển thị {filteredBooks.length} / {books.length} đầu sách
        </span>
      </div>
      {filteredBooks.length === 0 ? (
        <div className="card empty-state">Không tìm thấy sách phù hợp.</div>
      ) : (
        <ul className="book-grid">
          {filteredBooks.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              isBorrowed={borrowedSet.has(book.id)}
              onBorrow={handleBorrow}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
