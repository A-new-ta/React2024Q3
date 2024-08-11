import { screen } from '@testing-library/react';
import Home from '../app/page.tsx';
import { fetchPlanetDetails, fetchPlanets } from '../services/api';
import { renderWithProvidersNext } from '../helpers/test-utils.tsx';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
}));
jest.mock('../services/api.ts', () => ({
	fetchPlanets: jest.fn(),
	fetchPlanetDetails: jest.fn(),
}));

const mockPlanetsData = {
	results: [
		{ name: 'Earth', id: '1', terrain: 'Varied', population: '7 billion' },
		{ name: 'Mars', id: '2', terrain: 'Desert', population: '0' },
	],
	count: 2,
	next: null,
	previous: null,
};

const mockPlanetDetails = {
	name: 'Earth',
	id: '1',
	terrain: 'Varied',
	population: '7 billion',
	climate: 'Temperate',
	gravity: '1g',
	diameter: '12742',
	orbital_period: '365 days',
	rotation_period: '24 hours',
	surface_water: '71%',
};

describe('Home Page Component', () => {
	beforeEach(() => {
		(useRouter as jest.Mock).mockReturnValue({
			push: jest.fn(),
			query: { search: 'Earth', page: '1' },
			pathname: '/',
			asPath: '/',
			route: '/',
			events: {
				on: jest.fn(),
				off: jest.fn(),
			},
		});

		(fetchPlanets as jest.Mock).mockResolvedValue(mockPlanetsData);
		(fetchPlanetDetails as jest.Mock).mockResolvedValue(mockPlanetDetails);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders without planet details if no id is provided', async () => {
		const searchParams = { search: 'Mars', page: '2' };

		renderWithProvidersNext(await Home({ searchParams }));

		expect(fetchPlanets).toHaveBeenCalledWith('Mars', 2);
		expect(fetchPlanetDetails).not.toHaveBeenCalled();

		expect(screen.getByText('Mars')).toBeInTheDocument();
	});

	it('handles empty search parameters', async () => {
		const searchParams = {};

		renderWithProvidersNext(await Home({ searchParams }));

		expect(fetchPlanets).toHaveBeenCalledWith('', 1);
		expect(fetchPlanetDetails).not.toHaveBeenCalled();
	});

	it('handles API failures gracefully', async () => {
		(fetchPlanets as jest.Mock).mockRejectedValue(new Error('Failed to fetch planets'));
		const searchParams = { search: 'Earth', page: '1' };

		await expect(Home({ searchParams })).rejects.toThrow('Failed to fetch planets');
	});
});
