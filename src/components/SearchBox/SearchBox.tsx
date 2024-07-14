import React, { useEffect, useState } from 'react';
import './SearchBox.css';

interface Props {
	searchTerm: string;
	onSearch: (searchTerm: string) => void;
}

const SearchBox: React.FC<Props> = ({ searchTerm, onSearch }) => {
	const [term, setTerm] = useState(searchTerm);
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
		<div className="search-component">
			<input
				className="search-input"
				type="text"
				placeholder="Search..."
				autoFocus
				value={term}
				onChange={handleInputChange}
			/>
			<button onClick={handleSearch} className="search-button">
				Search
			</button>
		</div>
	);
};

export default SearchBox;
