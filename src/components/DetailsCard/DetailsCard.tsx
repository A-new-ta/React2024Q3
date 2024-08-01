import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGetPlanetDetailsQuery } from '../../store/apiSlice';
import { RootState } from '../../store/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { setPlanetDetails } from '../../store/planetDetailsSlice.ts';

interface DetailsCardProps {
	id: string;
}
const DetailsCard: React.FC<DetailsCardProps> = ({ id }) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { data, error, isLoading } = useGetPlanetDetailsQuery(id);
	const planetDetails = useSelector((state: RootState) => state.planetDetails.details);

	useEffect(() => {
		if (data) {
			dispatch(setPlanetDetails(data));
		}
	}, [data, dispatch]);
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (error) {
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
