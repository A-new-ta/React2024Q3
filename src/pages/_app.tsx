import type { AppProps } from 'next/app';
import '../styles/global.css';
import { Provider } from 'react-redux';
import store from '../store/store';
import { ThemeProvider } from '../context/ThemeContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<Provider store={store}>
			<ThemeProvider>
				<Component {...pageProps} />
			</ThemeProvider>
		</Provider>
	);
};
export default MyApp;
