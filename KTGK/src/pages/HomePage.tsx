import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { BookList } from '../components/BookList';
import { BooksError } from '../components/BooksError';
import { BooksLoading } from '../components/BooksLoading';
import { BorrowedPanel } from '../components/BorrowedPanel';
import { BorrowWarning } from '../components/BorrowWarning';
import { CategoryFilter } from '../components/CategoryFilter';
import { PageHeading } from '../components/PageHeading';
import { SearchBar } from '../components/SearchBar';
import { selectBooksError, selectBooksStatus } from '../features/books/booksSelectors';
import { fetchBooksThunk } from '../features/books/booksSlice';

export function HomePage() {
  const status = useAppSelector(selectBooksStatus);
  const error = useAppSelector(selectBooksError);
  const dispatch = useAppDispatch();

  const handleRetry = useCallback(() => {
    dispatch(fetchBooksThunk());
  }, [dispatch]);

  return (
    <div>
      <PageHeading
        title="Tra cứu sách"
        subtitle="Tìm sách chuyên ngành, xem số bản còn lại và mượn ngay — tối đa 3 cuốn cùng lúc."
      />

      {status === 'failed' ? (
        <BooksError message={error} onRetry={handleRetry} />
      ) : (
        <>
          <div className="card filter-panel">
            <SearchBar />
            <CategoryFilter />
          </div>
          {status === 'succeeded' ? (
            <div className="home-layout">
              <BookList />
              <BorrowedPanel />
            </div>
          ) : (
            <BooksLoading />
          )}
        </>
      )}

      <BorrowWarning />
    </div>
  );
}
