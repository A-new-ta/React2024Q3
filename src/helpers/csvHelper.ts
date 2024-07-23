import { PlanetDetails } from '../types/types.ts';

export const downloadCSV = (items: PlanetDetails[], filename: string) => {
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
		...items.map((item) => [
			item.name,
			item.terrain,
			item.population,
			item.diameter,
			item.gravity,
			item.climate,
			item.orbital_period,
			item.rotation_period,
			item.surface_water,
		]),
	]
		.map((e) => e.join(';'))
		.join('\n');

	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = filename;
	link.click();
};
