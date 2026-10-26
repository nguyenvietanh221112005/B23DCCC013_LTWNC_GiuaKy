import type { Book } from '../../types/book';
import booksReducer, { borrowBook, fetchBooksThunk, returnBook, type BooksState } from './booksSlice';

const sampleBooks: Book[] = [
  { id: 'b1', title: 'Sách 1', author: 'Tác giả A', category: 'CNTT', year: 2020, available: 2, total: 3 },
  { id: 'b2', title: 'Sách 2', author: 'Tác giả B', category: 'Kinh tế', year: 2019, available: 0, total: 2 },
];

function createState(overrides: Partial<BooksState> = {}): BooksState {
  return {
    items: sampleBooks.map((book) => ({ ...book })),
    status: 'succeeded',
    error: null,
    borrowedIds: [],
    borrowWarning: null,
    ...overrides,
  };
}

describe('booksSlice reducer', () => {
  it('borrowBook giảm số bản còn lại và thêm id vào borrowedIds', () => {
    const state = createState();
    const next = booksReducer(state, borrowBook('b1'));

    expect(next.items.find((book) => book.id === 'b1')?.available).toBe(1);
    expect(next.borrowedIds).toContain('b1');
  });

  it('borrowBook không thay đổi state khi sách đã hết bản', () => {
    const state = createState();
    const next = booksReducer(state, borrowBook('b2'));

    expect(next.items.find((book) => book.id === 'b2')?.available).toBe(0);
    expect(next.borrowedIds).not.toContain('b2');
  });

  it('returnBook tăng số bản còn lại và xoá id khỏi borrowedIds', () => {
    const state = createState({
      borrowedIds: ['b1'],
      items: sampleBooks.map((book) => (book.id === 'b1' ? { ...book, available: 1 } : { ...book })),
    });
    const next = booksReducer(state, returnBook('b1'));

    expect(next.items.find((book) => book.id === 'b1')?.available).toBe(2);
    expect(next.borrowedIds).not.toContain('b1');
  });

  it('returnBook không thay đổi state nếu sách đó không đang được mượn', () => {
    const state = createState();
    const next = booksReducer(state, returnBook('b1'));

    expect(next.items.find((book) => book.id === 'b1')?.available).toBe(2);
    expect(next.borrowedIds).toEqual([]);
  });

  it('fetchBooksThunk.pending chuyển status sang loading', () => {
    const state = createState({ status: 'idle' });
    const next = booksReducer(state, { type: fetchBooksThunk.pending.type });

    expect(next.status).toBe('loading');
  });

  it('fetchBooksThunk.fulfilled lưu danh sách sách và chuyển status sang succeeded', () => {
    const state = createState({ status: 'loading', items: [] });
    const next = booksReducer(state, {
      type: fetchBooksThunk.fulfilled.type,
      payload: sampleBooks,
    });

    expect(next.status).toBe('succeeded');
    expect(next.items).toHaveLength(2);
  });

  it('fetchBooksThunk.rejected lưu thông báo lỗi và chuyển status sang failed', () => {
    const state = createState({ status: 'loading' });
    const next = booksReducer(state, {
      type: fetchBooksThunk.rejected.type,
      payload: 'Lỗi tải dữ liệu',
      error: { message: 'Lỗi tải dữ liệu' },
    });

    expect(next.status).toBe('failed');
    expect(next.error).toBe('Lỗi tải dữ liệu');
  });
});
