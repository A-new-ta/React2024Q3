'use client';

import React, { useEffect, useState } from 'react';
import styles from './SearchBox.module.css';
import { useTheme } from '../../context/ThemeContext.tsx';

interface Props {
	searchTerm: string;
	onSearch: (searchTerm: string) => void;
}

const SearchBox: React.FC<Props> = ({ searchTerm, onSearch }) => {
	const [term, setTerm] = useState(searchTerm);
	const { theme } = useTheme();
	useEffect(() => {
		setTerm(searchTerm);
	}, [searchTerm]);
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTerm(event.target.value);
	};
	const handleSearch = () => {
		const trimmedTerm = term.trim();
		onSearch(trimmedTerm);
	};

	return (
		<div className={`${styles.searchComponent} ${styles[`theme-${theme}`]}`}>
			<input
				className={`${styles.searchInput} ${styles[`theme-${theme}`]}`}
				type="text"
				placeholder="Search..."
				autoFocus
				value={term}
				onChange={handleInputChange}
			/>
			<button
				onClick={handleSearch}
				className={`${styles.searchButton} ${styles[`theme-${theme}`]}`}
			>
				Search
			</button>
		</div>
	);
};

export default SearchBox;
