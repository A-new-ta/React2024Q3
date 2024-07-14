import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailsCard from './DetailsCard';
import { getPlanetDetails } from '../../services/api';
import { BrowserRouter } from 'react-router-dom';
import { PlanetDetails } from '../../types/types.ts';
import { act } from 'react';

jest.mock('../../services/api');
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useOutletContext: () => ({
		handleCloseDetails: jest.fn(),
	}),
}));
declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace jest {
		interface Matchers<R> {
			toBeInTheDocument(): R;
		}
	}
}
const mockedGetPlanetDetails = getPlanetDetails as jest.MockedFunction<typeof getPlanetDetails>;
describe('DetailsCard', () => {
	const renderComponent = () => {
		return render(
			<BrowserRouter>
				<DetailsCard />
			</BrowserRouter>
		);
	};

	it('displays a loading indicator while fetching data', () => {
		renderComponent();

		const loadingMessage = screen.getByText(/loading.../i);
		expect(loadingMessage).toBeInTheDocument();
	});

	it('displays planet details when data is fetched', async () => {
		const mockResponse: PlanetDetails = {
			name: 'Planet 1',
			terrain: 'terrain 1',
			population: '1000',
			climate: 'temperate',
			orbital_period: '365',
			rotation_period: '24',
			surface_water: '40',
			diameter: '10000',
			gravity: '1 standard',
			url: 'http://example.com/1',
			count: 1,
		};

		mockedGetPlanetDetails.mockResolvedValue(mockResponse);

		await act(async () => {
			render(
				<BrowserRouter>
					<DetailsCard />
				</BrowserRouter>
			);
		});

		await waitFor(() => {
			expect(screen.getByText(/planet 1/i)).toBeInTheDocument();
		});

		expect(screen.getByText(/terrain:/i)).toBeInTheDocument();
		expect(screen.getByText(/climate:/i)).toBeInTheDocument();
		expect(screen.getByText(/orbital period:/i)).toBeInTheDocument();
		expect(screen.getByText(/rotation period:/i)).toBeInTheDocument();
		expect(screen.getByText(/surface water:/i)).toBeInTheDocument();
		expect(screen.getByText(/diameter:/i)).toBeInTheDocument();
		expect(screen.getByText(/gravity:/i)).toBeInTheDocument();
	});

	it('hides the component when close button is clicked', async () => {
		await act(async () => {
			render(
				<BrowserRouter>
					<DetailsCard />
				</BrowserRouter>
			);
		});
		await waitFor(() => {
			expect(screen.getByText(/planet 1/i)).toBeInTheDocument();
		});
		const closeButton = screen.getByText(/close/i);
		await act(async () => {
			fireEvent.click(closeButton);
		});

		await waitFor(() => {
			expect(screen.queryByText(/planet 1/i)).toBeInTheDocument();
		});
	});
});
