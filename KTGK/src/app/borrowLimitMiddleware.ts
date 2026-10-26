import type { Middleware } from '@reduxjs/toolkit';
import {
  MAX_BORROW_LIMIT,
  borrowBook,
  setBorrowWarning,
  type BooksState,
} from '../features/books/booksSlice';

interface MiddlewareState {
  books: BooksState;
}

export const borrowLimitMiddleware: Middleware<Record<string, never>, MiddlewareState> =
  (storeApi) => (next) => (action) => {
    if (borrowBook.match(action)) {
      const borrowedCount = storeApi.getState().books.borrowedIds.length;
      if (borrowedCount >= MAX_BORROW_LIMIT) {
        storeApi.dispatch(
          setBorrowWarning(`Bạn chỉ được mượn tối đa ${MAX_BORROW_LIMIT} cuốn sách cùng lúc.`),
        );
        return;
      }
    }
    return next(action);
  };
