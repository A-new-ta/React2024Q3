import { PlanetDetails } from '../types/types.ts';

export async function fetchPlanets(search = '', page = 1) {
	const res = await fetch(`https://swapi.dev/api/planets/?search=${search}&page=${page}`);
	const results = await res.json();
	const planetResults = results.results.map((planet: PlanetDetails) => ({
		name: planet.name,
		terrain: planet.terrain,
		population: planet.population,
		id: planet.url.split('/').slice(-2, -1)[0],
		diameter: planet.diameter,
		gravity: planet.gravity,
		climate: planet.climate,
		orbital_period: planet.orbital_period,
		rotation_period: planet.rotation_period,
		surface_water: planet.surface_water,
		url: planet.url,
	}));

	return {
		results: planetResults,
		count: results.count,
		next: results.next,
		previous: results.previous,
	};
}

export async function fetchPlanetDetails(id: string) {
	const res = await fetch(`https://swapi.dev/api/planets/${id}`);
	if (!res.ok) {
		throw new Error('Failed to fetch planet details');
	}
	const planetDetails = await res.json();
	return planetDetails;
}
