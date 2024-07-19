import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Planet } from '../types/types.ts';

interface ResultState {
	loading: boolean;
	currentPageItems: Planet[];
}

const initialState: ResultState = {
	loading: false,
	currentPageItems: [],
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
	},
});

export const { setLoading, setCurrentPageItems } = resultsSlice.actions;
export default resultsSlice.reducer;
