import { Html, Head, Main, NextScript } from 'next/document';
import { FC } from 'react';

const Document: FC = () => {
	return (
		<Html lang="en">
			<Head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" type="image/svg+xml" href="/vite.svg" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
