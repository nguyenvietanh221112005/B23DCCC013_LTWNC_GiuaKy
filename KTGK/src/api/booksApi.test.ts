import { isApiSuccess } from '../types/api';
import { fetchBooks } from './booksApi';

describe('booksApi.fetchBooks', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('trả về { ok: true, data } sau 500ms', async () => {
    const promise = fetchBooks();
    jest.advanceTimersByTime(500);
    const response = await promise;

    expect(isApiSuccess(response)).toBe(true);
    if (isApiSuccess(response)) expect(response.data.length).toBeGreaterThan(0);
  });

  it('trả về { ok: false, error } khi shouldFail = true', async () => {
    const promise = fetchBooks({ shouldFail: true });
    jest.advanceTimersByTime(500);
    const response = await promise;

    expect(isApiSuccess(response)).toBe(false);
    if (!isApiSuccess(response)) expect(response.error).toBeTruthy();
  });
});
