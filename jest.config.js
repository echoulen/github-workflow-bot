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
  moduleNameMapper: {
    "^@tests/(.*)$": "<rootDir>/src/__tests__/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@di/(.*)$": "<rootDir>/src/di/$1",
    "^@notifications/(.*)$": "<rootDir>/src/integrations/notifications/$1",
    "^@repositories/(.*)$": "<rootDir>/src/integrations/repositories/$1",
    "^@service/(.*)$": "<rootDir>/src/service/$1",
    "^@type/(.*)$": "<rootDir>/src/types/$1"
  },
  coverageReporters: ["text", "json", "lcov"]
};
