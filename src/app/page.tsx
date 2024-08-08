import ClientPage from './ClientPage.tsx';
import { fetchPlanetDetails, fetchPlanets } from '../services/api.ts';
import { PlanetAPIResponse, PlanetDetails } from '../types/types.ts';

export default async function Home({
	searchParams = {},
}: {
	searchParams?: { search?: string; page?: string; id?: string };
}) {
	const search = searchParams.search || '';
	const page = searchParams.page || '1';
	const selectedId = searchParams.id || null;

	const initialPlanets: PlanetAPIResponse = await fetchPlanets(search, parseInt(page));
	let planetDetails: PlanetDetails | null = null;
	if (selectedId) {
		planetDetails = await fetchPlanetDetails(selectedId);
	}
	return (
		<div>
			<ClientPage
				initialPlanets={initialPlanets || null}
				search={search}
				initialPage={page}
				planetDetails={planetDetails}
				selectedId={selectedId}
			/>
		</div>
	);
}
