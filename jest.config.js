/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',               // Use ts-jest for TypeScript support
  testEnvironment: 'node',         // Use Node.js environment for testing
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest'         // Transform TypeScript files using ts-jest
  },
  testMatch: [
    '**/__tests__/**/*.test.ts',   // Look for test files inside __tests__/
    '**/?(*.)+(spec|test).ts'      // Match *.test.ts or *.spec.ts anywhere
  ],
  collectCoverage: true,           // Collect test coverage
  collectCoverageFrom: ['src/**/*.ts'], // Include all TypeScript files in coverage
  coverageDirectory: 'coverage',   // Output coverage reports here
  coverageReporters: ['json', 'lcov', 'text', 'clover'], // Generate multiple coverage formats
  clearMocks: true,                // Automatically clear mocks before each test
  resetMocks: true,                // Reset mocks between tests
  restoreMocks: true,              // Restore mocks after tests
  verbose: true,                   // Show detailed test results
};
