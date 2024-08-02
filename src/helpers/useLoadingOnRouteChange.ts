import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useLoadingOnRouteChange = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const handleRouteChangeStart = () => setLoading(true);
		const handleRouteChangeComplete = () => setLoading(false);
		const handleRouteChangeError = () => setLoading(false);

		router.events.on('routeChangeStart', handleRouteChangeStart);
		router.events.on('routeChangeComplete', handleRouteChangeComplete);
		router.events.on('routeChangeError', handleRouteChangeError);

		return () => {
			router.events.off('routeChangeStart', handleRouteChangeStart);
			router.events.off('routeChangeComplete', handleRouteChangeComplete);
			router.events.off('routeChangeError', handleRouteChangeError);
		};
	}, [router.events]);

	return loading;
};

export default useLoadingOnRouteChange;
