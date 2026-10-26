import type { ApiResponse } from '../types/api';
import type { Book } from '../types/book';
import { mockBooks } from './mockBooks';

const SIMULATED_DELAY_MS = 500;

export interface FetchBooksOptions {
  shouldFail?: boolean;
}

export function fetchBooks(options: FetchBooksOptions = {}): Promise<ApiResponse<Book[]>> {
  const { shouldFail = false } = options;

  return new Promise((resolve) => {
    setTimeout(() => {
      if (shouldFail) {
        resolve({ ok: false, error: 'Không thể kết nối tới máy chủ (mô phỏng)' });
        return;
      }
      resolve({ ok: true, data: mockBooks });
    }, SIMULATED_DELAY_MS);
  });
}
