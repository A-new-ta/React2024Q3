import { render } from '@testing-library/react';
import ErrorPage from '../app/error';
import { ThemeProvider } from '../context/ThemeContext';

jest.mock('../ErrorPage.module.css', () => ({
	page: 'page',
	themeLight: 'themeLight',
	themeDark: 'themeDark',
	pageTitle: 'pageTitle',
}));

describe('ErrorPage Component', () => {
	const renderWithTheme = (theme: 'light' | 'dark') => {
		return render(
			<ThemeProvider initialTheme={theme}>
				<ErrorPage />
			</ThemeProvider>
		);
	};

	it('renders the error page with the correct content', () => {
		const { getByText, getByTestId } = renderWithTheme('light');

		expect(getByTestId('error-page')).toBeInTheDocument();
		expect(getByText('404')).toBeInTheDocument();
		expect(getByText('404 - Page Not Found')).toBeInTheDocument();
	});

	it('applies light theme styles when the theme is light', () => {
		const { getByTestId } = renderWithTheme('light');

		const errorPageElement = getByTestId('error-page');
		expect(errorPageElement).toHaveClass('page');
		expect(errorPageElement).toHaveClass('themeLight');
		expect(errorPageElement).not.toHaveClass('themeDark');
	});
});
