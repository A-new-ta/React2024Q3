import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../helpers/test-utils.tsx';
import ResultsBox from './ResultsBox.tsx';
import { ThemeProvider } from '../../context/ThemeContext.tsx';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));

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
	const mockPush = jest.fn();
	const mockOn = jest.fn();
	const mockOff = jest.fn();
	const mockOnItemClick = jest.fn();
	const mockOnCloseDetails = jest.fn();

	beforeEach(() => {
		(useRouter as jest.Mock).mockReturnValue({
			push: mockPush,
			query: { search: 'Earth', page: '1' },
			asPath: '/',
			events: {
				on: mockOn,
				off: mockOff,
			},
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('renders loading state', () => {
		renderWithProviders(
			<ThemeProvider>
				<ResultsBox
					searchTerm="Earth"
					onItemClick={jest.fn()}
					onCloseDetails={jest.fn()}
					initialPlanets={undefined}
				/>
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
		expect(screen.getByText('Nothing found')).toBeInTheDocument();
	});

	test('renders data', () => {
		renderWithProviders(
			<ThemeProvider>
				<ResultsBox
					searchTerm="Earth"
					onItemClick={jest.fn()}
					onCloseDetails={jest.fn()}
					initialPlanets={mockPlanetsData}
				/>
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

	test('renders empty state', () => {
		renderWithProviders(
			<ThemeProvider>
				<ResultsBox
					searchTerm="NonExistent"
					onItemClick={jest.fn()}
					onCloseDetails={jest.fn()}
					initialPlanets={{ results: [], count: 0, next: null, previous: null }}
				/>
			</ThemeProvider>,
			{
				preloadedState: {
					results: {
						loading: false,
						currentPageItems: [],
						selectedItems: {},
						count: 0,
						next: null,
						previous: null,
					},
				},
			}
		);

		expect(screen.getByText('Nothing found')).toBeInTheDocument();
	});

	test('calls onItemClick when a card is clicked', () => {
		renderWithProviders(
			<ThemeProvider>
				<ResultsBox
					searchTerm="Earth"
					onItemClick={mockOnItemClick}
					onCloseDetails={jest.fn()}
					initialPlanets={mockPlanetsData}
				/>
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

		const card = screen.getByText('Earth');
		fireEvent.click(card);
		expect(mockOnItemClick).toHaveBeenCalledWith('1');
	});

	test('calls onCloseDetails when container is clicked', () => {
		renderWithProviders(
			<ThemeProvider>
				<ResultsBox
					searchTerm="Earth"
					onItemClick={jest.fn()}
					onCloseDetails={mockOnCloseDetails}
					initialPlanets={mockPlanetsData}
				/>
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

		const container = screen.getByText('Earth').parentElement?.parentElement;
		if (container) {
			fireEvent.click(container);
			expect(mockOnCloseDetails).toHaveBeenCalled();
		}
	});

	test('navigates to the next page on page change', () => {
		renderWithProviders(
			<ThemeProvider>
				<ResultsBox
					searchTerm="Earth"
					onItemClick={jest.fn()}
					onCloseDetails={jest.fn()}
					initialPlanets={mockPlanetsData}
				/>
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

		const nextPageButton = screen.getByText('1');
		fireEvent.click(nextPageButton);
		expect(mockPush).toHaveBeenCalledWith({
			pathname: '/',
			query: { search: 'Earth', page: '1' },
		});
	});
});
