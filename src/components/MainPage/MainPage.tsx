import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SearchBox from '../SearchBox/SearchBox';
import ResultsBox from '../ResultsBox/ResultsBox';
import Flyout from '../Flyout/Flyout';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import useLocalStorage from '../../helpers/useLocalStorage.ts';
import { useTheme } from '../../context/ThemeContext';
import styles from './MainPage.module.css';
import DetailsCard from '../DetailsCard/DetailsCard.tsx';

const MainPage = () => {
	const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
	const [showDetails, setShowDetails] = useState<boolean>(false);
	const { theme } = useTheme();
	const router = useRouter();
	const [selectedId, setSelectedId] = useState<string | null>(null);

	useEffect(() => {
		const { id } = router.query;
		if (id) {
			setShowDetails(true);
			setSelectedId(id as string);
		} else {
			setShowDetails(false);
			setSelectedId(null);
		}
	}, [router.query]);
	const handleCloseDetails = () => {
		const { search, page } = router.query;
		router.push({
			pathname: '/',
			query: { search, page },
		});
		setShowDetails(false);
	};

	const handleItemClick = (itemId: string) => {
		router.push({
			pathname: `/details/${itemId}`,
			query: { search: router.query.search || '', page: router.query.page || '1' },
		});
		setShowDetails(true);
	};
	return (
		<div
			className={`${styles.mainPage} ${theme === 'light' ? styles.mainPageThemeLight : styles.mainPageThemeDark}`}
		>
			<div className={`${styles.leftSection} ${showDetails ? styles.leftSectionShrink : ''}`}>
				<div
					className={`${styles.topSection} ${theme === 'light' ? styles.topSectionThemeLight : styles.topSectionThemeDark}`}
				>
					<SearchBox searchTerm={searchTerm} onSearch={setSearchTerm} />
					<ThemeToggle />
				</div>
				<div className={styles.bottomSection} onClick={handleCloseDetails}>
					<ResultsBox
						searchTerm={searchTerm}
						onItemClick={handleItemClick}
						onCloseDetails={handleCloseDetails}
					/>
				</div>
			</div>
			{showDetails && selectedId && (
				<div
					className={`${styles.rightSection} ${theme === 'light' ? styles.rightSectionThemeLight : styles.rightSectionThemeDark}`}
				>
					<DetailsCard id={selectedId} />
				</div>
			)}
			<Flyout />
		</div>
	);
};
export default MainPage;
