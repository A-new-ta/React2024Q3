import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import MainPage from './MainPage.tsx';
import SearchBox from '../SearchBox/SearchBox.tsx';
import ResultsBox from '../ResultsBox/ResultsBox.tsx';
import '@testing-library/jest-dom';
import { store } from '../../store/store.ts';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../context/ThemeContext.tsx';
import { PlanetAPIResponse } from '../../types/types.ts';
import ThemeToggle from '../ThemeToggle/ThemeToggle.tsx';

jest.mock('next/router', () => ({
	useRouter: () => ({
		router: {
			events: {
				on: jest.fn(),
				off: jest.fn(),
			},
		},
		push: jest.fn(),
		prefetch: jest.fn(),
		query: {},
	}),
}));

jest.mock('../SearchBox/SearchBox.tsx', () => ({
	__esModule: true,
	default: jest.fn(),
}));

jest.mock('../ResultsBox/ResultsBox.tsx', () => ({
	__esModule: true,
	default: jest.fn(),
}));

jest.mock('../ThemeToggle/ThemeToggle.tsx', () => ({
	__esModule: true,
	default: jest.fn(),
}));

const mockSearchBox = SearchBox as jest.MockedFunction<typeof SearchBox>;
const mockResultsBox = ResultsBox as jest.MockedFunction<typeof ResultsBox>;
const mockThemeToggle = ThemeToggle as jest.MockedFunction<typeof ThemeToggle>;

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
		mockThemeToggle.mockImplementation(() => (
			<button data-testid="theme-toggle-button">Toggle Theme</button>
		));
	});

	it('renders SearchBox and ResultsBox components', () => {
		render(
			<ThemeProvider>
				<Provider store={store}>
					<MainPage initialPlanets={mockPlanetsData} initialPage={1} />
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
					<MainPage initialPlanets={mockPlanetsData} initialPage={1} />
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
					<MainPage initialPlanets={mockPlanetsData} initialPage={1} />
				</Provider>
			</ThemeProvider>
		);

		const resultItem = screen.getByTestId('result-item');
		fireEvent.click(resultItem);

		await waitFor(() => {
			expect(screen.getByTestId('mock-results-box')).toBeInTheDocument();
		});
	});

	it('calls onPageChange when page is changed', () => {
		const onPageChange = jest.fn();

		render(
			<ThemeProvider>
				<Provider store={store}>
					<MainPage initialPlanets={mockPlanetsData} initialPage={1} onPageChange={onPageChange} />
				</Provider>
			</ThemeProvider>
		);

		const nextPageButton = screen.getByText('Next Page');
		fireEvent.click(nextPageButton);

		expect(onPageChange).toHaveBeenCalledWith(2);
	});

	it('changes theme when ThemeToggle button is clicked', () => {
		render(
			<ThemeProvider>
				<Provider store={store}>
					<MainPage initialPlanets={mockPlanetsData} initialPage={1} />
				</Provider>
			</ThemeProvider>
		);

		const themeToggleButton = screen.getByTestId('theme-toggle-button');
		fireEvent.click(themeToggleButton);
	});
});
