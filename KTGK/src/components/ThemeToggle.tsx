import { useTheme } from '../features/theme/useTheme';
import { MoonIcon, SunIcon } from './icons';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="icon-btn"
      aria-label={isLight ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng'}
      title={isLight ? 'Giao diện tối' : 'Giao diện sáng'}
    >
      {isLight ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
