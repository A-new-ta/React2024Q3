import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlanetAPIResponse, PlanetDetails } from '../types/types.ts';

interface ResultState {
	loading: boolean;
	currentPageItems: PlanetDetails[];
	selectedItems: { [key: string]: PlanetDetails };
	count: number | null;
	next: string | null;
	previous: string | null;
}

const initialState: ResultState = {
	loading: false,
	currentPageItems: [],
	selectedItems: {},
	count: null,
	next: null,
	previous: null,
};

const resultsSlice = createSlice({
	name: 'results',
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setCurrentPageItems: (state, action: PayloadAction<PlanetAPIResponse>) => {
			state.currentPageItems = action.payload.results;
			state.count = action.payload.count;
			state.next = action.payload.next;
			state.previous = action.payload.previous;
		},
		selectItem: (state, action: PayloadAction<PlanetDetails>) => {
			state.selectedItems[action.payload.name] = action.payload;
		},
		unselectItem: (state, action: PayloadAction<string>) => {
			delete state.selectedItems[action.payload];
		},
		unselectAllItems: (state) => {
			state.selectedItems = {};
		},
	},
});

export const { setLoading, setCurrentPageItems, selectItem, unselectItem, unselectAllItems } =
	resultsSlice.actions;
export default resultsSlice.reducer;
