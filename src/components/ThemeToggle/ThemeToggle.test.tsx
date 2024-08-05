import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../../context/ThemeContext';

jest.mock('../../context/ThemeContext', () => ({
	useTheme: jest.fn(),
}));

describe('ThemeToggle', () => {
	it('renders light and dark theme options', () => {
		(useTheme as jest.Mock).mockReturnValue({
			theme: 'light',
			toggleTheme: jest.fn(),
		});

		render(<ThemeToggle />);

		expect(screen.getByLabelText('Light')).toBeInTheDocument();
		expect(screen.getByLabelText('Dark')).toBeInTheDocument();
	});

	it('checks dark theme option when theme is dark', () => {
		(useTheme as jest.Mock).mockReturnValue({
			theme: 'dark',
			toggleTheme: jest.fn(),
		});

		render(<ThemeToggle />);

		expect(screen.getByLabelText('Light')).not.toBeChecked();
		expect(screen.getByLabelText('Dark')).toBeChecked();
	});

	it('calls toggleTheme when a radio button is clicked', () => {
		const toggleTheme = jest.fn();
		(useTheme as jest.Mock).mockReturnValue({
			theme: 'light',
			toggleTheme,
		});

		render(<ThemeToggle />);

		fireEvent.click(screen.getByLabelText('Dark'));
		expect(toggleTheme).toHaveBeenCalled();
	});
});
