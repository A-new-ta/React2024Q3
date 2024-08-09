import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/store';
import { ThemeProvider } from '../context/ThemeContext';
import MyApp from '../pages/_app';
import { AppProps } from 'next/app';

jest.mock('next/head', () => {
	return {
		__esModule: true,
		default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
	};
});

const mockComponent = () => <div>Mock Component</div>;

const renderApp = (props: Partial<AppProps> = {}) => {
	const defaultProps: AppProps = {
		Component: mockComponent,
		pageProps: {},
		...props,
	};
	return render(
		<Provider store={store}>
			<ThemeProvider>
				<MyApp {...defaultProps} />
			</ThemeProvider>
		</Provider>
	);
};

describe('MyApp', () => {
	it('renders the provided component with pageProps', () => {
		renderApp();

		expect(screen.getByText('Mock Component')).toBeInTheDocument();
	});

	it('ensures Redux Provider is working by accessing the store', () => {
		const { getState } = store;
		renderApp();

		expect(getState()).toBeDefined();
	});

	it('ensures ThemeProvider is applied', () => {
		renderApp();
		expect(document.body).toHaveClass('light');
	});
});
