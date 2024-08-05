import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import store from '../store/store';

jest.mock('../store/store', () => ({
	__esModule: true,
	default: {
		dispatch: jest.fn(),
		subscribe: jest.fn(),
		getState: jest.fn(),
		replaceReducer: jest.fn(),
	},
}));

jest.mock('../context/ThemeContext', () => {
	const originalModule = jest.requireActual('../context/ThemeContext');
	return {
		...originalModule,
		useTheme: jest.fn(() => ({ theme: 'light', toggleTheme: jest.fn() })),
	};
});

const MockComponent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

describe('_app.tsx', () => {
	test('wraps component with ThemeProvider and Redux Provider', () => {
		render(
			<Provider store={store}>
				<ThemeProvider>
					<MockComponent>Test</MockComponent>
				</ThemeProvider>
			</Provider>
		);
		const { theme, toggleTheme } = useTheme();
		expect(theme).toBe('light');
		expect(typeof toggleTheme).toBe('function');
	});
});
