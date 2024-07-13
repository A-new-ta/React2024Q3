import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './pages/ErrorPage/ErrorPage.tsx';
import DetailsCard from './components/DetailsCard/DetailsCard.tsx';
import MainPage from './pages/MainPage/MainPage.tsx';

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
		<RouterProvider router={router} />
	</React.StrictMode>
);
