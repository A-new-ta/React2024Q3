import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlanetDetails } from '../types/types';

interface PlanetDetailsState {
	details: PlanetDetails | null;
}

const initialState: PlanetDetailsState = {
	details: null,
};

const planetDetailsSlice = createSlice({
	name: 'planetDetails',
	initialState,
	reducers: {
		setPlanetDetails: (state, action: PayloadAction<PlanetDetails>) => {
			state.details = action.payload;
		},
		clearPlanetDetails: (state) => {
			state.details = null;
		},
	},
});

export const { setPlanetDetails, clearPlanetDetails } = planetDetailsSlice.actions;
export default planetDetailsSlice.reducer;
