import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './pages/ErrorPage/ErrorPage.tsx';
import DetailsCard from './components/DetailsCard/DetailsCard.tsx';
import MainPage from './pages/MainPage/MainPage.tsx';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import { ThemeProvider } from './context/ThemeContext.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainPage />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'details/:id',
				element: <DetailsCard />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);
