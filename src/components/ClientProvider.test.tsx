import { render, screen } from '@testing-library/react';
import ClientProvider from './ClientProvider';
import { useSelector } from 'react-redux';
import React from 'react';

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: jest.fn(),
}));

jest.mock('../context/ThemeContext.tsx', () => ({
	ThemeProvider: ({ children }: { children: React.ReactNode }) => (
		<div data-testid="theme-provider">{children}</div>
	),
}));

describe('ClientProvider', () => {
	it('renders children and provides context', () => {
		(useSelector as jest.Mock).mockReturnValue({});

		render(
			<ClientProvider>
				<div data-testid="child-component">Child Component</div>
			</ClientProvider>
		);

		expect(screen.getByTestId('child-component')).toBeInTheDocument();

		expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
	});
});
