import React from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import MainPage from './pages/MainPage/MainPage.tsx';

const App: React.FC = () => {
	return (
		<ErrorBoundary>
			<MainPage />
		</ErrorBoundary>
	);
};
export default App;
