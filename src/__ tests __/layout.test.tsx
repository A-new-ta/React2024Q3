import { render } from '@testing-library/react';
import RootLayout from '../app/layout';

describe('RootLayout Component', () => {
	it('renders children correctly', () => {
		const { getByText } = render(
			<RootLayout>
				<div>Child Content</div>
			</RootLayout>
		);

		expect(getByText('Child Content')).toBeInTheDocument();
	});

	it('includes ClientProvider', () => {
		const { container } = render(
			<RootLayout>
				<div>Child Content</div>
			</RootLayout>
		);

		expect(container.querySelector('div')).toHaveTextContent('Child Content');
	});

	it('sets metadata correctly', () => {
		const originalDocumentHead = document.head.innerHTML;
		document.head.innerHTML = '';

		render(
			<RootLayout>
				<div>Child Content</div>
			</RootLayout>
		);

		const title = document.querySelector('title');
		const favicon = document.querySelector('link[rel="icon"]');

		expect(title?.textContent).toBe('Planets');
		expect(favicon?.getAttribute('href')).toBe('/vite.svg');

		document.head.innerHTML = originalDocumentHead;
	});
});
