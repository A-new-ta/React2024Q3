import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { getPlanetDetails } from '../../services/api.ts';
import { PlanetDetails as PlanetDetailsType } from '../../types/types.ts';
import './DetailsCard.css';

interface ContextType {
	handleCloseDetails: () => void;
}

const DetailsCard: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { handleCloseDetails } = useOutletContext<ContextType>();
	const [planet, setPlanet] = useState<PlanetDetailsType | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPlanetDetails = async () => {
			try {
				const data: PlanetDetailsType = await getPlanetDetails(id!);
				setPlanet(data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching planet details:', error);
				setLoading(false);
			}
		};
		fetchPlanetDetails();
	}, [id]);

	if (loading) {
		return <div className="loading">Loading...</div>;
	}
	if (!planet) {
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
