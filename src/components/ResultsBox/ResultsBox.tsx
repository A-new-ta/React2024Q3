import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ResultsBox.css';
import { useGetPlanetsQuery } from '../../store/apiSlice.ts';
import { setLoading, setCurrentPageItems } from '../../store/resultsSlice.ts';
import { RootState } from '../../store/store';
import Pagination from '../Pagination/Pagination.tsx';

interface Props {
	searchTerm: string;
	onItemClick: (itemId: string) => void;
	onCloseDetails: () => void;
}

const ResultsBox: React.FC<Props> = ({ searchTerm, onItemClick, onCloseDetails }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1;
	const dispatch = useDispatch();
	const { loading, currentPageItems } = useSelector((state: RootState) => state.results);
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
			dispatch(setCurrentPageItems(data.results));
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
	if (loading) {
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
							<h3>{result.name}</h3>
							<p>{result.description}</p>
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
						totalPages={Math.ceil(data.count / 10)}
					/>
				</div>
			)}
		</div>
	);
};

export default ResultsBox;
