import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

const TestComponent: React.FC = () => {
	const { theme, toggleTheme } = useTheme();
	return (
		<div>
			<p data-testid="theme-text">{theme}</p>
			<button onClick={toggleTheme}>Toggle Theme</button>
		</div>
	);
};

describe('ThemeContext', () => {
	beforeEach(() => {
		localStorage.clear();
		document.body.className = '';
	});

	test('provides initial theme from localStorage', () => {
		localStorage.setItem('theme', 'dark');
		render(
			<ThemeProvider>
				<TestComponent />
			</ThemeProvider>
		);
		expect(screen.getByTestId('theme-text').textContent).toBe('dark');
		expect(document.body.className).toBe('dark');
	});

	test('defaults to light theme if no theme is in localStorage', () => {
		render(
			<ThemeProvider>
				<TestComponent />
			</ThemeProvider>
		);
		expect(screen.getByTestId('theme-text').textContent).toBe('light');
		expect(document.body.className).toBe('light');
	});

	test('toggles theme from light to dark and vice versa', () => {
		render(
			<ThemeProvider>
				<TestComponent />
			</ThemeProvider>
		);
		const themeText = screen.getByTestId('theme-text');
		const button = screen.getByText('Toggle Theme');

		expect(themeText.textContent).toBe('light');
		expect(document.body.className).toBe('light');

		fireEvent.click(button);
		expect(themeText.textContent).toBe('dark');
		expect(document.body.className).toBe('dark');
		expect(localStorage.getItem('theme')).toBe('dark');

		fireEvent.click(button);
		expect(themeText.textContent).toBe('light');
		expect(document.body.className).toBe('light');
		expect(localStorage.getItem('theme')).toBe('light');
	});

	test('throws error when useTheme is used outside of ThemeProvider', () => {
		const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

		expect(() => render(<TestComponent />)).toThrowError(
			'useTheme must be used within a ThemeProvider'
		);

		consoleError.mockRestore();
	});
});
