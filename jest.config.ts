import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const config: Config = {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "/tmp/jest_rs",

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: undefined,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  // coveragePathIgnorePatterns: [
  //   "/node_modules/"
  // ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',

  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  // maxWorkers: "50%",

  // An array of directory names to be searched recursively up from the requiring module's location
  // moduleDirectories: [
  //   "node_modules"
  // ],

  testEnvironment: 'jsdom',

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'tsx', 'json', 'node'],
  testMatch: ['**/*.spec.*'],
  // jest test setup
  setupFilesAfterEnv: ['@testing-library/jest-dom', 'jest-fetch-mock', './src/utils/tests/jest.setup.ts'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  // globalSetup: './src/utils/test/jestSetup.ts',
  // globalTeardown: './src/utils/test/jestTeardown.ts',
};
const createJestConfig = nextJest({
  dir: './',
});
export default createJestConfig(config);
