import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { unselectItem } from '../../store/resultsSlice.ts';
import styles from './Flyout.module.css';
import { downloadCSV } from '../../helpers/csvHelper';
import { useTheme } from '../../context/ThemeContext.tsx';

const Flyout: React.FC = () => {
	const selectedItems = useSelector((state: RootState) => state.results.selectedItems);
	const dispatch = useDispatch();
	const selectedCount = Object.keys(selectedItems).length;
	const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
	const { theme } = useTheme();
	const handleUnselectAll = () => {
		Object.keys(selectedItems).forEach((name) => dispatch(unselectItem(name)));
	};

	useEffect(() => {
		if (selectedCount > 0) {
			const url = downloadCSV(Object.values(selectedItems));
			setDownloadUrl(url);

			return () => {
				URL.revokeObjectURL(url);
			};
		} else {
			setDownloadUrl(null);
		}
	}, [selectedItems, selectedCount]);

	if (selectedCount === 0) {
		return null;
	}

	return (
		<div className={`${styles.flyout} ${theme === 'dark' ? styles.themeDark : styles.themeLight}`}>
			<p>{selectedCount} items are selected</p>
			<button className={`${styles.button}`} onClick={handleUnselectAll}>
				Unselect all
			</button>
			{downloadUrl && (
				<a
					className={`${styles.link}`}
					href={downloadUrl}
					download={`${selectedCount}_planets.csv`}
				>
					Download
				</a>
			)}
		</div>
	);
};

export default Flyout;
