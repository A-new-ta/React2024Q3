import React from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { useGetPlanetDetailsQuery } from '../../store/apiSlice';
import './DetailsCard.css';

interface ContextType {
	handleCloseDetails: () => void;
}

const DetailsCard: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { handleCloseDetails } = useOutletContext<ContextType>();
	const { data: planet, error, isLoading } = useGetPlanetDetailsQuery(id!);

	if (isLoading) {
		return <div className="loading">Loading...</div>;
	}
	if (error || !planet) {
		return <div className="error">Error loading planet details</div>;
	}

	return (
		<div className="planet-details">
			<button onClick={handleCloseDetails} className="close-button">
				Close
			</button>
			<h2>{planet.name}</h2>
			<p>
				<strong>Terrain:</strong> {planet.terrain}
			</p>
			<p>
				<strong>Population:</strong> {planet.population}
			</p>
			<p>
				<strong>Climate:</strong> {planet.climate}
			</p>
			<p>
				<strong>Orbital Period:</strong> {planet.orbital_period}
			</p>
			<p>
				<strong>Rotation Period:</strong> {planet.rotation_period}
			</p>
			<p>
				<strong>Surface Water:</strong> {planet.surface_water}
			</p>
			<p>
				<strong>Diameter:</strong> {planet.diameter}
			</p>
			<p>
				<strong>Gravity:</strong> {planet.gravity}
			</p>
		</div>
	);
};

export default DetailsCard;
