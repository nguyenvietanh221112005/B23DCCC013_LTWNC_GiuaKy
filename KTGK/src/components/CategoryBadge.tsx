import { CATEGORY_SLUG, type BookCategory } from '../types/book';

export function CategoryBadge({ category }: { category: BookCategory }) {
  return <span className={`badge badge--${CATEGORY_SLUG[category]}`}>{category}</span>;
}
