import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Book } from '../types/book';
import { BookItem } from './BookItem';

const book: Book = {
  id: 'b1',
  title: 'Clean Code',
  author: 'Robert C. Martin',
  category: 'CNTT',
  year: 2008,
  available: 2,
  total: 5,
};

describe('BookItem', () => {
  it('hiển thị đúng thông tin sách', () => {
    render(<BookItem book={book} isBorrowed={false} onBorrow={jest.fn()} />);

    expect(screen.getByRole('heading', { name: 'Clean Code' })).toBeInTheDocument();
    expect(screen.getByText('Robert C. Martin')).toBeInTheDocument();
    expect(screen.getByText('CNTT')).toBeInTheDocument();
    expect(screen.getByText('2008')).toBeInTheDocument();
    expect(screen.getByText('2 / 5')).toBeInTheDocument();
  });

  it('gọi onBorrow với đúng id khi bấm nút Mượn', async () => {
    const user = userEvent.setup();
    const onBorrow = jest.fn();
    render(<BookItem book={book} isBorrowed={false} onBorrow={onBorrow} />);

    await user.click(screen.getByRole('button', { name: 'Mượn' }));

    expect(onBorrow).toHaveBeenCalledTimes(1);
    expect(onBorrow).toHaveBeenCalledWith('b1');
  });

  it('nút Mượn bị vô hiệu hoá và hiện "Hết bản" khi sách đã hết bản', () => {
    render(<BookItem book={{ ...book, available: 0 }} isBorrowed={false} onBorrow={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'Mượn' })).toBeDisabled();
    expect(screen.getByText('Hết bản')).toBeInTheDocument();
  });

  it('hiện nút "Đã mượn" bị vô hiệu hoá khi sách đang được mượn', () => {
    render(<BookItem book={book} isBorrowed onBorrow={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'Đã mượn' })).toBeDisabled();
    expect(screen.queryByRole('button', { name: 'Mượn' })).toBeNull();
  });
});
