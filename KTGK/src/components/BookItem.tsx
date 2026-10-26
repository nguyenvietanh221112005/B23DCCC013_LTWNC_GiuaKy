import { memo } from 'react';
import type { Book } from '../types/book';
import { BookCover } from './BookCover';
import { CategoryBadge } from './CategoryBadge';

export interface BookItemProps {
  book: Book;
  isBorrowed: boolean;
  onBorrow: (id: string) => void;
}

function BookItemComponent({ book, isBorrowed, onBorrow }: BookItemProps) {
  const isOutOfStock = book.available <= 0;

  return (
    <li className={`card book-card${isOutOfStock ? ' book-card--out' : ''}`}>
      <BookCover book={book} />
      <div className="book-card__top">
        <CategoryBadge category={book.category} />
        <span className="book-card__year mono">{book.year}</span>
      </div>
      <h3 className="book-card__title">{book.title}</h3>
      <p className="book-card__author">{book.author}</p>
      <div className="book-card__footer">
        <div>
          <p className="book-card__label">Số bản còn lại</p>
          {isOutOfStock ? (
            <p className="book-card__stock book-card__stock--out mono">Hết bản</p>
          ) : (
            <p className="book-card__stock mono">{`${book.available} / ${book.total}`}</p>
          )}
        </div>
        {isBorrowed ? (
          <button type="button" className="btn" disabled>
            Đã mượn
          </button>
        ) : (
          <button
            type="button"
            className="btn btn--primary"
            disabled={isOutOfStock}
            onClick={() => onBorrow(book.id)}
          >
            Mượn
          </button>
        )}
      </div>
    </li>
  );
}

export const BookItem = memo(BookItemComponent);
