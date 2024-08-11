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
