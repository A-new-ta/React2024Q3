import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from '../store/resultsSlice.ts';
import type { RootState } from '../store/store.ts';
import planetDetailsReducer from '../store/planetDetailsSlice.ts';

type PreloadedState = Partial<RootState>;
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
	preloadedState?: PreloadedState;
	store?: ReturnType<typeof configureStore>;
}

export function renderWithProviders(
	ui: React.ReactElement,
	{
		preloadedState = {} as PreloadedState,
		store = configureStore({
			reducer: {
				// [apiSlice.reducerPath]: apiSlice.reducer,
				results: resultsReducer,
				planetDetails: planetDetailsReducer,
			},
			// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
			preloadedState,
		}),
		...renderOptions
	}: ExtendedRenderOptions = {}
) {
	const Wrapper = ({ children }: PropsWithChildren<NonNullable<unknown>>) => (
		<Provider store={store}>{children}</Provider>
	);

	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
