import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './ResultsBox.css';
import { getPlanets } from '../../services/api.ts';
import { Planet, PlanetAPIResponse } from '../../types/types.ts';
import Pagination from '../Pagination/Pagination.tsx';

interface Props {
	searchTerm: string;
	onItemClick: (itemId: string) => void;
	// onCloseDetails: () => void;
}

const ResultsBox: React.FC<Props> = ({ searchTerm, onItemClick }) => {
	const [results, setResults] = useState<
		{ name: string; description: string; population: string; id: string }[]
	>([]);
	const [loading, setLoading] = useState(false);
	// const [next, setNext] = useState<string | null>(null);
	// const [previous, setPrevious] = useState<string | null>(null);
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1;
	const [totalPages, setTotalPages] = useState(1);
	const previousSearchTerm = useRef<string>(searchTerm);

	const fetchResults = useCallback(async () => {
		setLoading(true);
		try {
			const data: PlanetAPIResponse = await getPlanets(searchTerm.trim(), currentPage);
			const results = data.results.map((planet: Planet) => ({
				name: planet.name,
				description: planet.terrain,
				population: planet.population,
				id: planet.url.split('/').slice(-2, -1)[0],
				count: planet.count,
			}));
			setResults(results);
			setTotalPages(Math.ceil(data.count / 10));
			// setNext(data.next);
			// setPrevious(data.previous);
			setLoading(false);
		} catch (error) {
			console.error('Error fetching data:', error);
			setLoading(false);
		}
	}, [searchTerm, currentPage]);

	useEffect(() => {
		if (previousSearchTerm.current !== searchTerm) {
			setSearchParams({ search: searchTerm, page: '1' });
			previousSearchTerm.current = searchTerm;
		}
	}, [searchTerm, setSearchParams]);

	useEffect(() => {
		fetchResults();
	}, [fetchResults]);
	const handlePageChange = (newPage: number) => {
		setSearchParams({ search: searchTerm, page: newPage.toString() });
	};

	// const handleNextPage = () => {
	// 	if (next) {
	// 		handlePageChange(currentPage + 1);
	// 	}
	// };

	// const handlePreviousPage = () => {
	// 	if (previous) {
	// 		handlePageChange(currentPage - 1);
	// 	}
	// };
	if (loading) {
		return <div className="loading">Loading...</div>;
	}

	return (
		<div className="results">
			<div className="results__block">
				{results.map((result, index) => (
					<div key={index} className="card" onClick={() => onItemClick(result.id)}>
						<h3>{result.name}</h3>
						<p>{result.description}</p>
						<p>{result.population}</p>
					</div>
				))}
			</div>
			{results.length > 0 && (
				<Pagination
					currentPage={currentPage}
					onPageChange={handlePageChange}
					totalPages={totalPages}
				/>
			)}
		</div>
	);
};

export default ResultsBox;
