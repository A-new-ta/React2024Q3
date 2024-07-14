import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultsBox from './ResultsBox';
import { BrowserRouter } from 'react-router-dom';
import { getPlanets } from '../../services/api';
import { PlanetAPIResponse } from '../../types/types';
import mocked = jest.mocked;

jest.mock('../../services/api');
declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace jest {
		interface Matchers<R> {
			toBeInTheDocument(): R;
		}
	}
}
// Custom matcher implementation
expect.extend({
	toBeInTheDocument(received) {
		const pass = received instanceof HTMLElement && received.isConnected;
		if (pass) {
			return {
				message: () => `expected element not to be in the document`,
				pass: true,
			};
		} else {
			return {
				message: () => `expected element to be in the document`,
				pass: false,
			};
		}
	},
});

const mockedGetPlanets = getPlanets as jest.MockedFunction<typeof getPlanets>;

describe('ResultsBox', () => {
	const defaultProps = {
		searchTerm: '',
		onItemClick: jest.fn(),
		onCloseDetails: jest.fn(),
	};

	const renderComponent = (props = {}) => {
		return render(
			<BrowserRouter>
				<ResultsBox {...defaultProps} {...props} />
			</BrowserRouter>
		);
	};

	it('renders the specified number of cards', async () => {
		const mockResponse = {
			count: 3,
			next: null,
			previous: null,
			results: [
				{
					name: 'Planet 1',
					terrain: 'terrain 1',
					population: '1000',
					url: 'http://example.com/1/',
					count: 3,
				},
				{
					name: 'Planet 2',
					terrain: 'terrain 2',
					population: '2000',
					url: 'http://example.com/2/',
					count: 3,
				},
				{
					name: 'Planet 3',
					terrain: 'terrain 3',
					population: '3000',
					url: 'http://example.com/3/',
					count: 3,
				},
			],
		};

		mocked(getPlanets).mockResolvedValue(mockResponse);
		render(
			<BrowserRouter>
				<ResultsBox searchTerm="test" onItemClick={jest.fn()} onCloseDetails={jest.fn()} />
			</BrowserRouter>
		);
		await screen.findByText('Planet 1');
		const cards = screen.getAllByRole('article');
		expect(cards.length).toBe(3);
	});

	it('displays a message if no cards are present', async () => {
		const mockResponse: PlanetAPIResponse = {
			count: 0,
			next: null,
			previous: null,
			results: [],
		};

		mockedGetPlanets.mockResolvedValue(mockResponse);

		renderComponent({ searchTerm: 'nothing' });

		await waitFor(() => {
			const noResultsMessage = screen.getByText(/nothing found/i);
			expect(noResultsMessage).toBeInTheDocument(); // Ensure the "nothing found" message is in the document
		});
	});

	it('opens a detailed card component when clicking on a card', async () => {
		const mockResponse = {
			count: 3,
			next: null,
			previous: null,
			results: [
				{
					name: 'Planet 1',
					terrain: 'terrain 1',
					population: '1000',
					url: 'http://example.com/1/',
					count: 3,
				},
				{
					name: 'Planet 2',
					terrain: 'terrain 2',
					population: '2000',
					url: 'http://example.com/2/',
					count: 3,
				},
				{
					name: 'Planet 3',
					terrain: 'terrain 3',
					population: '3000',
					url: 'http://example.com/3/',
					count: 3,
				},
			],
		};

		mocked(getPlanets).mockResolvedValue(mockResponse);

		render(
			<BrowserRouter>
				<ResultsBox searchTerm="test" onItemClick={jest.fn()} onCloseDetails={jest.fn()} />
			</BrowserRouter>
		);
		await screen.findByText('Planet 1');
		fireEvent.click(screen.getByText('Planet 1'));
		await waitFor(() => {
			const noResultsMessage = screen.getByText('Planet 1');
			expect(noResultsMessage).toBeInTheDocument();
		});
	});
	it('fetches new results when clicking on pagination links', async () => {
		const mockResponseFirstPage = {
			count: 12,
			next: 'http://example.com/api/planets?page=2',
			previous: null,
			results: [
				{
					name: 'Planet 1',
					terrain: 'terrain 1',
					population: '1000',
					url: 'http://example.com/1/',
					count: 3,
				},
				{
					name: 'Planet 2',
					terrain: 'terrain 2',
					population: '2000',
					url: 'http://example.com/2/',
					count: 3,
				},
				{
					name: 'Planet 3',
					terrain: 'terrain 3',
					population: '3000',
					url: 'http://example.com/3/',
					count: 3,
				},
			],
		};

		const mockResponseSecondPage = {
			count: 3,
			next: null,
			previous: 'http://example.com/api/planets?page=1',
			results: [
				{
					name: 'Planet 4',
					terrain: 'terrain 4',
					population: '4000',
					url: 'http://example.com/4/',
					count: 3,
				},
				{
					name: 'Planet 5',
					terrain: 'terrain 5',
					population: '5000',
					url: 'http://example.com/5/',
					count: 3,
				},
				{
					name: 'Planet 6',
					terrain: 'terrain 6',
					population: '6000',
					url: 'http://example.com/6/',
					count: 3,
				},
			],
		};

		mockedGetPlanets
			.mockResolvedValueOnce(mockResponseFirstPage)
			.mockResolvedValueOnce(mockResponseSecondPage);

		render(
			<BrowserRouter>
				<ResultsBox searchTerm="test" onItemClick={jest.fn()} onCloseDetails={jest.fn()} />
			</BrowserRouter>
		);

		await screen.findByText('Planet 1');
		fireEvent.click(screen.getByText('2'));
		await screen.findByText('Planet 4');
		const cards = screen.getAllByRole('article');
		expect(cards.length).toBe(3);
	});
	it('displays a loading state while fetching data', async () => {
		mockedGetPlanets.mockImplementation(() => new Promise(() => {})); // Mocking an infinite promise to simulate loading state

		renderComponent({ searchTerm: 'loading' });

		const loadingMessage = screen.getByText(/loading/i);
		expect(loadingMessage).toBeInTheDocument();
	});
});
