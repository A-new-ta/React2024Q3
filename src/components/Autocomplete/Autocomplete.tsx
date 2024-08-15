import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from '../FormControlled/FormControlled.module.css';

interface AutocompleteProps {
	value: string;
	onChange: (value: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ value, onChange }) => {
	const countries = useSelector((state: RootState) => state.country.countries);
	const [filteredCountries, setFilteredCountries] = useState<string[]>([]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;
		onChange(inputValue);

		if (inputValue) {
			setFilteredCountries(
				countries.filter((country) => country.toLowerCase().includes(inputValue.toLowerCase()))
			);
		} else {
			setFilteredCountries([]);
		}
	};

	const handleSelect = (country: string) => {
		onChange(country);
		setFilteredCountries([]);
	};

	return (
		<div>
			<input
				type="text"
				value={value}
				onChange={handleChange}
				placeholder="Select a country"
				list="countries"
				className={styles.fileInput}
				autoComplete="off"
			/>
			{filteredCountries.length > 0 && (
				<ul>
					{filteredCountries.map((country, index) => (
						<option key={index} onClick={() => handleSelect(country)}>
							{country}
						</option>
					))}
				</ul>
			)}
		</div>
	);
};

export default Autocomplete;
