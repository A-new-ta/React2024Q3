import axios from 'axios';
import { BASE_URL } from '../constants/appConstants.ts';
import { PlanetAPIResponse } from '../types/types.ts';

const api = axios.create({
	baseURL: BASE_URL,
});
export const getPlanets = async (search: string): Promise<PlanetAPIResponse> => {
	const response = await api.get<PlanetAPIResponse>(`planets?search=${search}`);
	return response.data as PlanetAPIResponse;
};
