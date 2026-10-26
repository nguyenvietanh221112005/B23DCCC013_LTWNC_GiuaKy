import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectBorrowedBooks } from '../features/books/booksSelectors';
import { MAX_BORROW_LIMIT, returnBook } from '../features/books/booksSlice';
import { BorrowedItem } from './BorrowedItem';
import { BorrowProgress } from './BorrowProgress';

export function BorrowedPanel() {
  const borrowedBooks = useAppSelector(selectBorrowedBooks);
  const dispatch = useAppDispatch();

  const handleReturn = useCallback(
    (id: string) => {
      dispatch(returnBook(id));
    },
    [dispatch],
  );

  return (
    <aside className="card side-panel">
      <h2 className="card__title">Sách bạn đang mượn</h2>
      <p className="card__subtitle">Giới hạn {MAX_BORROW_LIMIT} cuốn cùng lúc</p>
      <BorrowProgress used={borrowedBooks.length} max={MAX_BORROW_LIMIT} showLabel />
      {borrowedBooks.length === 0 ? (
        <p className="empty-note">Bạn chưa mượn cuốn nào.</p>
      ) : (
        <ul className="borrowed-list">
          {borrowedBooks.map((book) => (
            <BorrowedItem key={book.id} book={book} onReturn={handleReturn} />
          ))}
        </ul>
      )}
    </aside>
  );
}
