import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { countries } from '../data/countries.ts';

const countrySlice = createSlice({
	name: 'country',
	initialState: { countries: countries },
	reducers: {
		setCountries: (state, action: PayloadAction<string[]>) => {
			state.countries = action.payload;
		},
	},
});

export const { setCountries } = countrySlice.actions;
export default countrySlice.reducer;
