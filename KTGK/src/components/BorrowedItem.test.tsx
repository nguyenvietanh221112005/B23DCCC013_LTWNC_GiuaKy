import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Book } from '../types/book';
import { BorrowedItem } from './BorrowedItem';

const book: Book = {
  id: 'b7',
  title: 'Marketing căn bản',
  author: 'Philip Kotler',
  category: 'Kinh tế',
  year: 2007,
  available: 1,
  total: 4,
};

describe('BorrowedItem', () => {
  it('gọi onReturn với đúng id khi bấm nút Trả', async () => {
    const user = userEvent.setup();
    const onReturn = jest.fn();
    render(<BorrowedItem book={book} onReturn={onReturn} />);

    await user.click(screen.getByRole('button', { name: /Trả/ }));

    expect(onReturn).toHaveBeenCalledWith('b7');
  });
});
