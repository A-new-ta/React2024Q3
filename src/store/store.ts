import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice.ts';
import countryReducer from './countrySlice.ts';

export const store = configureStore({
	reducer: {
		form: formReducer,
		country: countryReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
