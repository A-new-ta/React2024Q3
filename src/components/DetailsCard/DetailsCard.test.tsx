import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailsCard from './DetailsCard';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from '../../store/store.ts';
import { ThemeProvider } from '../../context/ThemeContext.tsx';
import { useRouter } from 'next/router';
import { PlanetDetails } from '../../types/types.ts';

jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}));

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: jest.fn(),
}));

const mockPlanetDetails: PlanetDetails = {
	name: 'Planet 1',
	terrain: 'terrain 1',
	population: '2000',
	climate: 'temperate',
	orbital_period: '365',
	rotation_period: '24',
	surface_water: '40',
	diameter: '10000',
	gravity: '1 standard',
	url: 'http://example.com/1',
	id: '1',
};

describe('DetailsCard', () => {
	const mockPush = jest.fn();

	beforeEach(() => {
		(useRouter as jest.Mock).mockReturnValue({
			push: mockPush,
			query: {},
			asPath: '/',
			events: {
				on: jest.fn(),
				off: jest.fn(),
			},
		});

		(useSelector as jest.Mock).mockImplementation((selectorFn: (state: RootState) => never) => {
			return selectorFn({
				planetDetails: {
					details: mockPlanetDetails,
				},
			} as RootState);
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('displays the loading indicator while data is loading', () => {
		(useSelector as jest.Mock).mockImplementationOnce((selectorFn: (state: RootState) => never) => {
			return selectorFn({
				planetDetails: {
					details: null,
				},
			} as RootState);
		});

		render(
			<ThemeProvider>
				<Provider store={store}>
					<DetailsCard />
				</Provider>
			</ThemeProvider>
		);

		expect(screen.getByText(/loading.../i)).toBeInTheDocument();
	});

	it('displays planet details when data is available', () => {
		render(
			<ThemeProvider>
				<Provider store={store}>
					<DetailsCard />
				</Provider>
			</ThemeProvider>
		);

		expect(screen.getByText(/planet 1/i)).toBeInTheDocument();
		expect(screen.getByText(/terrain:/i)).toBeInTheDocument();
		expect(screen.getByText(/terrain 1/i)).toBeInTheDocument();
		expect(screen.getByText(/population:/i)).toBeInTheDocument();
		expect(screen.getByText(/2000/i)).toBeInTheDocument();
		expect(screen.getByText(/climate:/i)).toBeInTheDocument();
		expect(screen.getByText(/temperate/i)).toBeInTheDocument();
		expect(screen.getByText(/orbital period:/i)).toBeInTheDocument();
		expect(screen.getByText(/365/i)).toBeInTheDocument();
	});

	it('displays an error message when planet details are not available', () => {
		(useSelector as jest.Mock).mockImplementationOnce((selectorFn: (state: RootState) => never) => {
			return selectorFn({
				planetDetails: {
					details: null,
				},
			} as RootState);
		});

		render(
			<ThemeProvider>
				<Provider store={store}>
					<DetailsCard />
				</Provider>
			</ThemeProvider>
		);

		expect(screen.getByText(/error loading planet details/i)).toBeInTheDocument();
	});

	it('navigates back to the main page when the close button is clicked', () => {
		render(
			<ThemeProvider>
				<Provider store={store}>
					<DetailsCard />
				</Provider>
			</ThemeProvider>
		);

		fireEvent.click(screen.getByText(/close/i));
		expect(mockPush).toHaveBeenCalledWith('/');
	});
});
