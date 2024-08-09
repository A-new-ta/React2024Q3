import { getServerSideProps } from '../pages/details/[id]';
import { PlanetDetails } from '../types/types';

global.fetch = jest.fn();

describe('Details Page getServerSideProps', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});
	it('fetches and returns planet details', async () => {
		const planetDetails: PlanetDetails = {
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
		};

		(global.fetch as jest.Mock).mockResolvedValue({
			json: jest.fn().mockResolvedValue(planetDetails),
		});

		const context = { params: { id: '1' } };
		const { props } = await getServerSideProps(context);

		expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets/1');
		expect(props).toEqual({ planetDetails });
	});

	it('returns notFound if fetch fails', async () => {
		(global.fetch as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

		const context = { params: { id: '1' } };
		const result = await getServerSideProps(context);

		expect(result).toEqual({ notFound: true });
	});
});
