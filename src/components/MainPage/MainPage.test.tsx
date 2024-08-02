import { render, fireEvent, screen, waitFor } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
import MainPage from './MainPage.tsx';
import SearchBox from '../SearchBox/SearchBox.tsx';
import ResultsBox from '../ResultsBox/ResultsBox.tsx';
import '@testing-library/jest-dom';
import { store } from '../../store/store.ts';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../context/ThemeContext.tsx';
// import mockRouter from '../../__mocks__/mockRouter.ts';
import { PlanetAPIResponse } from '../../types/types.ts';

jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));

jest.mock('../SearchBox/SearchBox.tsx');
jest.mock('../ResultsBox/ResultsBox.tsx');

const mockSearchBox = SearchBox as jest.MockedFunction<typeof SearchBox>;
const mockResultsBox = ResultsBox as jest.MockedFunction<typeof ResultsBox>;

const mockPlanetsData: PlanetAPIResponse = {
	results: [
		{
			name: 'Earth',
			terrain: 'Varied',
			population: '7 billion',
			id: '1',
			url: 'dfg',
			diameter: '12',
			gravity: '1',
			climate: 'qwe',
			orbital_period: '34',
			rotation_period: '45',
			surface_water: '56',
		},
		{
			name: 'Mars',
			terrain: 'Desert',
			population: '0',
			id: '2',
			url: 'dfg',
			diameter: '12',
			gravity: '1',
			climate: 'qwe',
			orbital_period: '34',
			rotation_period: '45',
			surface_water: '56',
		},
	],
	count: 2,
	next: 'nextPageUrl',
	previous: null,
};

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

		mockResultsBox.mockImplementation(({ onItemClick, onPageChange }) => (
			<div data-testid="mock-results-box">
				<div data-testid="result-item" onClick={() => onItemClick('1')}>
					Item 1
				</div>
				<button onClick={() => onPageChange && onPageChange(2)}>Next Page</button>
			</div>
		));
	});
	// mockRouter({ page: 1 });
});

const mockOnPageChange = jest.fn();

it('renders SearchBox and ResultsBox components', () => {
	render(
		<ThemeProvider>
			<Provider store={store}>
				<MainPage
					initialPlanets={mockPlanetsData}
					initialPage={1}
					onPageChange={mockOnPageChange}
				/>
			</Provider>
		</ThemeProvider>
	);

	expect(screen.getByTestId('mock-search-box')).toBeInTheDocument();
	expect(screen.getByTestId('mock-results-box')).toBeInTheDocument();
});

it('updates search term state on input change', () => {
	render(
		<ThemeProvider>
			<Provider store={store}>
				<MainPage
					initialPlanets={mockPlanetsData}
					initialPage={1}
					onPageChange={mockOnPageChange}
				/>
			</Provider>
		</ThemeProvider>
	);

	const input = screen.getByTestId('search-input');
	fireEvent.change(input, { target: { value: 'new term' } });
	expect(input).toHaveValue('new term');
});

it('shows details section when an item is clicked', async () => {
	render(
		<ThemeProvider>
			<Provider store={store}>
				<MainPage
					initialPlanets={mockPlanetsData}
					initialPage={1}
					onPageChange={mockOnPageChange}
				/>
			</Provider>
		</ThemeProvider>
	);

	const resultItem = screen.getByTestId('result-item');
	fireEvent.click(resultItem);

	await waitFor(() => {
		expect(screen.getByTestId('mock-results-box')).toBeInTheDocument();
	});
});
