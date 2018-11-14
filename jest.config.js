module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  setupFiles: [
    "<rootDir>/src/__tests__/test-helper/setupTests.ts"
  ],
  testPathIgnorePatterns: [
    "node_modules",
    "src/__tests__/test-helper",
    "dist"
  ],
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
    "node"
  ],
  coverageReporters: ["text", "json", "lcov"]
};
