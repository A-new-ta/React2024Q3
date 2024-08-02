import { FC, useEffect } from 'react';
import MainPage from '../components/MainPage/MainPage.tsx';
import { GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';
import { setCurrentPageItems } from '../store/resultsSlice.ts';
import { useRouter } from 'next/router';
import { PlanetAPIResponse, PlanetDetails } from '../types/types.ts';

interface HomeProps {
	initialPlanets: PlanetAPIResponse;
	initialPage: number;
}
const Home: FC<HomeProps> = ({ initialPlanets, initialPage }) => {
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		if (initialPlanets) {
			dispatch(setCurrentPageItems(initialPlanets));
		}
	}, [initialPlanets, dispatch]);
	const handlePageChange = (newPage: number) => {
		router.push({
			pathname: '/',
			query: { search: router.query.search || '', page: newPage.toString() },
		});
	};

	return (
		<MainPage
			initialPlanets={initialPlanets}
			onPageChange={handlePageChange}
			initialPage={initialPage}
		/>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { search = '', page = 1 } = context.query;
	const response = await fetch(`https://swapi.dev/api/planets/?search=${search}&page=${page}`);
	const results = await response.json();
	const planetResults = results.results.map((planet: PlanetDetails) => {
		return {
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
		};
	});
	const initialPlanets = {
		results: planetResults,
		count: results.count,
		next: results.next,
		previous: results.previous,
	};
	return {
		props: {
			initialPlanets,
			initialPage: parseInt(page as string, 10) || 1,
		},
	};
};

export default Home;
