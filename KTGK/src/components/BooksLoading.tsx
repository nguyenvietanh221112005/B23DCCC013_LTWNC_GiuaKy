import { SpinnerIcon } from './icons';

const SKELETON_IDS = ['sk-1', 'sk-2', 'sk-3', 'sk-4', 'sk-5', 'sk-6', 'sk-7', 'sk-8'];

export function BooksLoading() {
  return (
    <div aria-busy="true">
      <p className="loading-label" role="status">
        <SpinnerIcon size={16} className="spin" />
        Đang tải...
      </p>
      <ul className="book-grid book-grid--wide" aria-hidden="true">
        {SKELETON_IDS.map((id) => (
          <li key={id} className="card book-card skeleton-card">
            <span className="sk sk--cover" />
            <div className="book-card__top">
              <span className="sk sk--badge" />
              <span className="sk sk--year" />
            </div>
            <span className="sk sk--title" />
            <span className="sk sk--author" />
            <div className="book-card__footer">
              <span className="sk sk--label" />
              <span className="sk sk--btn" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
