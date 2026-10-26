import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectBorrowWarning } from '../features/books/booksSelectors';
import { clearBorrowWarning } from '../features/books/booksSlice';
import { AlertIcon } from './icons';

const AUTO_DISMISS_MS = 3000;

export function BorrowWarning() {
  const warning = useAppSelector(selectBorrowWarning);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!warning) return;
    const timer = setTimeout(() => dispatch(clearBorrowWarning()), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [warning, dispatch]);

  if (!warning) return null;

  return (
    <div role="alert" className="toast">
      <AlertIcon size={18} />
      <span>{warning}</span>
    </div>
  );
}
