export type BookCategory = 'CNTT' | 'Kinh tế' | 'Ngoại ngữ';

export interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  year: number;
  available: number;
  total: number;
}

export const BOOK_CATEGORIES: BookCategory[] = ['CNTT', 'Kinh tế', 'Ngoại ngữ'];

export type CategoryFilterValue = 'Tất cả' | BookCategory;

export const CATEGORY_SLUG: Record<BookCategory, string> = {
  CNTT: 'it',
  'Kinh tế': 'econ',
  'Ngoại ngữ': 'lang',
};

export interface CategoryStat {
  titles: number;
  copies: number;
  onShelf: number;
}

export type CategoryStats = Record<BookCategory, CategoryStat>;

export type BookSearchFields = Pick<Book, 'title' | 'author'>;

export function matchesKeyword(book: BookSearchFields, normalizedKeyword: string): boolean {
  if (normalizedKeyword.length === 0) return true;
  return (
    book.title.toLowerCase().includes(normalizedKeyword) ||
    book.author.toLowerCase().includes(normalizedKeyword)
  );
}
