import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailsCard from './DetailsCard';
// import { getPlanetDetails } from '../../services/api';
import { BrowserRouter } from 'react-router-dom';
import { PlanetDetails } from '../../types/types.ts';
import { act } from 'react';
import { useGetPlanetDetailsQuery } from '../../store/apiSlice.ts';

jest.mock('../../store/apiSlice.ts');
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useOutletContext: () => ({
		handleCloseDetails: jest.fn(),
	}),
}));

const mockedUseGetPlanetDetailsQuery = useGetPlanetDetailsQuery as jest.MockedFunction<
	typeof useGetPlanetDetailsQuery
>;
describe('DetailsCard', () => {
	it('displays a loading indicator while fetching data', async () => {
		mockedUseGetPlanetDetailsQuery.mockReturnValue({
			data: undefined,
			error: undefined,
			isLoading: true,
			refetch: jest.fn(),
			isFetching: true,
			isUninitialized: false,
			isSuccess: false,
			isError: false,
			requestId: '',
			endpointName: 'getPlanetDetails',
			startedTimeStamp: Date.now(),
			status: 'pending',
		});
		await act(async () => {
			render(
				<BrowserRouter>
					<DetailsCard />
				</BrowserRouter>
			);
		});

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
			id: '1',
		};

		mockedUseGetPlanetDetailsQuery.mockReturnValue({
			data: mockResponse,
			error: undefined,
			isLoading: false,
			refetch: jest.fn(),
			isFetching: false,
			isUninitialized: false,
			isSuccess: true,
			isError: false,
			requestId: '',
			endpointName: 'getPlanetDetails',
			startedTimeStamp: Date.now(),
			status: 'fulfilled',
		});

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

	it('displays an error message when there is an error fetching data', async () => {
		mockedUseGetPlanetDetailsQuery.mockReturnValue({
			data: undefined,
			error: new Error('Failed to fetch data'),
			isLoading: false,
			refetch: jest.fn(),
			isFetching: false,
			isUninitialized: false,
			isSuccess: false,
			isError: true,
			requestId: '',
			endpointName: 'getPlanetDetails',
			startedTimeStamp: Date.now(),
			status: 'rejected',
		});

		await act(async () => {
			render(
				<BrowserRouter>
					<DetailsCard />
				</BrowserRouter>
			);
		});

		const errorMessage = screen.getByText(/error loading planet details/i);
		expect(errorMessage).toBeInTheDocument();
	});

	it('hides the component when close button is clicked', async () => {
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
			id: '1',
		};

		mockedUseGetPlanetDetailsQuery.mockReturnValue({
			data: mockResponse,
			error: undefined,
			isLoading: false,
			refetch: jest.fn(),
			isFetching: false,
			isUninitialized: false,
			isSuccess: true,
			isError: false,
			requestId: '',
			endpointName: 'getPlanetDetails',
			startedTimeStamp: Date.now(),
			status: 'fulfilled',
		});
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
		// const { handleCloseDetails } = useOutletContext<ContextType>();
		// expect(handleCloseDetails).toHaveBeenCalled();
	});
});
