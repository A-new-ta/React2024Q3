import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/appConstants.ts';
import { PlanetAPIResponse, PlanetDetails } from '../types/types.ts';

interface GetPlanetsQueryArgs {
	search: string;
	page: number;
}

interface GetPlanetDetailsQueryArgs {
	id: string;
}

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: (builder) => ({
		getPlanets: builder.query<PlanetAPIResponse, GetPlanetsQueryArgs>({
			query: ({ search, page }) => `planets?search=${search}&page=${page}`,
			transformResponse: (response: PlanetAPIResponse) => {
				const results = response.results.map((planet: PlanetDetails) => ({
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
				}));
				return {
					results,
					count: response.count,
				};
			},
		}),
		getPlanetDetails: builder.query<PlanetDetails, GetPlanetDetailsQueryArgs['id']>({
			query: (id) => `planets/${id}`,
		}),
	}),
});

export const { useGetPlanetsQuery, useGetPlanetDetailsQuery } = apiSlice;
