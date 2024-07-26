import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../helpers/test-utils.tsx';
import ResultsBox from './ResultsBox.tsx';
import { useGetPlanetsQuery } from '../../store/apiSlice.ts';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeContext.tsx';

// Mock the hook
jest.mock('../../store/apiSlice.ts');

const mockPlanetsData = {
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

describe('ResultsBox Component', () => {
	beforeEach(() => {
		(useGetPlanetsQuery as jest.Mock).mockReturnValue({
			data: mockPlanetsData,
			error: null,
			isFetching: true,
		});
	});

	test('renders loading state', () => {
		const history = createMemoryHistory();
		renderWithProviders(
			<ThemeProvider>
				<Router location={history.location} navigator={history}>
					<ResultsBox searchTerm="Earth" onItemClick={jest.fn()} onCloseDetails={jest.fn()} />
				</Router>
			</ThemeProvider>,
			{
				preloadedState: {
					results: {
						loading: true,
						currentPageItems: [],
						selectedItems: {},
						count: null,
						next: null,
						previous: null,
					},
				},
			}
		);
		expect(screen.getByText('Loading...')).toBeInTheDocument();
	});

	test('renders data', () => {
		(useGetPlanetsQuery as jest.Mock).mockReturnValue({
			data: mockPlanetsData,
			error: null,
			isFetching: false,
		});

		const history = createMemoryHistory();
		renderWithProviders(
			<ThemeProvider>
				<Router location={history.location} navigator={history}>
					<ResultsBox searchTerm="Earth" onItemClick={jest.fn()} onCloseDetails={jest.fn()} />
				</Router>
			</ThemeProvider>,
			{
				preloadedState: {
					results: {
						loading: false,
						currentPageItems: mockPlanetsData.results,
						selectedItems: {},
						count: 2,
						next: null,
						previous: null,
					},
				},
			}
		);

		expect(screen.getByText('Earth')).toBeInTheDocument();
		expect(screen.getByText('Mars')).toBeInTheDocument();
	});

	test('renders error state', () => {
		(useGetPlanetsQuery as jest.Mock).mockReturnValue({
			data: null,
			error: { message: 'Failed to fetch' },
			isFetching: false,
		});

		const history = createMemoryHistory();
		renderWithProviders(
			<ThemeProvider>
				<Router location={history.location} navigator={history}>
					<ResultsBox searchTerm="Earth" onItemClick={jest.fn()} onCloseDetails={jest.fn()} />
				</Router>
			</ThemeProvider>,
			{
				preloadedState: {
					results: {
						loading: false,
						currentPageItems: [],
						selectedItems: {},
						count: null,
						next: null,
						previous: null,
					},
				},
			}
		);

		expect(screen.getByText('Error loading data')).toBeInTheDocument();
	});

	test('renders empty state', () => {
		(useGetPlanetsQuery as jest.Mock).mockReturnValue({
			data: { results: [] },
			error: null,
			isFetching: false,
		});

		const history = createMemoryHistory();
		renderWithProviders(
			<ThemeProvider>
				<Router location={history.location} navigator={history}>
					<ResultsBox searchTerm="Earth" onItemClick={jest.fn()} onCloseDetails={jest.fn()} />
				</Router>
			</ThemeProvider>,
			{
				preloadedState: {
					results: {
						loading: false,
						currentPageItems: [],
						selectedItems: {},
						count: null,
						next: null,
						previous: null,
					},
				},
			}
		);

		expect(screen.getByText('Nothing found')).toBeInTheDocument();
	});
});
