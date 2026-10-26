import { memo } from 'react';
import type { Book } from '../types/book';

interface BorrowedItemProps {
  book: Book;
  onReturn: (id: string) => void;
}

function BorrowedItemComponent({ book, onReturn }: BorrowedItemProps) {
  return (
    <li className="borrowed-item">
      <div className="borrowed-item__info">
        <p className="borrowed-item__title">{book.title}</p>
        <p className="borrowed-item__author">{book.author}</p>
      </div>
      <button
        type="button"
        className="btn btn--outline btn--sm"
        onClick={() => onReturn(book.id)}
        aria-label={`Trả ${book.title}`}
      >
        Trả
      </button>
    </li>
  );
}

export const BorrowedItem = memo(BorrowedItemComponent);
