import { create } from 'zustand';
import type { CategoryFilterValue } from '../../types/book';

interface FilterState {
  keyword: string;
  category: CategoryFilterValue;
  setKeyword: (keyword: string) => void;
  setCategory: (category: CategoryFilterValue) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  keyword: '',
  category: 'Tất cả',
  setKeyword: (keyword) => set({ keyword }),
  setCategory: (category) => set({ category }),
}));
