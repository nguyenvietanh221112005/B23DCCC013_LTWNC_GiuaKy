import { configureStore } from '@reduxjs/toolkit';
import booksReducer, { MAX_BORROW_LIMIT, borrowBook, fetchBooksThunk } from '../features/books/booksSlice';
import type { Book } from '../types/book';
import { borrowLimitMiddleware } from './borrowLimitMiddleware';

const books: Book[] = ['b1', 'b2', 'b3', 'b4'].map((id) => ({
  id,
  title: `Sách ${id}`,
  author: 'Tác giả',
  category: 'CNTT',
  year: 2020,
  available: 1,
  total: 1,
}));

function makeStore() {
  const store = configureStore({
    reducer: { books: booksReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(borrowLimitMiddleware),
  });
  store.dispatch({ type: fetchBooksThunk.fulfilled.type, payload: books });
  return store;
}

describe('borrowLimitMiddleware', () => {
  it(`chặn cuốn thứ ${MAX_BORROW_LIMIT + 1} và hiện cảnh báo`, () => {
    const store = makeStore();

    ['b1', 'b2', 'b3', 'b4'].forEach((id) => store.dispatch(borrowBook(id)));

    const state = store.getState().books;
    expect(state.borrowedIds).toEqual(['b1', 'b2', 'b3']);
    expect(state.items.find((book) => book.id === 'b4')?.available).toBe(1);
    expect(state.borrowWarning).not.toBeNull();
  });
});
