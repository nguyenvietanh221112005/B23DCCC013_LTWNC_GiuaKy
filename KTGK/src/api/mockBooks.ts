import type { Book } from '../types/book';

export const mockBooks: Book[] = [
  { id: 'b01', title: 'Clean Code', author: 'Robert C. Martin', category: 'CNTT', year: 2008, available: 3, total: 5 },
  { id: 'b02', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'CNTT', year: 2009, available: 0, total: 3 },
  { id: 'b03', title: 'Cấu trúc dữ liệu và giải thuật', author: 'Đỗ Xuân Lôi', category: 'CNTT', year: 2006, available: 3, total: 4 },
  { id: 'b04', title: 'Design Patterns', author: 'Erich Gamma', category: 'CNTT', year: 1994, available: 1, total: 2 },
  { id: 'b05', title: 'Kinh tế học vi mô', author: 'N. Gregory Mankiw', category: 'Kinh tế', year: 2014, available: 4, total: 6 },
  { id: 'b06', title: 'Nguyên lý kế toán', author: 'Võ Văn Nhị', category: 'Kinh tế', year: 2018, available: 3, total: 3 },
  { id: 'b07', title: 'Marketing căn bản', author: 'Philip Kotler', category: 'Kinh tế', year: 2007, available: 2, total: 4 },
  { id: 'b08', title: 'English Grammar in Use', author: 'Raymond Murphy', category: 'Ngoại ngữ', year: 2019, available: 5, total: 8 },
  { id: 'b09', title: 'Giáo trình Hán ngữ 1', author: 'Trần Thị Thanh Liêm', category: 'Ngoại ngữ', year: 2016, available: 2, total: 5 },
  { id: 'b10', title: 'Minna no Nihongo Sơ cấp 1', author: '3A Corporation', category: 'Ngoại ngữ', year: 2012, available: 0, total: 4 },
];
