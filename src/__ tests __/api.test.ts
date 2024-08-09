import { fetchPlanets, fetchPlanetDetails } from '../services/api.ts';

describe('API Service', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe('fetchPlanets', () => {
		it('fetches and transforms planet data successfully', async () => {
			// Mocked response data from the API
			const mockResponse = {
				results: [
					{
						name: 'Earth',
						terrain: 'Varied',
						population: '7 billion',
						url: 'https://swapi.dev/api/planets/1/',
						diameter: '12742',
						gravity: '1g',
						climate: 'Temperate',
						orbital_period: '365 days',
						rotation_period: '24 hours',
						surface_water: '71%',
					},
				],
				count: 1,
				next: null,
				previous: null,
			};

			global.fetch = jest.fn().mockResolvedValue({
				ok: true,
				json: async () => mockResponse,
			} as Response);

			const result = await fetchPlanets('Earth', 1);

			expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets/?search=Earth&page=1');
			expect(result).toEqual({
				results: [
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
				count: 1,
				next: null,
				previous: null,
			});
		});

		it('handles fetch errors gracefully', async () => {
			global.fetch = jest.fn().mockRejectedValue(new Error('Network Error'));

			await expect(fetchPlanets()).rejects.toThrow('Network Error');
		});
	});

	describe('fetchPlanetDetails', () => {
		it('fetches and returns planet details successfully', async () => {
			const mockPlanetDetails = {
				name: 'Earth',
				terrain: 'Varied',
				population: '7 billion',
				url: 'https://swapi.dev/api/planets/1/',
				diameter: '12742',
				gravity: '1g',
				climate: 'Temperate',
				orbital_period: '365 days',
				rotation_period: '24 hours',
				surface_water: '71%',
			};

			global.fetch = jest.fn().mockResolvedValue({
				ok: true,
				json: async () => mockPlanetDetails,
			} as Response);

			const result = await fetchPlanetDetails('1');

			expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets/1');
			expect(result).toEqual(mockPlanetDetails);
		});

		it('throws an error when the fetch fails', async () => {
			global.fetch = jest.fn().mockResolvedValue({
				ok: false,
				status: 404,
			} as Response);

			await expect(fetchPlanetDetails('999')).rejects.toThrow('Failed to fetch planet details');
		});
	});
});
