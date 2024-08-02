// import { useRouter } from 'next/router';
// import { jest } from '@jest/globals';
//
// interface MockRouterProps {
// 	pathname?: string;
// 	query?: Partial<Record<string, string | string[]>>;
// 	push?: jest.Mock;
// }
//
// const createMockRouter = ({ pathname = '', query = {}, push = jest.fn() }: MockRouterProps) => ({
// 	pathname,
// 	query,
// 	push,
// });
//
// jest.mock('next/router', () => ({
// 	useRouter: jest.fn(),
// }));
//
// export const mockRouter = (props: MockRouterProps) => {
// 	(useRouter as jest.Mock).mockReturnValue(createMockRouter(props));
// };

import { useRouter } from 'next/router';

interface Query {
	page: number;
	id: number;
}

const mockRouter = (query: Partial<Query>, pathname = '') => {
	const pushMock = jest.fn();

	(useRouter as jest.Mock).mockReturnValue({ query, push: pushMock, pathname });

	return pushMock;
};

export default mockRouter;
