import { downloadCSV } from './csvHelper.ts';
import { PlanetDetails } from '../types/types.ts';

// Mock URL.createObjectURL
beforeAll(() => {
	global.URL.createObjectURL = jest.fn();
	global.URL.revokeObjectURL = jest.fn();
});

describe('downloadCSV', () => {
	it('should create a CSV with correct content and return a URL', () => {
		const mockData: PlanetDetails[] = [
			{
				name: 'Planet A',
				terrain: 'Rocky',
				population: '1000',
				diameter: '12000',
				gravity: '1.1',
				climate: 'Temperate',
				orbital_period: '365',
				rotation_period: '24',
				surface_water: '30%',
				url: 'http://example.com',
				id: '1',
			},
			{
				name: 'Planet B',
				terrain: 'Gas Giant',
				population: '2000',
				diameter: '50000',
				gravity: '2.5',
				climate: 'Cold',
				orbital_period: '700',
				rotation_period: '36',
				surface_water: '10%',
				url: 'http://example.com',
				id: '2',
			},
		];

		// Call downloadCSV and get the URL
		const url = downloadCSV(mockData);

		// Verify URL.createObjectURL is called
		expect(URL.createObjectURL).toHaveBeenCalled();

		// Extract the Blob from URL.createObjectURL call
		const blob = (URL.createObjectURL as jest.Mock).mock.calls[0][0];

		// Create a FileReader to read the Blob's content
		const reader = new FileReader();
		const csvContent = [
			[
				'Name',
				'Terrain',
				'Population',
				'Diameter',
				'Gravity',
				'Climate',
				'Orbital period',
				'Rotation period',
				'Surface water',
			],
			['Planet A', 'Rocky', '1000', '12000', '1.1', 'Temperate', '365', '24', '30%'],
			['Planet B', 'Gas Giant', '2000', '50000', '2.5', 'Cold', '700', '36', '10%'],
		]
			.map((e) => e.join(';'))
			.join('\n');
		reader.onload = () => {
			const blobContent = reader.result as string;

			// Verify that the generated CSV content matches the expected content
			expect(blobContent).toBe(csvContent);

			// Optionally, verify the URL if needed (e.g., check URL format or other properties)
			expect(typeof url).toBe('string');
			expect(url.startsWith('blob:')).toBe(true);
		};

		// Ensure FileReader's onload is triggered
		reader.readAsText(blob);
	});
});
