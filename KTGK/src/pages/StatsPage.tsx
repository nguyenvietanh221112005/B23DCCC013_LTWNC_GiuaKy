import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { BorrowProgress } from '../components/BorrowProgress';
import { CategoryBadge } from '../components/CategoryBadge';
import { SpinnerIcon } from '../components/icons';
import { PageHeading } from '../components/PageHeading';
import { selectBooks, selectBooksStatus, selectBorrowedBooks } from '../features/books/booksSelectors';
import { MAX_BORROW_LIMIT } from '../features/books/booksSlice';
import { BOOK_CATEGORIES, CATEGORY_SLUG, type CategoryStat, type CategoryStats } from '../types/book';

const emptyStat = (): CategoryStat => ({ titles: 0, copies: 0, onShelf: 0 });

function StatsPage() {
  const books = useAppSelector(selectBooks);
  const status = useAppSelector(selectBooksStatus);
  const borrowedBooks = useAppSelector(selectBorrowedBooks);

  const stats = useMemo(() => {
    const byCategory: CategoryStats = {
      CNTT: emptyStat(),
      'Kinh tế': emptyStat(),
      'Ngoại ngữ': emptyStat(),
    };
    let totalCopies = 0;
    let onShelf = 0;

    books.forEach((book) => {
      const stat = byCategory[book.category];
      stat.titles += 1;
      stat.copies += book.total;
      stat.onShelf += book.available;
      totalCopies += book.total;
      onShelf += book.available;
    });

    const maxTitles = Math.max(1, ...BOOK_CATEGORIES.map((category) => byCategory[category].titles));
    const outOfStock = books.filter((book) => book.available === 0);

    return { byCategory, totalCopies, onShelf, maxTitles, outOfStock };
  }, [books]);

  const remaining = MAX_BORROW_LIMIT - borrowedBooks.length;

  return (
    <div>
      <PageHeading
        title="Thống kê"
        subtitle="Tổng quan kho sách của thư viện khoa và tình trạng mượn của bạn."
      />

      {status !== 'succeeded' && status !== 'failed' && (
        <p className="loading-label" role="status">
          <SpinnerIcon size={16} className="spin" />
          Đang tải...
        </p>
      )}

      <div className="stat-grid">
        <div className="card stat-card">
          <p className="stat-card__label">Tổng số đầu sách</p>
          <p className="stat-card__value mono">{books.length}</p>
          <p className="stat-card__hint">
            {stats.totalCopies} bản · {stats.onShelf} bản đang trên kệ
          </p>
        </div>
        <div className="card stat-card">
          <p className="stat-card__label">Sách bạn đang mượn</p>
          <p className="stat-card__value mono">
            {borrowedBooks.length} <span className="stat-card__of">/ {MAX_BORROW_LIMIT}</span>
          </p>
          <BorrowProgress used={borrowedBooks.length} max={MAX_BORROW_LIMIT} />
        </div>
        <div className="card stat-card">
          <p className="stat-card__label">Đầu sách đã hết bản</p>
          <p className="stat-card__value stat-card__value--danger mono">{stats.outOfStock.length}</p>
          <p className="stat-card__hint">
            {stats.outOfStock.length > 0
              ? stats.outOfStock.map((book) => book.title).join(', ')
              : 'Tất cả đầu sách đều còn bản'}
          </p>
        </div>
      </div>

      <div className="stats-layout">
        <section className="card category-card">
          <h2 className="card__title">Số đầu sách theo thể loại</h2>
          <p className="card__subtitle">Tổng {books.length} đầu sách</p>

          <ul className="bars">
            {BOOK_CATEGORIES.map((category) => {
              const { titles } = stats.byCategory[category];
              return (
                <li key={category} className="bar-row">
                  <span className="bar-row__label">{category}</span>
                  <span className="bar-row__track">
                    <span
                      className={`bar-row__fill bar--${CATEGORY_SLUG[category]}`}
                      style={{ width: `${(titles / stats.maxTitles) * 100}%` }}
                    />
                  </span>
                  <span className="bar-row__value mono">{titles}</span>
                </li>
              );
            })}
          </ul>

          <div className="table-wrap">
            <table className="stats-table">
              <thead>
                <tr>
                  <th scope="col">Thể loại</th>
                  <th scope="col">Đầu sách</th>
                  <th scope="col">Tổng bản</th>
                  <th scope="col">Còn trên kệ</th>
                </tr>
              </thead>
              <tbody>
                {BOOK_CATEGORIES.map((category) => {
                  const stat = stats.byCategory[category];
                  return (
                    <tr key={category}>
                      <td>{category}</td>
                      <td className="mono">{stat.titles}</td>
                      <td className="mono">{stat.copies}</td>
                      <td className="mono">{stat.onShelf}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="card side-panel">
          <h2 className="card__title">Đang mượn</h2>
          <p className="card__subtitle">
            {remaining > 0 ? `Còn ${remaining} lượt mượn` : 'Đã đạt giới hạn mượn'}
          </p>
          {borrowedBooks.length === 0 ? (
            <p className="empty-note">Bạn chưa mượn cuốn nào.</p>
          ) : (
            <ul className="borrowed-list">
              {borrowedBooks.map((book) => (
                <li key={book.id} className="borrowed-card">
                  <CategoryBadge category={book.category} />
                  <p className="borrowed-card__title">{book.title}</p>
                  <p className="borrowed-item__author">{book.author}</p>
                </li>
              ))}
            </ul>
          )}
          <Link to="/" className="btn btn--outline btn--block">
            Quay lại danh sách
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default StatsPage;
