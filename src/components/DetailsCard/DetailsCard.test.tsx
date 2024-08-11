import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailsCard from './DetailsCard';
import { Provider } from 'react-redux';
import { store } from '../../store/store.ts';
import { useRouter } from 'next/navigation';
import { PlanetDetails } from '../../types/types.ts';
import { clearPlanetDetails } from '../../store/planetDetailsSlice.ts';

jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
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
		});

		store.dispatch(clearPlanetDetails());
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('dispatches setPlanetDetails when planetDetails prop is provided', () => {
		render(
			<Provider store={store}>
				<DetailsCard planetDetails={mockPlanetDetails} />
			</Provider>
		);

		const state = store.getState();
		expect(state.planetDetails.details).toEqual(mockPlanetDetails);
	});

	it('displays planet details when data is available', () => {
		render(
			<Provider store={store}>
				<DetailsCard planetDetails={mockPlanetDetails} />
			</Provider>
		);

		expect(screen.getByText(/planet 1/i)).toBeInTheDocument();
		expect(screen.getByText(/terrain 1/i)).toBeInTheDocument();
		expect(screen.getByText(/2000/i)).toBeInTheDocument();
		expect(screen.getByText(/temperate/i)).toBeInTheDocument();
	});

	it('displays an error message when planetDetails prop is not provided', () => {
		render(
			<Provider store={store}>
				<DetailsCard planetDetails={null} />
			</Provider>
		);

		expect(screen.getByText(/error loading planet details/i)).toBeInTheDocument();
	});

	it('navigates back to the main page when the close button is clicked', () => {
		render(
			<Provider store={store}>
				<DetailsCard planetDetails={mockPlanetDetails} />
			</Provider>
		);
		fireEvent.click(screen.getByText(/close/i));
		expect(mockPush).toHaveBeenCalledWith('/?');
		const state = store.getState();
		expect(state.planetDetails.details).toBeNull();
	});
});
