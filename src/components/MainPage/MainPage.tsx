'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import SearchBox from '../SearchBox/SearchBox';
import ResultsBox from '../ResultsBox/ResultsBox';
import Flyout from '../Flyout/Flyout';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import useLocalStorage from '../../helpers/useLocalStorage.ts';
import { useTheme } from '../../context/ThemeContext';
import styles from './MainPage.module.css';
import DetailsCard from '../DetailsCard/DetailsCard.tsx';
import { PlanetAPIResponse, PlanetDetails } from '../../types/types.ts';

interface MainPageProps {
	initialPlanets?: PlanetAPIResponse;
	planetDetails: PlanetDetails | null;
	initialPage?: number;
	selectedId: string | null;
	loading: boolean;
	setLoading: (loading: boolean) => void;
}
const MainPage: FC<MainPageProps> = ({
	initialPlanets,
	planetDetails,
	initialPage,
	selectedId,
	loading,
	setLoading,
}) => {
	const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
	const { theme } = useTheme();
	const router = useRouter();

	const handleCloseDetails = () => {
		if (selectedId) {
			setLoading(true);
			const searchParams = new URLSearchParams(window.location.search);
			searchParams.delete('id');
			router.push(`/?${searchParams.toString()}`);
		}
	};
	const handleItemClick = (itemId: string) => {
		setLoading(true);
		const searchParams = new URLSearchParams();
		if (searchTerm) searchParams.append('search', searchTerm);
		if (initialPage != null) {
			searchParams.append('page', initialPage.toString());
		}
		searchParams.append('id', itemId);

		router.push(`/?${searchParams.toString()}`);
	};

	return (
		<div
			className={`${styles.mainPage} ${theme === 'light' ? styles.mainPageThemeLight : styles.mainPageThemeDark}`}
		>
			<div className={`${styles.leftSection} ${selectedId ? styles.leftSectionShrink : ''}`}>
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
						initialPlanets={initialPlanets}
						initialPage={initialPage}
					/>
				</div>
			</div>
			{selectedId && (
				<div
					className={`${styles.rightSection} ${theme === 'light' ? styles.rightSectionThemeLight : styles.rightSectionThemeDark}`}
				>
					{loading ? (
						<div>Loading...</div>
					) : (
						planetDetails && <DetailsCard planetDetails={planetDetails} />
					)}
				</div>
			)}
			<Flyout />
		</div>
	);
};
export default MainPage;
