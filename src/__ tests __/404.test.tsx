import { render, screen } from '@testing-library/react';
import ErrorPage from '../pages/404.tsx';
import { ThemeProvider } from '../context/ThemeContext.tsx';

describe('Error provider', () => {
	it('should render error page', () => {
		render(
			<ThemeProvider>
				<ErrorPage />
			</ThemeProvider>
		);
		expect(screen.getByTestId('error-page')).toBeInTheDocument();
	});
});
