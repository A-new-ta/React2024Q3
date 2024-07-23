import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { unselectItem } from '../../store/resultsSlice.ts';
import './Flyout.css';
import { downloadCSV } from '../../helpers/csvHelper';

const Flyout: React.FC = () => {
	const selectedItems = useSelector((state: RootState) => state.results.selectedItems);
	const dispatch = useDispatch();
	const selectedCount = Object.keys(selectedItems).length;

	const handleUnselectAll = () => {
		Object.keys(selectedItems).forEach((name) => dispatch(unselectItem(name)));
		// dispatch(unselectAllItems());
	};

	const handleDownload = () => {
		const itemsArray = Object.values(selectedItems);
		downloadCSV(itemsArray, `${selectedCount}_planets.csv`);
	};

	if (selectedCount === 0) {
		return null;
	}

	return (
		<div className="flyout">
			<p>{selectedCount} items are selected</p>
			<button onClick={handleUnselectAll}>Unselect all</button>
			<button onClick={handleDownload}>Download</button>
		</div>
	);
};

export default Flyout;
