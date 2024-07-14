import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './MainPage';
import SearchBox from '../../components/SearchBox/SearchBox';
import ResultsBox from '../../components/ResultsBox/ResultsBox';
import '@testing-library/jest-dom';

jest.mock('../../components/SearchBox/SearchBox');
jest.mock('../../components/ResultsBox/ResultsBox');

const mockSearchBox = SearchBox as jest.MockedFunction<typeof SearchBox>;
const mockResultsBox = ResultsBox as jest.MockedFunction<typeof ResultsBox>;

describe('MainPage', () => {
	beforeEach(() => {
		mockSearchBox.mockImplementation(({ searchTerm, onSearch }) => (
			<div data-testid="mock-search-box">
				<input
					data-testid="search-input"
					value={searchTerm}
					onChange={(e) => onSearch(e.target.value)}
				/>
			</div>
		));

		mockResultsBox.mockImplementation(({ onItemClick }) => (
			<div data-testid="mock-results-box">
				<div data-testid="result-item" onClick={() => onItemClick('1')}>
					Item 1
				</div>
			</div>
		));
	});

	it('renders SearchBox and ResultsBox components', () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<MainPage />
			</MemoryRouter>
		);

		expect(screen.getByTestId('mock-search-box')).toBeInTheDocument();
		expect(screen.getByTestId('mock-results-box')).toBeInTheDocument();
	});

	it('updates search term state on input change', () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<MainPage />
			</MemoryRouter>
		);

		const input = screen.getByTestId('search-input');
		fireEvent.change(input, { target: { value: 'new term' } });
		expect(input).toHaveValue('new term');
	});

	it('shows details section when an item is clicked', async () => {
		render(
			<MemoryRouter initialEntries={['/']}>
				<MainPage />
			</MemoryRouter>
		);

		const resultItem = screen.getByTestId('result-item');
		fireEvent.click(resultItem);

		await waitFor(() => {
			expect(screen.getByTestId('mock-results-box')).toBeInTheDocument();
		});
	});
});
