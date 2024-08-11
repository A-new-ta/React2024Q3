'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clearPlanetDetails, setPlanetDetails } from '../../store/planetDetailsSlice.ts';

interface PlanetDetailsProps {
	planetDetails: {
		name: string;
		terrain: string;
		population: string;
		id: string;
		diameter: string;
		gravity: string;
		climate: string;
		orbital_period: string;
		rotation_period: string;
		surface_water: string;
		url: string;
	};
}

const DetailsCard: React.FC = ({ planetDetails }: PlanetDetailsProps) => {
	const router = useRouter();
	const dispatch = useDispatch();
	useEffect(() => {
		if (planetDetails) {
			dispatch(setPlanetDetails(planetDetails));
		}
	}, [planetDetails, dispatch]);

	const handleClose = () => {
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.delete('id');
		router.push(`/?${searchParams.toString()}`);
		dispatch(clearPlanetDetails());
	};

	if (!planetDetails) {
		return <div>Error loading planet details</div>;
	}

	return (
		<div>
			<button onClick={handleClose}>Close</button>
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
