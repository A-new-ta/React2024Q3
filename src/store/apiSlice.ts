import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants/appConstants.ts';
import { Planet, PlanetAPIResponse, PlanetDetails } from '../types/types.ts';

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
				const results = response.results.map((planet: Planet) => ({
					name: planet.name,
					description: planet.terrain,
					population: planet.population,
					id: planet.url.split('/').slice(-2, -1)[0],
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
