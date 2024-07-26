import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App.tsx';
test('demo', () => {
	expect(true).toBe(true);
});

test('Renders the main page', () => {
	render(
		<MemoryRouter>
			<App />
		</MemoryRouter>
	);
	expect(true).toBeTruthy();
});
