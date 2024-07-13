import { Outlet, useSearchParams, useNavigate } from 'react-router-dom';
import SearchBox from '../../components/SearchBox/SearchBox.tsx';
import ResultsBox from '../../components/ResultsBox/ResultsBox.tsx';
import { useEffect, useState } from 'react';
import useLocalStorage from '../../helpers/useLocalStorage.ts';
import './MainPage.css';

const MainPage = () => {
	const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
	const [searchParams, setSearchParams] = useSearchParams();
	const [showDetails, setShowDetails] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		setShowDetails(searchParams.has('details'));
	}, [searchParams]);
	const handleCloseDetails = () => {
		searchParams.delete('details');
		setSearchParams(searchParams);
		setShowDetails(false);
		navigate(
			`/?search=${searchParams.get('search') || ''}&page=${searchParams.get('page') || '1'}`
		);
	};

	const handleItemClick = (itemId: string) => {
		setSearchParams({
			...Object.fromEntries(searchParams),
			search: searchTerm,
			page: searchParams.get('page') || '1',
			details: itemId,
		});
		setShowDetails(true);
		navigate(
			`details/${itemId}/?search=${searchParams.get('search') || ''}&page=${searchParams.get('page') || '1'}`
		);
	};
	return (
		<div className="main-page">
			<div className={`left-section ${showDetails ? 'shrink' : ''}`}>
				<div className="top-section">
					<SearchBox searchTerm={searchTerm} onSearch={setSearchTerm} />
				</div>
				<div className="bottom-section" onClick={handleCloseDetails}>
					<ResultsBox
						searchTerm={searchTerm}
						onItemClick={handleItemClick}
						onCloseDetails={handleCloseDetails}
					/>
				</div>
			</div>
			{showDetails && (
				<div className="right-section">
					<Outlet context={{ handleCloseDetails }} />
				</div>
			)}
		</div>
	);
};
export default MainPage;
