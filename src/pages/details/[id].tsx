import { useRouter } from 'next/router';
import MainPage from '../../components/MainPage/MainPage.tsx';
import DetailsCard from '../../components/DetailsCard/DetailsCard';

const Home = () => {
	const router = useRouter();
	const { id } = router.query;

	return (
		<MainPage>
			<DetailsCard id={id as string} />
		</MainPage>
	);
};

export default Home;
