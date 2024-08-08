'use client';

import { useEffect, useState } from 'react';
import MainPage from '../components/MainPage/MainPage';
import { PlanetDetails } from '../types/types';
import { setCurrentPageItems } from '../store/resultsSlice.ts';
import { useDispatch } from 'react-redux';

interface ClientComponentProps {
	initialPlanets: {
		results: PlanetDetails[];
		count: number;
		next: string | null;
		previous: string | null;
	};
	planetDetails: PlanetDetails | null;
	initialPage: number;
	selectedId: string | null;
}

export default function ClientPage({
	initialPlanets,
	planetDetails,
	initialPage,
	selectedId,
}: ClientComponentProps) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (initialPlanets) {
			dispatch(setCurrentPageItems(initialPlanets));
			setLoading(false);
		}
	}, [initialPlanets, dispatch]);

	return (
		<MainPage
			initialPlanets={initialPlanets}
			initialPage={initialPage}
			planetDetails={planetDetails}
			selectedId={selectedId}
			loading={loading}
			setLoading={setLoading}
		/>
	);
}
