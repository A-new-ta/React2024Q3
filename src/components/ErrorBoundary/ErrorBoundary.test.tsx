import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
	const ProblematicComponent = () => {
		throw new Error('Test Error');
	};

	beforeEach(() => {
		// Mock window.location.reload
		Object.defineProperty(window, 'location', {
			value: {
				reload: jest.fn(),
			},
			writable: true,
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('renders children without error', () => {
		render(
			<ErrorBoundary>
				<div data-testid="child">Child Component</div>
			</ErrorBoundary>
		);
		expect(screen.getByTestId('child')).toBeInTheDocument();
	});

	it('displays error message and reload button on error', () => {
		render(
			<ErrorBoundary>
				<ProblematicComponent />
			</ErrorBoundary>
		);

		expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
		expect(screen.getByText('Reload page')).toBeInTheDocument();
	});

	it('reloads the page when the reload button is clicked', () => {
		render(
			<ErrorBoundary>
				<ProblematicComponent />
			</ErrorBoundary>
		);

		const reloadButton = screen.getByText('Reload page');
		fireEvent.click(reloadButton);

		expect(window.location.reload).toHaveBeenCalled();
	});
});
