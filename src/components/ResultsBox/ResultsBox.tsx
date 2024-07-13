import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './ResultsBox.css';
import { getPlanets } from '../../services/api.ts';
import { Planet, PlanetAPIResponse } from '../../types/types.ts';
import Pagination from '../Pagination/Pagination.tsx';

interface Props {
	searchTerm: string;
	onItemClick: (itemId: string) => void;
	onCloseDetails: () => void;
}

const ResultsBox: React.FC<Props> = ({ searchTerm, onItemClick, onCloseDetails }) => {
	const [results, setResults] = useState<
		{ name: string; description: string; population: string; id: string }[]
	>([]);
	const [loading, setLoading] = useState(false);
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
			setLoading(false);
		} catch (error) {
			console.error('Error fetching data:', error);
			setLoading(false);
		}
	}, [searchTerm, currentPage]);

	useEffect(() => {
		if (previousSearchTerm.current !== searchTerm) {
			onCloseDetails();
			setSearchParams({ search: searchTerm, page: '1' });
			previousSearchTerm.current = searchTerm;
		}
	}, [searchTerm, setSearchParams, onCloseDetails]);

	useEffect(() => {
		fetchResults();
	}, [fetchResults]);
	const handlePageChange = (newPage: number) => {
		searchParams.delete('details');
		onCloseDetails();
		setSearchParams({ search: searchTerm, page: newPage.toString() });
	};

	const handleContainerClick = () => {
		onCloseDetails();
	};
	const handleCardClick = (itemId: string, e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		onItemClick(itemId);
	};

	const handlePaginationClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};
	if (loading) {
		return <div className="loading">Loading...</div>;
	}

	return (
		<div className="results" onClick={handleContainerClick}>
			<div className="results__block">
				{results.length === 0 && !loading ? (
					<div className="no-results">Nothing found</div>
				) : (
					results.map((result, index) => (
						<div
							key={index}
							className="card"
							role="article"
							onClick={(e) => handleCardClick(result.id, e)}
						>
							<h3>{result.name}</h3>
							<p>{result.description}</p>
							<p>{result.population}</p>
						</div>
					))
				)}
			</div>
			{results.length > 0 && (
				<div className="pagination" onClick={handlePaginationClick}>
					<Pagination
						currentPage={currentPage}
						onPageChange={handlePageChange}
						totalPages={totalPages}
					/>
				</div>
			)}
		</div>
	);
};

export default ResultsBox;
