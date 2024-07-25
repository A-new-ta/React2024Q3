import React from 'react';
import './ErrorPage.css';
import { useTheme } from '../../context/ThemeContext.tsx';

const ErrorPage = () => {
	const { theme } = useTheme();
	return (
		<div className={`page theme-${theme}`}>
			<h2 className="page-title">404</h2>
			<p>404 - Page Not Found</p>
		</div>
	);
};

export { ErrorPage };
