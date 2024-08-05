export default {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	collectCoverageFrom: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'!./src/pages/_app.tsx',
		'!./src/pages/index.tsx',
		'!./src/pages/_document.tsx',
		'!./src/pages/details/[id].tsx',
		'!./src/store/apiSlice.ts',
		'!./src/helpers/test-utils.tsx',
	],
	transform: {
		'^.+\\.tsx?$': 'babel-jest',
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
		'\\.(css|less)$': 'identity-obj-proxy',
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
	verbose: true,
};
