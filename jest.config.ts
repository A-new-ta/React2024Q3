export default {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	collectCoverageFrom: [
		'./src/**/*.{js,jsx,ts,tsx}',
		'!./src/pages/_app.tsx',
		'!./src/pages/index.tsx',
		'!./src/store/store.ts',
		'!./src/store/apiSlice.ts',
		'!./src/store/planetDetailsSlice.ts',
		'!./src/store/resultsSlice.ts',
	],
	transform: {
		'^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
	},
	moduleNameMapper: {
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
		'\\.(css|less)$': 'identity-obj-proxy',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
	verbose: true,
};
