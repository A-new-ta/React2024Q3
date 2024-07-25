import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Flyout from './Flyout';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import resultsReducer, { selectItem } from '../../store/resultsSlice';
import { downloadCSV } from '../../helpers/csvHelper';
import React from 'react';
import { PlanetDetails } from '../../types/types.ts';
import { ThemeProvider } from '../../context/ThemeContext.tsx';

// Mock the downloadCSV function
jest.mock('../../helpers/csvHelper', () => ({
	downloadCSV: jest.fn(() => 'mockedURL'),
}));

// Mock URL methods
beforeAll(() => {
	global.URL.createObjectURL = jest.fn(() => 'mockedURL');
	global.URL.revokeObjectURL = jest.fn();
});

// Create a mock store with initial state
const store = configureStore({
	reducer: {
		results: resultsReducer,
	},
});

const renderWithProviders = (ui: React.ReactElement) => {
	return render(
		<ThemeProvider>
			<Provider store={store}>{ui}</Provider>
		</ThemeProvider>
	);
};

describe('Flyout Component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders null when no items are selected', () => {
		renderWithProviders(
			<ThemeProvider>
				<Flyout />
			</ThemeProvider>
		);
		expect(screen.queryByText(/items are selected/i)).toBeNull();
		expect(screen.queryByText(/unselect all/i)).toBeNull();
		expect(screen.queryByText(/download/i)).toBeNull();
	});

	it('renders correctly with selected items', () => {
		const mockPlanet: PlanetDetails = {
			name: 'Planet A',
			terrain: 'Unknown',
			population: 'Unknown',
			climate: 'Unknown',
			orbital_period: 'Unknown',
			rotation_period: 'Unknown',
			surface_water: 'Unknown',
			diameter: 'Unknown',
			gravity: 'Unknown',
			url: 'http://example.com',
			id: '1',
		};
		store.dispatch(selectItem(mockPlanet));
		renderWithProviders(
			<ThemeProvider>
				<Flyout />
			</ThemeProvider>
		);

		screen.debug();
		expect(screen.getByText(/1 items are selected/i)).toBeInTheDocument();
		expect(screen.getByText(/unselect all/i)).toBeInTheDocument();
		expect(screen.getByText(/download/i)).toBeInTheDocument();
	});

	it('calls unselectItem for all selected items when "Unselect all" is clicked', async () => {
		const mockPlanet1: PlanetDetails = {
			name: 'Planet A',
			terrain: 'Unknown',
			population: 'Unknown',
			climate: 'Unknown',
			orbital_period: 'Unknown',
			rotation_period: 'Unknown',
			surface_water: 'Unknown',
			diameter: 'Unknown',
			gravity: 'Unknown',
			url: 'http://example.com',
			id: '1',
		};
		const mockPlanet2: PlanetDetails = {
			name: 'Planet B',
			terrain: 'Unknown',
			population: 'Unknown',
			climate: 'Unknown',
			orbital_period: 'Unknown',
			rotation_period: 'Unknown',
			surface_water: 'Unknown',
			diameter: 'Unknown',
			gravity: 'Unknown',
			url: 'http://example.com',
			id: '2',
		};
		store.dispatch(selectItem(mockPlanet1));
		store.dispatch(selectItem(mockPlanet2));
		renderWithProviders(
			<ThemeProvider>
				<Flyout />
			</ThemeProvider>
		);

		const unselectButton = screen.getByText(/unselect all/i);
		fireEvent.click(unselectButton);

		await waitFor(() => {
			expect(store.getState().results.selectedItems).toEqual({});
		});
	});

	it('creates a download URL when items are selected', async () => {
		const mockPlanet: PlanetDetails = {
			name: 'Planet A',
			terrain: 'Unknown',
			population: 'Unknown',
			climate: 'Unknown',
			orbital_period: 'Unknown',
			rotation_period: 'Unknown',
			surface_water: 'Unknown',
			diameter: 'Unknown',
			gravity: 'Unknown',
			url: 'http://example.com',
			id: '1',
		};
		store.dispatch(selectItem(mockPlanet));
		renderWithProviders(
			<ThemeProvider>
				<Flyout />
			</ThemeProvider>
		);

		await waitFor(() => {
			expect(downloadCSV).toHaveBeenCalledWith([mockPlanet]);
			expect(screen.getByText(/download/i).closest('a')).toHaveAttribute('href', 'mockedURL');
		});
	});
});
