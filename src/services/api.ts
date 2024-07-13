import axios from 'axios';
import { BASE_URL } from '../constants/appConstants.ts';
import { PlanetDetails, PlanetAPIResponse } from '../types/types.ts';

const api = axios.create({
	baseURL: BASE_URL,
});
export const getPlanets = async (search: string, page: number): Promise<PlanetAPIResponse> => {
	const response = await api.get<PlanetAPIResponse>(`planets?search=${search}&page=${page}`);
	return response.data as PlanetAPIResponse;
};

export const getPlanetDetails = async (id: string): Promise<PlanetDetails> => {
	const response = await api.get<PlanetDetails>(`planets/${id}`);
	return response.data as PlanetDetails;
};
