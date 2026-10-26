import { CATEGORY_SLUG, type Book } from '../types/book';

const VARIANT_COUNT = 3;

function coverVariant(id: string): number {
  let hash = 0;
  for (const char of id) hash = (hash + char.charCodeAt(0)) % VARIANT_COUNT;
  return hash;
}

export function BookCover({ book }: { book: Pick<Book, 'id' | 'title' | 'category'> }) {
  const className = `cover cover--${CATEGORY_SLUG[book.category]} cover--v${coverVariant(book.id)}`;

  return (
    <div className="cover-frame" aria-hidden="true">
      <div className={className}>
        <span className="cover__spine" />
        <span className="cover__rule" />
        <span className="cover__title">{book.title}</span>
        <span className="cover__brand">Mini Library</span>
      </div>
    </div>
  );
}
