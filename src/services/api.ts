import axios from 'axios';
import { BASE_URL } from '../constants/appConstants.ts';

const api = axios.create({
	baseURL: BASE_URL,
});
export const getPlanets = async (search: string) => {
	const { data } = await api.get(`planets?search=${search}`);
	return data;
};
