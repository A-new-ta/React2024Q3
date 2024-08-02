import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ResultsBox.module.css';
import { setCurrentPageItems, selectItem, unselectItem } from '../../store/resultsSlice.ts';
import { RootState } from '../../store/store.ts';
import Pagination from '../Pagination/Pagination.tsx';
import { PlanetAPIResponse, PlanetDetails } from '../../types/types.ts';
import { useTheme } from '../../context/ThemeContext.tsx';
import useLoadingOnRouteChange from '../../helpers/useLoadingOnRouteChange.ts';

interface Props {
	searchTerm: string;
	onItemClick: (itemId: string) => void;
	onCloseDetails: () => void;
	initialPlanets?: PlanetAPIResponse;
	initialPage: number;
	onPageChange: (newPage: number) => void;
}

const ResultsBox: React.FC<Props> = ({
	searchTerm,
	onItemClick,
	onCloseDetails,
	initialPlanets,
	onPageChange,
}) => {
	const router = useRouter();
	const { push } = router;
	const dispatch = useDispatch();
	const { currentPageItems, selectedItems, count } = useSelector(
		(state: RootState) => state.results
	);
	const previousSearchTerm = useRef<string>(searchTerm);
	const { theme } = useTheme();
	const loading = useLoadingOnRouteChange();

	useEffect(() => {
		if (initialPlanets) {
			dispatch(setCurrentPageItems(initialPlanets));
		}
	}, [initialPlanets, dispatch]);
	useEffect(() => {
		if (previousSearchTerm.current !== searchTerm) {
			onCloseDetails();
			push({ pathname: '/', query: { search: searchTerm, page: '1' } });
			previousSearchTerm.current = searchTerm;
		}
	}, [searchTerm, push, onCloseDetails]);

	const handlePageChange = (newPage: number) => {
		onCloseDetails();
		onPageChange(newPage);
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

	return (
		<div className={`${styles.results} theme-${theme}`} onClick={handleContainerClick}>
			{loading ? (
				<div>Loading...</div>
			) : (
				<>
					<div className={`${styles.results__block} theme-${theme}`}>
						{currentPageItems.length === 0 ? (
							<div>Nothing found</div>
						) : (
							currentPageItems.map((result, index) => (
								<div
									key={index}
									className={`${styles.card} theme-${theme}`}
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
						<div onClick={handlePaginationClick}>
							<Pagination
								currentPage={Number(router.query.page) || 1}
								onPageChange={handlePageChange}
								totalPages={Math.ceil((count ?? 0) / 10)}
							/>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default ResultsBox;
