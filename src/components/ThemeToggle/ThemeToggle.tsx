'use client';

import { useTheme } from '../../context/ThemeContext.tsx';

const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<div>
			<label>
				<input
					type="radio"
					name="theme"
					value="light"
					checked={theme === 'light'}
					onChange={toggleTheme}
				/>
				Light
			</label>
			<label>
				<input
					type="radio"
					name="theme"
					value="dark"
					checked={theme === 'dark'}
					onChange={toggleTheme}
				/>
				Dark
			</label>
		</div>
	);
};

export default ThemeToggle;
