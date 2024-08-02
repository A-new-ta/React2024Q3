import { GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';
import MainPage from '../../components/MainPage/MainPage.tsx';
import DetailsCard from '../../components/DetailsCard/DetailsCard';
import { setPlanetDetails } from '../../store/planetDetailsSlice.ts';
import { FC, useEffect } from 'react';
import { PlanetAPIResponse } from '../../types/types.ts';

interface DetailsProps {
	planetDetails: PlanetAPIResponse;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.params;
	try {
		const response = await fetch(`https://swapi.dev/api/planets/${id}`);
		const planetDetails = await response.json();
		return {
			props: {
				planetDetails,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

const Details: FC<DetailsProps> = ({ planetDetails }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (planetDetails) {
			dispatch(setPlanetDetails(planetDetails));
		}
	}, [planetDetails, dispatch]);

	return (
		<MainPage>
			<DetailsCard />
		</MainPage>
	);
};

export default Details;
