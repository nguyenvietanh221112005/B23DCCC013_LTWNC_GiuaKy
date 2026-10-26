import { RefreshIcon, WifiOffIcon } from './icons';

interface BooksErrorProps {
  message: string | null;
  onRetry: () => void;
}

export function BooksError({ message, onRetry }: BooksErrorProps) {
  return (
    <div className="card error-card" role="alert">
      <span className="error-card__icon">
        <WifiOffIcon size={18} />
      </span>
      <h2>Không tải được danh sách sách</h2>
      <p>Máy chủ thư viện không phản hồi. Vui lòng kiểm tra kết nối và thử lại sau ít phút.</p>
      <code>Lỗi: {message ?? 'Không xác định'}</code>
      <button type="button" className="btn btn--primary" onClick={onRetry}>
        <RefreshIcon size={14} />
        Thử lại
      </button>
    </div>
  );
}
