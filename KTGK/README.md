# Mini Library

Ứng dụng tra cứu và mượn/trả sách của thư viện khoa — React + TypeScript + Vite.

## Chạy dự án

```bash
npm install
npm run dev      # dev server (http://localhost:5173)
npm test         # Jest + React Testing Library
npm run lint     # ESLint
npm run build    # type-check (tsc -b) + build production
```

Giả lập API lỗi: mở `http://localhost:5173/?fail`, sau đó bấm **Thử lại** (lần gọi lại không truyền `shouldFail` nên sẽ thành công).

## Chức năng

- Tải danh sách sách từ API giả lập (trễ 500ms): hiển thị "Đang tải..." kèm skeleton, hiển thị thẻ lỗi khi API thất bại
- Mỗi thẻ sách: tên, tác giả, thể loại, năm xuất bản, số bản còn lại / tổng số bản
- Tìm theo tên hoặc tác giả (không phân biệt hoa thường), debounce 300ms
- Lọc theo thể loại: Tất cả / CNTT / Kinh tế / Ngoại ngữ (chip kèm số đầu sách)
- Mượn: số bản còn lại giảm 1; nút "Mượn" bị vô hiệu hoá khi hết bản, hiện "Đã mượn" với cuốn đang mượn
- Trả: cột "Sách bạn đang mượn" liệt kê các cuốn đang mượn kèm nút "Trả"; trả xong số bản còn lại tăng 1
- Tối đa 3 cuốn cùng lúc; mượn cuốn thứ 4 bị chặn và hiện cảnh báo (toast)
- Chuyển giao diện sáng / tối
- Trang Thống kê `/stats`: tổng số đầu sách, số đầu sách theo thể loại (biểu đồ + bảng), sách đang mượn, đầu sách đã hết bản

## Cấu trúc thư mục (feature-based)

```
src/
├── api/
│   ├── booksApi.ts              # API giả lập: Promise + setTimeout 500ms, tham số shouldFail
│   └── mockBooks.ts             # dữ liệu mẫu (10 đầu sách)
├── app/
│   ├── store.ts                 # configureStore + middleware, RootState, AppDispatch
│   ├── hooks.ts                 # useAppDispatch / useAppSelector
│   └── borrowLimitMiddleware.ts # middleware tự viết: giới hạn mượn 3 cuốn
├── types/
│   ├── api.ts                   # ApiResponse<T> (discriminated union) + type guard isApiSuccess
│   └── book.ts                  # Book, BookCategory, CategoryStats, BookSearchFields, matchesKeyword
├── hooks/useDebounce.ts         # useDebounce<T>
├── features/
│   ├── books/
│   │   ├── booksSlice.ts        # createSlice + createAsyncThunk
│   │   └── booksSelectors.ts    # selector + createSelector
│   ├── filters/useFilterStore.ts   # Zustand: từ khoá + thể loại
│   └── theme/
│       ├── themeContext.ts      # createContext<ThemeContextValue | null>(null)
│       ├── ThemeContext.tsx     # ThemeProvider (value bọc useMemo)
│       └── useTheme.ts          # custom hook useTheme
├── components/
│   ├── AppHeader.tsx, ThemeToggle.tsx, PageHeading.tsx, icons.tsx
│   ├── SearchBar.tsx, CategoryFilter.tsx
│   ├── BookList.tsx, BookItem.tsx, CategoryBadge.tsx
│   ├── BorrowedPanel.tsx, BorrowedItem.tsx, BorrowProgress.tsx, BorrowWarning.tsx
│   └── BooksLoading.tsx, BooksError.tsx
├── pages/
│   ├── HomePage.tsx             # route /
│   └── StatsPage.tsx            # route /stats (React.lazy)
└── test/                        # setupTests.ts (jest-dom), styleMock.js
```

## Đối chiếu nội dung các buổi học

| Buổi | Áp dụng | Vị trí |
| --- | --- | --- |
| 1 — TS nâng cao | Generic `ApiResponse<T>`, `useDebounce<T>`, `createAsyncThunk<Book[], FetchBooksOptions \| undefined>`; `ApiResponse<T>` là discriminated union theo `ok`; custom type guard `isApiSuccess` (`response is ApiSuccess<T>`) và `book is Book`; utility types `Record`, `Pick`, `Partial`, `ReturnType`; union literal `BookCategory`, `AsyncStatus`; không dùng `any` | `types/`, `api/booksApi.ts`, `features/books/`, `app/store.ts` |
| 2 — Custom hook | `useDebounce<T>` (generic, không phụ thuộc UI, test độc lập bằng `renderHook`); `useTheme` ném lỗi khi dùng ngoài Provider | `hooks/`, `features/theme/useTheme.ts` |
| 3 — Redux Toolkit | `createSlice` + `PayloadAction`, Immer; `createAsyncThunk` xử lý pending / fulfilled / rejected (`rejectWithValue`); `status: 'idle' \| 'loading' \| 'succeeded' \| 'failed'`; `RootState`, `AppDispatch` suy ra từ store; typed hooks; `createSelector`; thư mục feature-based | `app/`, `features/books/` |
| 4 — Zustand, Context, middleware | Zustand `create<FilterState>()` cho bộ lọc, đọc bằng selector; Context riêng cho theme, `createContext<T \| null>(null)`, value bọc `useMemo`, `toggleTheme` bọc `useCallback`; middleware tự viết `storeApi => next => action`, dùng `borrowBook.match(action)`, nối bằng `getDefaultMiddleware().concat(...)` | `features/filters/`, `features/theme/`, `app/borrowLimitMiddleware.ts` |
| 5 — Hiệu năng | `useMemo` cho danh sách sau lọc, số đếm thể loại, số liệu thống kê; `React.memo` cho `BookItem`, `BorrowedItem`; handler truyền xuống bọc `useCallback`; key = `book.id`; debounce 300ms; `React.lazy` + `Suspense` cho trang `/stats` (tách chunk riêng khi build) | `components/`, `pages/`, `App.tsx` |
| 6 — Kiểm thử | Jest `preset: 'ts-jest'`, `testEnvironment: 'jsdom'`, `setupFilesAfterEnv`; test reducer gọi trực tiếp; RTL + `userEvent.setup()`; query `getByRole` → `getByText`, `queryByRole` + `toBeNull`; `jest.fn()` + `toHaveBeenCalledWith`; fake timers (`useFakeTimers`, `advanceTimersByTime`); `renderHook` + `act`; store mới cho mỗi test middleware; mẫu AAA | `*.test.ts(x)`, `jest.config.cjs`, `src/test/` |

## Kiểm thử (16 test)

| File | Nội dung |
| --- | --- |
| `features/books/booksSlice.test.ts` | 7 test reducer: mượn / trả, mượn khi hết bản, trả cuốn không mượn, 3 trạng thái `fetchBooksThunk` |
| `components/BookItem.test.tsx` | 4 test RTL + userEvent: hiển thị đúng thông tin, click "Mượn" gọi đúng id, disabled + "Hết bản" khi hết bản, "Đã mượn" khi đang mượn |
| `components/BorrowedItem.test.tsx` | click "Trả" gọi `onReturn` đúng id |
| `hooks/useDebounce.test.ts` | fake timers + `renderHook`: giá trị chỉ đổi sau 300ms |
| `app/borrowLimitMiddleware.test.ts` | middleware chặn cuốn thứ 4 và đặt cảnh báo |
| `api/booksApi.test.ts` | 2 test: trả `{ ok: true, data }` và `{ ok: false, error }` khi `shouldFail` |
