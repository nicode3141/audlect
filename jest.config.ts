export default {
	clearMocks: true,
	coverageProvider: 'v8',
	preset: 'ts-jest/presets/js-with-ts',
	setupFiles: ['dotenv/config'],
	transform: {
		'^.+\\.mjs$': 'ts-jest',
		'^.+\\.[tj]s$': [
			'ts-jest',
			{
				isolatedModules: true,
			},
		],
	},
	transformIgnorePatterns: ['node_modules\\(?!(superjson)\\)'],
	moduleNameMapper: {
		'~/(.*)': ['<rootDir>/src/$1'],
	},
	// Force Jest to exit after tests complete
	forceExit: true,
};
