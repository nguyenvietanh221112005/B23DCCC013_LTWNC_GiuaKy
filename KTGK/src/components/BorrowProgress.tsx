interface BorrowProgressProps {
  used: number;
  max: number;
  showLabel?: boolean;
}

export function BorrowProgress({ used, max, showLabel = false }: BorrowProgressProps) {
  const slots = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <div className="progress">
      <div
        className="progress__track"
        role="progressbar"
        aria-label="Số sách đang mượn"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={used}
      >
        {slots.map((slot) => (
          <span key={`slot-${slot}`} className={`progress__seg${slot <= used ? ' is-filled' : ''}`} />
        ))}
      </div>
      {showLabel && (
        <span className="progress__label mono">
          {used}/{max}
        </span>
      )}
    </div>
  );
}
