import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectBorrowedCount } from '../features/books/booksSelectors';
import { MAX_BORROW_LIMIT } from '../features/books/booksSlice';
import { BookIcon } from './icons';
import { ThemeToggle } from './ThemeToggle';

const navClass = ({ isActive }: { isActive: boolean }) => `nav__link${isActive ? ' is-active' : ''}`;

export function AppHeader() {
  const borrowedCount = useAppSelector(selectBorrowedCount);

  return (
    <header className="app-header">
      <div className="container app-header__inner">
        <Link to="/" className="brand">
          <span className="brand__logo">
            <BookIcon size={16} />
          </span>
          <span className="brand__text">
            <span className="brand__name">Mini Library</span>
            <span className="brand__sub">Thư viện khoa</span>
          </span>
        </Link>
        <nav className="nav" aria-label="Điều hướng chính">
          <NavLink to="/" end className={navClass}>
            Danh sách sách
          </NavLink>
          <NavLink to="/stats" className={navClass}>
            Thống kê
          </NavLink>
        </nav>
        <span className="borrow-pill">
          Đang mượn{' '}
          <strong className="mono">
            {borrowedCount}/{MAX_BORROW_LIMIT}
          </strong>
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
