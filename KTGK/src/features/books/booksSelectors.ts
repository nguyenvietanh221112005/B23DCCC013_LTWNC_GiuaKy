import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { Book } from '../../types/book';

export const selectBooks = (state: RootState) => state.books.items;
export const selectBooksStatus = (state: RootState) => state.books.status;
export const selectBooksError = (state: RootState) => state.books.error;
export const selectBorrowedIds = (state: RootState) => state.books.borrowedIds;
export const selectBorrowedCount = (state: RootState) => state.books.borrowedIds.length;
export const selectBorrowWarning = (state: RootState) => state.books.borrowWarning;

export const selectBorrowedBooks = createSelector([selectBooks, selectBorrowedIds], (books, ids) =>
  ids
    .map((id) => books.find((book) => book.id === id))
    .filter((book): book is Book => book !== undefined),
);
