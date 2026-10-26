import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchBooks as fetchBooksApi, type FetchBooksOptions } from '../../api/booksApi';
import { isApiSuccess } from '../../types/api';
import type { Book } from '../../types/book';

export const MAX_BORROW_LIMIT = 3;

export type AsyncStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface BooksState {
  items: Book[];
  status: AsyncStatus;
  error: string | null;
  borrowedIds: string[];
  borrowWarning: string | null;
}

const initialState: BooksState = {
  items: [],
  status: 'idle',
  error: null,
  borrowedIds: [],
  borrowWarning: null,
};

export const fetchBooksThunk = createAsyncThunk<Book[], FetchBooksOptions | undefined>(
  'books/fetchBooks',
  async (options, { rejectWithValue }) => {
    const response = await fetchBooksApi(options);
    if (isApiSuccess(response)) {
      return response.data;
    }
    return rejectWithValue(response.error);
  },
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    borrowBook(state, action: PayloadAction<string>) {
      const book = state.items.find((item) => item.id === action.payload);
      if (!book || book.available <= 0 || state.borrowedIds.includes(book.id)) {
        return;
      }
      book.available -= 1;
      state.borrowedIds.push(book.id);
    },
    returnBook(state, action: PayloadAction<string>) {
      const book = state.items.find((item) => item.id === action.payload);
      if (!book || !state.borrowedIds.includes(book.id)) {
        return;
      }
      book.available += 1;
      state.borrowedIds = state.borrowedIds.filter((id) => id !== book.id);
    },
    setBorrowWarning(state, action: PayloadAction<string>) {
      state.borrowWarning = action.payload;
    },
    clearBorrowWarning(state) {
      state.borrowWarning = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBooksThunk.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooksThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string | undefined) ?? action.error.message ?? 'Đã xảy ra lỗi.';
      });
  },
});

export const { borrowBook, returnBook, setBorrowWarning, clearBorrowWarning } = booksSlice.actions;
export default booksSlice.reducer;
