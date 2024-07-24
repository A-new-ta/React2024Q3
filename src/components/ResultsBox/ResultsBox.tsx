import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ResultsBox.css';
import { useGetPlanetsQuery } from '../../store/apiSlice.ts';
import {
	setLoading,
	setCurrentPageItems,
	selectItem,
	unselectItem,
} from '../../store/resultsSlice.ts';
import { RootState } from '../../store/store.ts';
import Pagination from '../Pagination/Pagination.tsx';
import { PlanetDetails } from '../../types/types.ts';

interface Props {
	searchTerm: string;
	onItemClick: (itemId: string) => void;
	onCloseDetails: () => void;
}

const ResultsBox: React.FC<Props> = ({ searchTerm, onItemClick, onCloseDetails }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1;
	const dispatch = useDispatch();
	const { loading, currentPageItems, selectedItems, count } = useSelector(
		(state: RootState) => state.results
	);
	const { data, error, isFetching } = useGetPlanetsQuery({ search: searchTerm, page: currentPage });
	const previousSearchTerm = useRef<string>(searchTerm);

	useEffect(() => {
		if (previousSearchTerm.current !== searchTerm) {
			onCloseDetails();
			setSearchParams({ search: searchTerm, page: '1' });
			previousSearchTerm.current = searchTerm;
		}
	}, [searchTerm, setSearchParams, onCloseDetails]);

	useEffect(() => {
		dispatch(setLoading(isFetching));
		if (!isFetching && data) {
			dispatch(setCurrentPageItems(data));
		}
	}, [isFetching, data, dispatch]);
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
	const handleCheckboxChange = (planet: PlanetDetails) => {
		if (selectedItems[planet.name]) {
			dispatch(unselectItem(planet.name));
		} else {
			dispatch(selectItem(planet));
		}
	};
	if (isFetching) {
		return <div className="loading">Loading...</div>;
	}
	if (error) {
		return <div className="error">Error loading data</div>;
	}

	return (
		<div className="results" onClick={handleContainerClick}>
			<div className="results__block">
				{currentPageItems.length === 0 && !loading ? (
					<div className="no-results">Nothing found</div>
				) : (
					currentPageItems.map((result, index) => (
						<div
							key={index}
							className="card"
							role="article"
							onClick={(e) => handleCardClick(result.id, e)}
						>
							<input
								type="checkbox"
								checked={!!selectedItems[result.name]}
								onChange={() => handleCheckboxChange(result)}
								onClick={(e) => e.stopPropagation()}
							/>
							<h3>{result.name}</h3>
							<p>{result.terrain}</p>
							<p>{result.population}</p>
						</div>
					))
				)}
			</div>
			{currentPageItems.length > 0 && (
				<div className="pagination" onClick={handlePaginationClick}>
					<Pagination
						currentPage={currentPage}
						onPageChange={handlePageChange}
						totalPages={Math.ceil((count ?? 0) / 10)}
					/>
				</div>
			)}
		</div>
	);
};

export default ResultsBox;
