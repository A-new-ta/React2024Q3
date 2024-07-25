import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import resultsReducer from '../store/resultsSlice.ts';
import planetDetailsReducer from '../store/planetDetailsSlice.ts';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		results: resultsReducer,
		planetDetails: planetDetailsReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ThunkAction<
// 	ReturnType,
// 	RootState,
// 	unknown,
// 	Action<string>
// >;

export default store;
