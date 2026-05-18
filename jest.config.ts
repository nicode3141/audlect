const config = {
	clearMocks: true,
	coverageProvider: "v8",
	preset: "ts-jest/presets/js-with-ts",
	setupFiles: ["dotenv/config", "<rootDir>/jest.setup.ts"],
	transform: {
		"^.+\\.mjs$": "ts-jest",
		"^.+\\.[tj]s$": ["ts-jest"],
	},
	transformIgnorePatterns: ["node_modules\\(?!(superjson)\\)"],
	moduleNameMapper: {
		"~/(.*)": ["<rootDir>/src/$1"],
	},
	forceExit: true,
};

export default config;
