import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Planet, PlanetDetails } from '../types/types.ts';

interface ResultState {
	loading: boolean;
	currentPageItems: Planet[];
	selectedItems: { [key: string]: Planet };
}

const initialState: ResultState = {
	loading: false,
	currentPageItems: [],
	selectedItems: {},
};

const resultsSlice = createSlice({
	name: 'results',
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setCurrentPageItems: (state, action: PayloadAction<Planet[]>) => {
			state.currentPageItems = action.payload;
		},
		selectItem: (state, action: PayloadAction<PlanetDetails>) => {
			state.selectedItems[action.payload.name] = action.payload;
		},
		unselectItem: (state, action: PayloadAction<string>) => {
			delete state.selectedItems[action.payload];
		},
		unselectAllItems: (state) => {
			state.selectItems = {};
		},
	},
});

export const { setLoading, setCurrentPageItems, selectItem, unselectItem, unselectAllItems } =
	resultsSlice.actions;
export default resultsSlice.reducer;
