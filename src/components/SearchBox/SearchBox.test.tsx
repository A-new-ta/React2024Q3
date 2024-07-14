import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBox from './SearchBox';

describe('SearchBox', () => {
	const defaultProps = {
		searchTerm: '',
		onSearch: jest.fn(),
	};

	const renderComponent = (props = {}) => {
		return render(<SearchBox {...defaultProps} {...props} />);
	};

	it('should update the input field when typed into', () => {
		renderComponent();
		const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
		fireEvent.change(input, { target: { value: 'new term' } });
		expect(input.value).toBe('new term');
	});

	it('should call onSearch with the correct trimmed term when search button is clicked', () => {
		const mockOnSearch = jest.fn();
		renderComponent({ onSearch: mockOnSearch });

		const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
		fireEvent.change(input, { target: { value: '  search term  ' } });

		const button = screen.getByText('Search');
		fireEvent.click(button);

		expect(mockOnSearch).toHaveBeenCalledWith('search term');
	});

	it('should update its internal state when the searchTerm prop changes', () => {
		const { rerender } = renderComponent({ searchTerm: 'initial term' });
		const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
		expect(input.value).toBe('initial term');

		rerender(<SearchBox {...defaultProps} searchTerm="updated term" />);
		expect(input.value).toBe('updated term');
	});
});
