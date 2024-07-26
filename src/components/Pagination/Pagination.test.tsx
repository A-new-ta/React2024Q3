import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';
import { ThemeProvider } from '../../context/ThemeContext.tsx';

describe('Pagination', () => {
	const onPageChange = jest.fn();

	const defaultProps = {
		currentPage: 1,
		totalPages: 5,
		onPageChange,
	};

	const renderComponent = (props = {}) => {
		return render(
			<ThemeProvider>
				<Pagination {...defaultProps} {...props} />
			</ThemeProvider>
		);
	};

	it('renders the correct number of pages', () => {
		renderComponent();
		const pageButtons = screen.getAllByRole('button');
		expect(pageButtons).toHaveLength(defaultProps.totalPages);
	});

	it('highlights the current page', () => {
		renderComponent({ currentPage: 3 });
		const activeButton = screen.getByText('3');
		expect(activeButton).toHaveClass('active');
	});

	it('calls onPageChange with the correct page number when a page is clicked', () => {
		renderComponent();
		const pageButton = screen.getByText('3');
		fireEvent.click(pageButton);
		expect(onPageChange).toHaveBeenCalledWith(3);
	});
});
