import { useTheme } from '../context/ThemeContext';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
	const { theme } = useTheme();

	return (
		<div className={`${styles.page} ${theme === 'light' ? styles.themeLight : styles.themeDark}`}>
			<h2 className={styles.pageTitle}>404</h2>
			<p>404 - Page Not Found</p>
		</div>
	);
};

export default ErrorPage;
