import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import type { ReactElement } from 'react';
import type { Store, AnyAction } from 'redux';
// import type { ThunkDispatch } from 'redux-thunk';

const middlewares: Array<ThunkMiddleware<NonNullable<unknown>, AnyAction>> = [
	thunk as ThunkMiddleware<NonNullable<unknown>, AnyAction>,
];
const mockStore = configureMockStore(middlewares);

interface ExtendedRenderOptions {
	store?: Store;
}

export function renderWithStore(
	ui: ReactElement,
	{ store = mockStore({}) }: ExtendedRenderOptions = {}
) {
	return render(<Provider store={store}>{ui}</Provider>);
}
