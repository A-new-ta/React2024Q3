import React, { useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { useGetPlanetDetailsQuery } from '../../store/apiSlice';
import './DetailsCard.css';
import { RootState } from '../../store/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { setPlanetDetails } from '../../store/planetDetailsSlice.ts';

interface ContextType {
	handleCloseDetails: () => void;
}

const DetailsCard: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { handleCloseDetails } = useOutletContext<ContextType>();
	const dispatch = useDispatch();
	const { data, error, isLoading } = useGetPlanetDetailsQuery(id!);
	const planetDetails = useSelector((state: RootState) => state.planetDetails.details);

	useEffect(() => {
		if (data) {
			dispatch(setPlanetDetails(data));
		}
	}, [data, dispatch]);
	if (isLoading) {
		return <div className="loading">Loading...</div>;
	}
	if (error) {
		return <div className="error">Error loading planet details</div>;
	}

	return (
		<div className="planet-details">
			<button onClick={handleCloseDetails} className="close-button">
				Close
			</button>
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
