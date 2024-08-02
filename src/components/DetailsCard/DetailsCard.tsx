import React from 'react';
import { useRouter } from 'next/router';
import { RootState } from '../../store/store.ts';
import { useSelector } from 'react-redux';
import useLoadingOnRouteChange from '../../helpers/useLoadingOnRouteChange.ts';

const DetailsCard: React.FC = () => {
	const router = useRouter();
	const planetDetails = useSelector((state: RootState) => state.planetDetails.details);
	const loading = useLoadingOnRouteChange();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!planetDetails) {
		return <div>Error loading planet details</div>;
	}

	return (
		<div>
			<button onClick={() => router.push('/')}>Close</button>
			{planetDetails && (
				<div>
					<h2>{planetDetails.name}</h2>
					<p>
						<strong>Terrain:</strong> {planetDetails.terrain}
					</p>
					<p>
						<strong>Population:</strong> {planetDetails.population}
					</p>
					<p>
						<strong>Climate:</strong> {planetDetails.climate}
					</p>
					<p>
						<strong>Orbital Period:</strong> {planetDetails.orbital_period}
					</p>
					<p>
						<strong>Rotation Period:</strong> {planetDetails.rotation_period}
					</p>
					<p>
						<strong>Surface Water:</strong> {planetDetails.surface_water}
					</p>
					<p>
						<strong>Diameter:</strong> {planetDetails.diameter}
					</p>
					<p>
						<strong>Gravity:</strong> {planetDetails.gravity}
					</p>
				</div>
			)}
		</div>
	);
};

export default DetailsCard;
