import { fireEvent, render, screen } from '@testing-library/react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import configureStore from 'redux-mock-store';
import Home, { getServerSideProps } from '../pages/index.tsx';
import { setCurrentPageItems } from '../store/resultsSlice.ts';
import { PlanetAPIResponse } from '../types/types.ts';
import { ThemeProvider } from '../context/ThemeContext';

jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));

jest.mock('react-redux', () => ({
	useDispatch: jest.fn(),
	useSelector: jest.fn(),
	Provider: jest.requireActual('react-redux').Provider,
}));

jest.mock('../store/resultsSlice.ts', () => ({
	setCurrentPageItems: jest.fn(),
}));

const mockStore = configureStore([]);

describe('Home Page', () => {
	let store;
	let dispatch;
	let mockRouterEvents;

	beforeAll(() => {
		global.URL.createObjectURL = jest.fn(() => 'mockedURL');
		global.URL.revokeObjectURL = jest.fn();
	});

	afterAll(() => {
		global.URL.createObjectURL.mockRestore();
		global.URL.revokeObjectURL.mockRestore();
	});
	beforeEach(() => {
		store = mockStore({});
		dispatch = jest.fn();
		mockRouterEvents = {
			on: jest.fn(),
			off: jest.fn(),
		};

		(useRouter as jest.Mock).mockReturnValue({
			push: jest.fn(),
			query: {},
			events: mockRouterEvents,
		});

		(useDispatch as jest.Mock).mockReturnValue(dispatch);
		(useSelector as jest.Mock).mockReturnValue({
			currentPageItems: [
				{
					name: 'Earth',
					terrain: 'Varied',
					population: '7 billion',
					id: '1',
					diameter: '12742',
					gravity: '1g',
					climate: 'Temperate',
					orbital_period: '365 days',
					rotation_period: '24 hours',
					surface_water: '71%',
					url: 'https://swapi.dev/api/planets/1/',
				},
			],
			selectedItems: [],
			count: 1,
		});
	});

	it('should render and dispatch initial planets', () => {
		const initialPlanets: PlanetAPIResponse = {
			results: [{ name: 'Earth', id: '1', terrain: 'Varied', population: '7 billion' }],
			count: 1,
			next: null,
			previous: null,
		};

		render(
			<Provider store={store}>
				<ThemeProvider>
					<Home initialPlanets={initialPlanets} initialPage={1} />
				</ThemeProvider>
			</Provider>
		);

		expect(screen.getByText('Earth')).toBeInTheDocument();
		expect(dispatch).toHaveBeenCalledWith(setCurrentPageItems(initialPlanets));
		expect(mockRouterEvents.on).toHaveBeenCalledWith('routeChangeStart', expect.any(Function));
		expect(mockRouterEvents.on).toHaveBeenCalledWith('routeChangeComplete', expect.any(Function));
		expect(mockRouterEvents.on).toHaveBeenCalledWith('routeChangeError', expect.any(Function));
	});

	it('should handle page change', () => {
		const initialPlanets: PlanetAPIResponse = {
			results: [{ name: 'Earth', id: '1', terrain: 'Varied', population: '7 billion' }],
			count: 1,
			next: null,
			previous: null,
		};

		const pushMock = jest.fn();
		(useRouter as jest.Mock).mockReturnValue({
			push: pushMock,
			query: {},
			events: mockRouterEvents,
		});

		render(
			<Provider store={store}>
				<ThemeProvider>
					<Home initialPlanets={initialPlanets} initialPage={1} />
				</ThemeProvider>
			</Provider>
		);

		const mainPage = screen.getByText('Earth').closest('div');
		mainPage && fireEvent.click(mainPage);

		expect(pushMock).toHaveBeenCalledWith({
			pathname: '/details/1',
			query: { search: '', page: '1' },
		});
		expect(mockRouterEvents.on).toHaveBeenCalledWith('routeChangeStart', expect.any(Function));
		expect(mockRouterEvents.on).toHaveBeenCalledWith('routeChangeComplete', expect.any(Function));
		expect(mockRouterEvents.on).toHaveBeenCalledWith('routeChangeError', expect.any(Function));
	});
});

describe('getServerSideProps', () => {
	beforeEach(() => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () =>
					Promise.resolve({
						results: [{ name: 'Earth', url: 'https://swapi.dev/api/planets/1/' }],
						count: 1,
						next: null,
						previous: null,
					}),
			})
		);
	});

	it('fetches planet data and returns props', async () => {
		const context = { query: { search: '', page: '1' } };
		const response = await getServerSideProps(context as never);

		expect(response).toEqual({
			props: {
				initialPlanets: {
					results: [
						{
							name: 'Earth',
							terrain: undefined,
							population: undefined,
							id: '1',
							diameter: undefined,
							gravity: undefined,
							climate: undefined,
							orbital_period: undefined,
							rotation_period: undefined,
							surface_water: undefined,
							url: 'https://swapi.dev/api/planets/1/',
						},
					],
					count: 1,
					next: null,
					previous: null,
				},
				initialPage: 1,
			},
		});

		expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets/?search=&page=1');
	});
});
